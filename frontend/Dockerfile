# Build from frontend/:
#   docker build -t tether-frontend .
#
# Vite loads .env.production during build.
# Optional overrides:
#   docker build -t tether-frontend --build-arg VITE_API_URL=https://... --build-arg VITE_SOCKET_URL=https://... .
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate
RUN pnpm install --frozen-lockfile

COPY . .

# Only override .env.production when build-args are passed
ARG VITE_API_URL
ARG VITE_SOCKET_URL
RUN if [ -n "$VITE_API_URL" ]; then echo "VITE_API_URL=$VITE_API_URL" >> .env.production; fi
RUN if [ -n "$VITE_SOCKET_URL" ]; then echo "VITE_SOCKET_URL=$VITE_SOCKET_URL" >> .env.production; fi

RUN pnpm build

FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

COPY --from=build /app /app

EXPOSE 4173

CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
