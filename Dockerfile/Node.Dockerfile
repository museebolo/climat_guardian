FROM node:20.12.2-alpine3.19 as base

# node 20, build the application
FROM base
WORKDIR /app
COPY ../nextjs-interface .
RUN npm install
RUN node_modules/.bin/next build

# serve the application
FROM base
WORKDIR /var/www/memoires-info/html
COPY --from=1 /app/out ./out
COPY --from=1 /app/node_modules/ ./node_modules/
COPY --from=1 /app/next.config.mjs .
CMD ["node_modules/.bin/next", "start"]

