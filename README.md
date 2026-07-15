# Trackboard — Self-Hosted Bug Reporting Tool

Stack: AdonisJS v7 (Lucid, VineJS) · Inertia + Vue 3 (admin console) · Preact (embeddable widget) · PostgreSQL · MinIO/S3 · Docker (app only)

## Prerequisites

- Node >= 24 (or Bun 1.4+)
- Database and File Storage :
  - PostgreSQL (e.g. `postgres:16` on your home lab)
  - MinIO / S3-compatible storage (bucket for screenshots)

No `docker-compose` in this repo — point the app at your existing Postgres + MinIO via env vars.

## Local Setup

```bash
cp .env.example .env
# edit .env: set DB_* and S3_* to your home-lab hosts, generate APP_KEY if empty
node ace generate:key

# install
pnpm install

# migrate (sqlite default for quick local dev)
pnpm exec ace migration:run
# or: node ace migration:run

# optional seed
# pnpm exec ace db:seed

# dev server (HMR)
pnpm dev
# app on http://localhost:3333
```

### Using Postgres

```bash
# .env
DB_CONNECTION=pg
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USER=trackboard
DB_PASSWORD=***
DB_DATABASE=trackboard
```

Then `node ace migration:run` against Postgres.

### Using MinIO or replace it with your own S3-compatible storage

```bash
# .env
DRIVE_DISK=s3
S3_ENDPOINT=http://minio.example.lan:9000
S3_REGION=us-east-1
S3_BUCKET=trackboard
S3_ACCESS_KEY_ID=xxx
S3_SECRET_ACCESS_KEY=yyy
S3_FORCE_PATH_STYLE=true
```

If `DRIVE_DISK=fs` (default), uploads go to `storage/uploads` locally.

## Scripts

| Script           | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `pnpm dev`       | Start dev server with HMR (Vite + Adonis)            |
| `pnpm build`     | Build for production (`build/` folder)               |
| `pnpm start`     | Start production server (`node build/bin/server.js`) |
| `pnpm test`      | Run Japa tests (`node ace test`)                     |
| `pnpm lint`      | ESLint (Vue-aware)                                   |
| `pnpm format`    | Prettier                                             |
| `pnpm typecheck` | `tsc --noEmit` + `vue-tsc`                           |

## Environment Variables

See `.env.example` for full list: `PORT`, `HOST`, `APP_KEY`, `APP_URL`, `SESSION_DRIVER`, `DB_*`, `S3_*`, `SMTP_*`/`RESEND_API_KEY`.

## Docker / Coolify

Single `Dockerfile` (no compose) — build and deploy the app, inject env vars pointing at your existing Postgres + MinIO:

```bash
docker build -t trackboard .
docker run -p 3333:3333 --env-file .env trackboard
```

For Coolify: create service from `Dockerfile`, set env vars in UI (`DB_HOST`, `S3_ENDPOINT`, etc.), no extra containers needed.

## Project Structure

- `app/` — controllers, models, middleware, validators
- `config/` — `database.ts` (sqlite + pg), `drive.ts` (fs + s3/MinIO)
- `database/migrations` — Lucid migrations
- `inertia/` — Vue 3 admin console (Inertia)
- `resources/views` — Edge root layout
- `tests/` — Japa suites (unit / functional / browser)

## License

UNLICENSED — private self-hosted project.
