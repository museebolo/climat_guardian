# ---> Builder <---
FROM composer:2.7 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install \
	--no-dev \
	--prefer-dist \
	--no-interaction \
	--no-progress \
	--optimize-autoloader


# ---> Runtime <---
FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
	postgresql-dev \
	icu-dev \
	oniguruma-dev \
	libzip-dev \
	&& docker-php-ext-install \
		pdo \
		pdo_pgsql \
		intl \
		mbstring \
		zip \
		opcache \
	&& rm -fr /var/cache/apk/*

WORKDIR /var/www/memoires-info/php

# Code app
COPY ./public 	./public
COPY ./src  	 	./src
COPY ../lib.php ./

# dependency PHP
COPY --from=vendor ../app/vendor ./vendor

RUN chown -R www-data:www-data /var/www/memoires-info/php
USER www-data

