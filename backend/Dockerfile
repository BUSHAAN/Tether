# Build from backend/:
#   docker build -t tether-backend .
FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@10.32.1 --activate
RUN pnpm install --frozen-lockfile --prod

COPY . .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["pnpm", "start"]
