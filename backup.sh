#!/bin/bash

source ./.env.prod


YEAR=`date '+%Y'`
MONTH=`date '+%m'`
DATE=`date '+%Y%m%d'`

SCRIPT_DIR=$(cd $(dirname $0); pwd)

mkdir -p ${SCRIPT_DIR}/${YEAR}/${MONTH}

/usr/bin/docker exec -i mysql /usr/bin/mysqldump -u${MYSQL_USER} -p${MYSQL_PASS} ${MYSQL_DATABASE} | gzip > ${SCRIPT_DIR}/${YEAR}/${MONTH}/backup${DATE}.sql.gz