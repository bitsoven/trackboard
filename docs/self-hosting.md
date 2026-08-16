# Self-hosting Trackboard

Trackboard is a single container app. There is **no `docker-compose`** in this
repo — the app is pointed at the Postgres and MinIO/S3 you already run in your
home lab via environment variables.

## Prerequisites

- A reachable PostgreSQL database (e.g. `postgres:16`).
- A MinIO instance or any S3-compatible bucket for screenshots.
- A host to run the container (Coolify, Fly.io, a VPS, …) and a reverse proxy
  with TLS for production.

## Environment variables

| Variable                | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `PORT` / `HOST`         | Listen port / host (default `3333` / `0.0.0.0`)      |
| `APP_KEY`               | App encryption key — generate with `node ace gen:key` |
| `APP_URL`               | Public base URL (used in verification/magic links)   |
| `DB_CONNECTION`         | `sqlite` (dev) or `pg` (prod)                        |
| `DB_HOST` / `DB_PORT`   | Postgres host / port                                 |
| `DB_USER` / `DB_PASSWORD` / `DB_DATABASE` | Postgres credentials                |
| `DRIVE_DISK`            | `s3` for MinIO/S3 (or `fs` for local dev)            |
| `S3_ENDPOINT`           | MinIO/S3 endpoint                                    |
| `S3_REGION` / `S3_BUCKET` | Bucket region / name                              |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | S3 credentials               |
| `S3_FORCE_PATH_STYLE`   | `true` for MinIO                                     |
| `SMTP_*` / `RESEND_API_KEY` | Outbound email for verification + replies        |

See `.env.example` for the full list.

## Build & run (Docker)

```bash
docker build -t trackboard .
docker run -p 3333:3333 --env-file .env trackboard
```

The image runs `pnpm build` at build time and serves `node ./bin/server.js` in
production. Run migrations once on first boot:

```bash
docker exec -it <container> node ace migration:run
```

## Deploy with Coolify

1. Create a new **Dockerfile** service in Coolify pointing at this repo.
2. Set the environment variables above in the Coolify UI (no extra containers).
3. Expose port `3333` and put it behind your TLS-terminating proxy / Coolify
   domain.
4. After the first deploy, run migrations from the container shell:
   `node ace migration:run`.
5. Generate `APP_KEY` once and store it as a persistent env var.

## Reverse proxy / TLS

Terminate TLS at your proxy and forward `X-Forwarded-*` headers. Set `APP_URL`
to the public HTTPS URL so magic links and the widget `src` resolve correctly.

## Embedding & CSP

Once deployed, embed the widget on your sites (see [embedding.md](./embedding.md))
and configure each site's CSP (see [csp.md](./csp.md)).
