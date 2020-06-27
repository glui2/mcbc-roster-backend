FROM postgres
ENV POSTGRES_PASSWORD p@ssw0rd42
ENV POSTGRES_DB mcbc-db
COPY tools/initdb.pgsql /docker-entrypoint-initdb.d/