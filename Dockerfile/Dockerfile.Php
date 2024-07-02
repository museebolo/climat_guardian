# php 8.3 with the files, install dependencies
FROM composer:2.7
COPY ../php .
RUN composer install

# copy required files to new image
FROM php:8.3-fpm-alpine
COPY ../php/public /var/www/memoires-info/php/public
COPY ../php/private /var/www/memoires-info/php/private
COPY ../php/lib.php /var/www/memoires-info/php
COPY ../.env /var/www/memoires-info/php/
COPY --from=0 ../app/vendor /var/www/memoires-info/php/vendor

