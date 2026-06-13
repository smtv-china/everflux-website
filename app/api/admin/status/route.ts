import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  isAdminAuthEnabled,
  isAdminSessionValid,
} from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const enabled = isAdminAuthEnabled();
  const authenticated = enabled
    ? isAdminSessionValid(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
    : true;

  return NextResponse.json({
    enabled,
    authenticated,
    mode: enabled ? "protected" : "open-demo",
  }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
