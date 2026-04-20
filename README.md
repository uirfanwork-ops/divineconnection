# Divine Connections: Servants of Allah

A production-grade Next.js 14 application for the Divine Connections Islamic retreat. Handles public registration, e-Transfer payment, admin dashboard, receipt tracking with AI-powered OCR, and retreat management.

## Tech Stack

- **Framework:** Next.js 14 App Router, TypeScript strict mode
- **Styling:** Tailwind CSS, shadcn/ui components
- **Database:** Supabase (PostgreSQL) with Row Level Security
- **Payments:** Interac e-Transfer (Stripe Checkout ready for future)
- **AI/OCR:** Anthropic Claude claude-sonnet-4-6 for receipt processing
- **Email:** Resend for transactional emails
- **Rate Limiting:** Upstash Redis
- **Deploy:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase project
- Resend account
- Upstash Redis instance

### 1. Clone and Install

```bash
git clone <repo-url>
cd divineconnection
npm install
```

### 2. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local`. See the file for descriptions of each variable.

### 3. Database Setup

In the Supabase SQL Editor, run these files in order:

```bash
# 1. Create tables, enums, indexes, RLS policies, seed data
docs/schema.sql

# 2. Create storage bucket and storage RLS policies
docs/storage-setup.sql
```

### 4. Verify RLS

```bash
npx tsx docs/verify-rls.ts
```

This confirms anon clients cannot read registrations, payments, receipts, or admin data.

### 5. Create First Super Admin

1. Create a user in Supabase Auth (Dashboard > Authentication > Users > Add User)
2. Run in Supabase SQL Editor:

```sql
INSERT INTO admin_roles (user_id, role, email, display_name)
VALUES ('<auth-user-uuid>', 'super_admin', 'your@email.com', 'Your Name');
```

### 6. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 for the public site, http://localhost:3000/admin for the admin portal.

## Project Structure

```
src/
  app/
    (public)/              # Public routes (landing, register, payment, thank-you, policies)
    admin/                 # Admin portal (dashboard, registrations, receipts, documents, settings)
    api/                   # API routes (Stripe webhook - future)
  components/
    ui/                    # shadcn/ui base components
    sections/              # Landing page sections
    layout/                # Header, footer
    admin/                 # Admin-specific components
  lib/
    supabase/              # client.ts, server.ts, service.ts
    emails/                # HTML email templates
    validations/           # Zod schemas
    admin.ts               # Admin auth helpers
    anthropic.ts           # Claude API for receipt OCR
    email.ts               # Resend wrapper
    rate-limit.ts          # Upstash rate limiter
    recaptcha.ts           # reCAPTCHA v3 verification
    sanitize.ts            # Input sanitization
    stripe.ts              # Stripe client (future)
    utils.ts               # cn(), formatCents(), withRetry()
  types/
    database.ts            # Supabase Database type definitions
content/
  site-config.ts           # Retreat name, dates, venue, hero, about, CTA
  qualities.ts             # Why attend (6 items)
  schedule.ts              # 3-day schedule
  speakers.ts              # Speaker bios
  faq.ts                   # FAQ items
  what-is-included.ts      # Included items
  policies/v1/             # MDX policy documents
docs/
  schema.sql               # Full database schema
  storage-setup.sql        # Storage bucket config
  verify-rls.ts            # RLS verification script
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## Deploy to Vercel

### 1. Connect Repository

Import the repository in Vercel Dashboard. Framework will be auto-detected as Next.js.

### 2. Configure Environment Variables

Add all variables from `.env.local.example` to Vercel project settings > Environment Variables.

### 3. Deploy

Push to the main branch or trigger a manual deploy.

### 4. Post-Deploy

- Register the Stripe webhook URL (when Stripe is enabled): `https://your-domain.com/api/webhooks/stripe`
- Create first super_admin user (see step 5 above)
- Enable Supabase daily backups (Dashboard > Project Settings > Database > Backups)
- Test the full registration flow in test mode

## Security

- RLS enabled on every table with granular policies
- Service role key isolated to `lib/supabase/service.ts` (never in client code)
- CSP headers restrict script/frame/connect sources
- Rate limiting: 5 registrations/hour/IP
- reCAPTCHA v3 on registration form
- All admin mutations logged to audit_log
- Prices always refetched from DB (never trusted from client)
- No PII or tokens logged

## Content Updates

- **Marketing content:** Edit files in `content/` directory (no redeploy needed with ISR)
- **Pricing tiers:** Edit via Admin > Settings > Pricing Tiers (stored in DB)
- **Retreat config:** Edit via Admin > Settings > Retreat Config (stored in DB)
- **Policies:** Update MDX files in `content/policies/v1/` (requires redeploy)
