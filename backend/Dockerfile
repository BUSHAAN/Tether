# Build from backend/:
#   docker build -t tether-backend .
FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm install --frozen-lockfile --prod

COPY . .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["pnpm", "start"]
