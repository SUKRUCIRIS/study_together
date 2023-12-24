FROM python:3.12.1-slim-bookworm

RUN pip install --no-cache-dir --upgrade pip && \
	pip install --no-cache-dir flask psycopg2-binary waitress flask_cors

WORKDIR /app

COPY ./app.py .
COPY ./query.py .

EXPOSE 80

CMD ["sh", "-c", "python -u app.py;"]