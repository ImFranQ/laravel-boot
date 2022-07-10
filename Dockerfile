FROM php:8.1-fpm-alpine

ENV GIT_EMAIL=""
ENV GIT_NAME=""

# Get latest Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"; \
  php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"; \
  php composer-setup.php; \
  php -r "unlink('composer-setup.php');"; \
  mv composer.phar /usr/local/bin/composer

# Install system dependencies
RUN apk add git curl zip unzip wget \
  oniguruma-dev zlib-dev libpng-dev libzip-dev \
  mysql-client \
  nodejs npm

# PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath

RUN git config --global user.name ${GIT_NAME} && \
  git config --global user.email ${GIT_EMAIL}

USER root