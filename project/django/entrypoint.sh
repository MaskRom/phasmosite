#!/bin/sh

mkdir -p app/static/css
mkdir -p app/static/js

file="../build/index.html"

if [ $DEBUG = "False" ]
then
    while [ ! -f "$file" ]; do
        sleep 5
    done
fi

main_css=$(cat ../build/asset-manifest.json | jq -r '.["main.css"]')
main_js=$(cat ../build/asset-manifest.json | jq -r '.["main.js"]')
chunk_js=$(cat ../build/asset-manifest.json | jq -r '.["static/js/2.fa7f7348.chunk.js"]')
cp ../build/"$main_css" app/static/css/main.css
cp ../build/"$main_js" app/static/js/main.js
cp ../build/"$chunk_js" app/static/js/chunk.js
cp ../build/favicon.ico app/static/favicon.ico
cp ../build/manifest.json app/static/manifest.json

python manage.py makemigrations api --noinput
python manage.py migrate --noinput

python manage.py makemigrations --noinput
python manage.py migrate --noinput

python manage.py collectstatic --noinput

rm -r ../build

if [ $DEBUG = "True" ]
then
    python manage.py runserver 0.0.0.0:8000
else
    gunicorn config.wsgi:application --bind 0.0.0.0:8000
fi