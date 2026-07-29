/**
 * Master switch for retreat registrations.
 *
 * When true, the /register page shows a sold-out notice instead of the form,
 * and submitRegistration rejects any submission that still reaches the server.
 * Set to false to reopen registrations.
 */
export const REGISTRATIONS_CLOSED: boolean = true;

export const SOLD_OUT_MESSAGE =
  "This event has been sold out. For any inquiries, please email events@mathabah.org.";
