# Contributing to Trackboard

Thanks for helping build Trackboard — a self-hosted, open-by-default bug
reporting tool. This guide covers the conventions we expect in pull requests.

## Prerequisites

- Node >= 24 (or Bun 1.4+)
- PostgreSQL (or SQLite for quick local dev) and MinIO/S3 for screenshots
- `pnpm` (enabled via Corepack)

## Local setup

```bash
cp .env.example .env
node ace generate:key        # set APP_KEY
pnpm install
node ace migration:run
pnpm dev                     # http://localhost:3333
```

Run the checks before pushing:

```bash
pnpm typecheck
pnpm lint
pnpm test
```

All three must pass. CI will reject PRs that break them.

## Architecture & layering

Trackboard follows a strict **Clean Architecture** layering on the AdonisJS
backend. Read [`AGENTS.md`](./AGENTS.md) for the full rules — the short version:

`Routes → Controllers → Validators → Services → Models → Transformers → Exceptions`.

- **Controllers** are thin: validate, call one service, transform. No business
  logic, no Lucid queries, no `try/catch` for domain rules.
- **Services** hold all business logic and are framework-agnostic (no
  `HttpContext` — pass primitives/DTOs).
- Never return a raw Lucid model to Inertia — always pass it through a
  `Transformer`.

## Frontend conventions (admin console)

The admin console is **Vue 3 with the Composition API only**:

- Use `<script setup lang="ts">`. Do not use the Options API.
- Type props with `defineProps<T>()` and events with `defineEmits<T>()`. Never
  use untyped `props: Array` declarations.
- Extract shared logic into **composables** (`inertia/composables/*`), not
  duplicated component code.
- **Pages** (`inertia/pages/*`) stay thin: receive Inertia props, wire them to
  composables/components, render markup. No API calls or business logic.
- **Layouts** (`inertia/layouts/*`) are shell/navigation only.
- **Components** (`inertia/components/*`) are small and presentational-first.
- Use Inertia's `router` / `<Link>` / `useForm` for navigation and form
  submission — do not hand-roll `fetch`/`axios` to Adonis routes for standard
  CRUD.
- Keep template expressions simple; move logic into a named `computed()`.
- Style with Tailwind utility classes; avoid new global CSS unless it is a true
  design-system primitive.

## Widget conventions (Preact)

The embeddable widget (`src/widget`) is **framework-agnostic and dependency-free**
— it runs inside third-party pages. Keep it that way:

- Do not add runtime dependencies to the widget bundle.
- All user-facing strings go through the i18n layer (`src/widget/i18n.ts`). Add
  new keys there with `en` plus any other locales you can cover.
- Keep the bundle small (gzipped target < 150 KB).

## Tests

- Every new **service method** gets a Japa unit/functional test under `tests/`.
- Every new **controller endpoint** gets at least one HTTP test hitting the real
  route.
- Use the existing `tests/functional/*.spec.ts` patterns (truncate + seed) as a
  template.

## Pull request expectations

- Keep PRs focused — one logical change per PR.
- Write a clear description of **why** the change exists, not just what changed.
- Follow the existing code style (Prettier + ESLint are enforced; run
  `pnpm format` and `pnpm lint`).
- Add or update tests for behavior changes.
- Use clear commit messages (imperative, e.g. "Add webhook dispatch on report
  update").
- Update `TODO.md` / docs when you add user-facing features.

## Code of conduct

Be respectful and constructive. Assume good intent; review the code, not the
person.
