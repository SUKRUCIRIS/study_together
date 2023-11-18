#veriler /var/lib/postgresql/data içinde olucak, kubernetes yaparken buraya volume tak
FROM postgres:16.1-bookworm
ENV POSTGRES_USER studytogether
ENV POSTGRES_DB studytogether
ENV POSTGRES_PASSWORD studytogether
COPY ./init_database.sql /docker-entrypoint-initdb.d
EXPOSE 5432