FROM node:24-alpine

WORKDIR /app

RUN npm install --global pnpm@12.8.1

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm","run","start:prod"]
