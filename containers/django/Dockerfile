FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

WORKDIR /django

COPY project/django/requirements.txt /django/

RUN apt-get update

RUN apt-get install -y jq

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY project/django /django/

RUN chmod 755 /django/entrypoint.sh