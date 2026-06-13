export const ADMIN_SESSION_COOKIE = "everflux_admin_session";

export function isAdminAuthEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function isAdminSessionValid(value?: string | null) {
  const secret = getAdminSessionSecret();
  return Boolean(secret && value && value === secret);
}

