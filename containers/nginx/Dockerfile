FROM nginx:1.21

RUN apt-get update && \
  apt-get install -y apt-utils \
  locales && \
  echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen ja_JP.UTF-8

ENV LC_ALL ja_JP.UTF-8

COPY containers/nginx/nginx.conf /etc/nginx/nginx.conf

COPY containers/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf.template