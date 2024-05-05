#!/bin/bash

docker network create app-network

# Build Server Apache
docker build -t php_apache:v01 -f Dockerfile.server .
# Build Angular
docker build -t angular_image:v01 -f Dockerfile.angular .
# Build Docker Image
docker build -t mysql_element:v01 -f Dockerfile.mysql .


docker run \
    --name cont-apache-php \
    --network app-network \
    -p 8089:80 \
    --restart always \
    -v /Users/paolacyp/Desktop/ng-php-bash/api/:/var/www/html \
    --detach php_apache:v01

docker run -d \
    --name container-docker \
    --network app-network \
    -p 4200:4200 \
    --detach angular_image:v01

# Run Docker container
docker run \
  --name cont-mysql \
  --network app-network \
  --restart always \
  -v /Users/paolacyp/Desktop/ng-php-bash/sql/dump-sql.sql:/docker-entrypoint-initdb.d/init.sql \
  -v db-data:/var/lib/mysql \
  -p 3306:3306 \
  --tty \
  --detach mysql_element:v01

  
# Run PhpMyAdmin container
docker run -d \
    --name myadmin \
    --network app-network \
    -e PMA_HOST=cont-mysql \
    -e PMA_PASSWORD=example \
    -e PMA_ARBITRARY=1 \
    -e PMA_USER=root \
    -e PMA_PORT=3306 \
    -p 8080:80 \
    --link cont-mysql:db \
    phpmyadmin/phpmyadmin

    