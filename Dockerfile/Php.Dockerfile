# ---> Builder <---
FROM php:8.4-cli-alpine AS vendor

RUN apk add --no-cache git unzip libzip-dev && docker-php-ext-install zip

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

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

# Code app (from ./php context)
COPY public 	./public
COPY src  	 	./src
COPY lib.php ./

# vendor
COPY --from=vendor ../app/vendor ./vendor

RUN chown -R www-data:www-data /var/www/memoires-info/php
USER www-data
