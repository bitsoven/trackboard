# License review — all features are core

**Conclusion:** Every user-facing feature in Trackboard ships in the core,
self-hosted build. Nothing from Phases 2, 3, 5, or 7 is gated behind a license,
plan tier, or paywall.

## What was reviewed

| Phase | Feature area                          | Gated? | Notes                                              |
| ----- | ------------------------------------- | ------ | -------------------------------------------------- |
| 2     | Report template engine                | No     | Templates + dynamic VineJS schema are core.        |
| 3     | Reports (ingest, queue, detail)       | No     | Public ingest + admin UI are core.                 |
| 5     | Ticketing / conversation thread       | No     | Inbound/outbound email + portal are core.          |
| 7     | Integrations                          | No     | Outbound webhooks + API-token management are core. |
| 7     | GitHub Issues sync                    | —      | Deliberately dropped (not implemented).            |

## Evidence

- No license-check, plan-tier, or feature-flag middleware exists in
  `app/middleware` or `start/kernel.ts`.
- All controllers are reachable once authenticated (or public where intended);
  there is no entitlement layer that conditionally enables endpoints.
- No paid dependency or SaaS SDK is required to use any feature — the only
  external services are the ones **you** supply (Postgres, MinIO/S3, SMTP/Resend,
  GitHub if you opt in).
- `config/shield.ts` CSRF exemption is purely route-based (`/api/`, `/portal/`)
  for external/webhook callers, not a licensing mechanism.

## Policy

Keep it this way. If a future feature is ever considered for a paid tier, split
it into a separately licensed package rather than gating core behavior behind a
flag in this repository.
