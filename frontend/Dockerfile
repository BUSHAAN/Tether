# Build from frontend/:
#   docker build -t tether-frontend .
# With API target:
#   docker build -t tether-frontend --build-arg VITE_API_URL=http://localhost:5000/api --build-arg VITE_SOCKET_URL=http://localhost:5000 .
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_API_URL=http://localhost:5000/api
ARG VITE_SOCKET_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

RUN pnpm build

# Serve the built app (swap for nginx later if you want)
FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

COPY --from=build /app /app

EXPOSE 4173

CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
