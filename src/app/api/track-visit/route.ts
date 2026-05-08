import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get("dc_vid")?.value;

  if (visitorId) {
    return NextResponse.json({ ok: true, returning: true });
  }

  const newId = crypto.randomUUID();
  const supabase = createServiceClient();

  await supabase.from("site_visits").insert({
    visitor_id: newId,
    visited_at: new Date().toISOString(),
  });

  const res = NextResponse.json({ ok: true, returning: false });
  res.cookies.set("dc_vid", newId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return res;
}
