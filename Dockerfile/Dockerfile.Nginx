# nginx 1.26 on port 80, keep the build output, nginx config
FROM nginx:1.26-alpine-otel
COPY ../.env /var/www/memoires-info/html/.env

# copy the nginx config
COPY ../nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i '/location \/adminer\//,/}/d' /etc/nginx/conf.d/default.conf
# copy php files for ngnix to know they exist
COPY ../php/public /var/www/memoires-info/php/public

