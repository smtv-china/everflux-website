import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionSecret,
  isAdminAuthEnabled,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  if (!isAdminAuthEnabled()) {
    return NextResponse.json({
      ok: true,
      enabled: false,
      message: "Admin authentication is not enabled.",
    });
  }

  const body = await request.json().catch(() => null);
  const password = String(body?.password || "");

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, enabled: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: getAdminSessionSecret(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

