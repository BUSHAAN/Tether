# Build from repo root:
#   docker build -f backend/Dockerfile -t tether-backend .
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY backend/package.json ./backend/

RUN pnpm install --frozen-lockfile --filter backend...

COPY backend ./backend

WORKDIR /app/backend

ENV NODE_ENV=production
EXPOSE 5000

CMD ["pnpm", "start"]
