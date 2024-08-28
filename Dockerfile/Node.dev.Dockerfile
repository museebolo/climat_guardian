FROM node:20.12.2-alpine3.19
WORKDIR /var/www/memoires-info/html/
COPY ../.env ../
ENTRYPOINT ["npm", "run", "dev"]

