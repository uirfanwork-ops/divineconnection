# Contemplating Death event pages

The event lives at `/contemplating-death`. Registrations are stored in the
Mathabah Supabase project (`CD_SUPABASE_URL`). Staff sign in with this app's
existing admin accounts. Stripe and Resend are shared with the rest of the app.

## How registration works

1. The attendee fills in the form. The server saves a `pending` row in
   `cd_seminar_registrations` and creates a Stripe Checkout Session for $50.00 CAD.
2. The attendee pays on Stripe's hosted checkout.
3. Stripe calls `/api/contemplating-death/webhook`. The server marks the row
   `paid` and emails the ticket with a QR code. The confirmation page runs the
   same step, so the ticket still goes out if the webhook is slow.
4. At the door, staff scan the QR code with a phone camera. It opens
   `/contemplating-death/check-in/<token>`, which only works for signed-in
   staff, and shows one **Check in** button.

## Routes

| Route | Purpose |
|---|---|
| `/contemplating-death` | Event page and registration form |
| `/contemplating-death/success` | Confirmation after payment |
| `/contemplating-death/ticket/<token>` | Attendee's ticket with QR code |
| `/contemplating-death/check-in/<token>` | Door check-in, staff only |
| `/contemplating-death/scan` | Camera scanner for staff. Each scan checks the attendee in |
| `/admin/contemplating-death` | Every registration with full details and QR code, **Start scanning**, **Download CSV**, manual check-in, resend ticket |
| `/api/contemplating-death/webhook` | Stripe webhook |

## One-time setup

1. In the Mathabah Supabase project, run
   `docs/migration-contemplating-death.sql`. Set `CD_SUPABASE_URL` and
   `CD_SUPABASE_SERVICE_ROLE_KEY` in Vercel to that project's URL and service
   role key.
2. In Vercel, confirm these variables are set for production:
   `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_APP_URL`.
3. In the Stripe Dashboard, add a webhook endpoint that points to
   `https://<your-domain>/api/contemplating-death/webhook` with these events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.expired`
   - `charge.refunded`

   Copy the signing secret into `STRIPE_WEBHOOK_SECRET` (or
   `CD_STRIPE_WEBHOOK_SECRET`).
4. Run one test payment in Stripe test mode with card `4242 4242 4242 4242`
   and confirm the ticket email arrives.

Optional variables are listed in `.env.local.example`.

## Edit content

Speakers, sessions, date, venue and price are in
`content/contemplating-death.ts`.

## Security notes

- `cd_seminar_registrations` has row-level security on with no policies. Only server
  code with the service role key can read or write it.
- The ticket price is set on the server. The browser never sends an amount.
- The webhook verifies Stripe's signature before it does anything.
- Staff actions (check in, undo, resend, export) check the admin session on
  every call.
- A ticket link contains a random 128-bit token. Anyone with the link can view
  that ticket, so treat it like the ticket itself.
