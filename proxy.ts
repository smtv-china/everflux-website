import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  isAdminAuthEnabled,
  isAdminSessionValid,
} from "@/lib/adminAuth";

function isProtectedAdminApi(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  if (pathname === "/api/upload") {
    return true;
  }

  if (pathname === "/api/content") {
    return method !== "GET";
  }

  if (pathname === "/api/inquiries") {
    return method !== "POST";
  }

  return false;
}

export function proxy(request: NextRequest) {
  if (!isAdminAuthEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isProtectedApi = isProtectedAdminApi(request);
  const isAuthed = isAdminSessionValid(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (isLoginPage && isAuthed) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isAdminPage && !isLoginPage && !isAuthed) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedApi && !isAuthed) {
    return NextResponse.json(
      { error: "Admin authentication required." },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/content", "/api/inquiries", "/api/upload"],
};

