FROM node:24-alpine AS base

# All deps stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Production stage
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/build ./
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3333
CMD ["node", "./bin/server.js"]
