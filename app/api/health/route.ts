import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "everflux-website",
    domain: "evererpower.com",
    time: new Date().toISOString(),
  });
}
