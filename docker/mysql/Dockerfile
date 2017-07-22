FROM mysql
MAINTAINER Seunghwan Hong <hj332921@gmail.com>

ADD db_schema.sql /docker-entrypoint-initdb.d
RUN chmod 777 /docker-entrypoint-initdb.d/db_schema.sql
