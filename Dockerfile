# syntax=docker/dockerfile:1

FROM oven/bun:1 AS base

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

# One-shot database migration image
FROM base AS migrate

ENV NODE_ENV=production

CMD ["bun", "run", "db:migrate"]

# Minimal production runtime
FROM oven/bun:1 AS runtime

WORKDIR /app

COPY --from=base /app/package.json ./package.json
COPY --from=base /app/tsconfig.json ./tsconfig.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/src ./src

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["bun", "run", "src/index.ts"]
