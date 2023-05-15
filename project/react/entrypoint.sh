#!/bin/sh
npm install

if [ $DEBUG = "True" ]
then
    npm start
else
    npm run build
fi