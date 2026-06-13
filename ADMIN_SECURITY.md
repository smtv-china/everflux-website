# Everflux Admin Security

The admin console supports optional password protection.

## Current behavior

If `ADMIN_PASSWORD` is not set, the admin remains in open demo mode so you are not locked out.

If `ADMIN_PASSWORD` is set, these routes require login:

- `/admin`
- `/admin/*`
- `POST /api/upload`
- `POST /api/content`
- `PUT /api/content`
- `DELETE /api/content`
- `GET /api/inquiries`
- `DELETE /api/inquiries`

Public routes remain available:

- `GET /api/content`
- `POST /api/inquiries`
- `/api/health`

## Netlify environment variables

Set these in Netlify:

```text
ADMIN_PASSWORD=use-a-strong-private-password
ADMIN_SESSION_SECRET=use-a-long-random-secret
```

Recommended:

- Use at least 16 characters for `ADMIN_PASSWORD`.
- Use 32+ random characters for `ADMIN_SESSION_SECRET`.
- Store both in a password manager and offline recovery document.

After setting variables, trigger a new Netlify deploy.

## Logout

The admin header shows `Logout / 退出` after protection is enabled.

## Production next steps

This password protection is appropriate for the first operating version. For a larger team, upgrade to:

- Role-based user accounts.
- Email/password or passkey login.
- Audit logs.
- Alibaba Cloud OSS uploads.
- Database-backed content and lead records.

