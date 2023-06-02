ARG NODE_IMAGE=node:18-slim

FROM $NODE_IMAGE AS base
WORKDIR /app

# Install dependencies with PNPM

FROM base AS dependencies
COPY ./package.json ./pnpm-lock.yaml ./
RUN yarn global add pnpm && pnpm install --shamefully-hoist --strict-peer-dependencies=false --frozen-lockfile

##### BUILDER

FROM dependencies AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN node ace build --production

##### RUNNER

FROM base AS production
ENV NODE_ENV=production
ENV PORT=80
ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 adonis
RUN adduser --system --uid 1001 adonis

COPY --chown=adonis:adonis ./package.json ./pnpm-lock.yaml ./
RUN yarn global add pnpm && pnpm install --shamefully-hoist --strict-peer-dependencies=false --frozen-lockfile
COPY --chown=adonis:adonis --from=build /app/build .
EXPOSE 80
CMD [ "node", "server.js" ]
