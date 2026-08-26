# Build from repo root:
#   docker build -f frontend/Dockerfile -t tether-frontend .
# Optional API target (for separate backend container):
#   --build-arg VITE_API_URL=http://localhost:5000/api
#   --build-arg VITE_SOCKET_URL=http://localhost:5000
FROM node:20-alpine AS build

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY frontend/package.json ./frontend/

RUN pnpm install --frozen-lockfile --filter frontend...

COPY frontend ./frontend

ARG VITE_API_URL=http://localhost:5000/api
ARG VITE_SOCKET_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

RUN pnpm --filter frontend build

# ---- serve built app with Vite preview (no nginx yet) ----
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY frontend/package.json ./frontend/

RUN pnpm install --frozen-lockfile --filter frontend...

COPY --from=build /app/frontend/dist ./frontend/dist
COPY frontend/vite.config.ts ./frontend/
COPY frontend/index.html ./frontend/

WORKDIR /app/frontend

EXPOSE 4173

CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
