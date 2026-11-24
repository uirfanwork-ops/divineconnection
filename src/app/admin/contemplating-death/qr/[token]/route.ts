import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { TICKET_TOKEN_PATTERN } from "@/lib/contemplating-death/db";
import { ticketQrSvg } from "@/lib/contemplating-death/tickets";

export const dynamic = "force-dynamic";

/** QR image for one ticket, for the admin attendee list. Staff only. */
export async function GET(
  _request: Request,
  { params }: { params: { token: string } }
) {
  const admin = await getAdminUser();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!TICKET_TOKEN_PATTERN.test(params.token)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const svg = await ticketQrSvg(params.token);
  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
