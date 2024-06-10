# php 8.3 with the files, install dependencies
FROM composer:2.7
COPY login .
RUN composer install

# copy required files to new image
FROM php:8.3-fpm-alpine
COPY login/public /var/www/memoires-info/php/public
COPY login/lib.php /var/www/memoires-info/php
COPY .env /var/www/memoires-info/php/
COPY --from=0 ./app/vendor /var/www/memoires-info/php/vendor

