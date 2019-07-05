#!/bin/sh

set -e

sed -i 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf
sed -i 's"$INTERNAL_API_URL"'"$INTERNAL_API_URL"'"g' /etc/nginx/conf.d/default.conf

chmod +x ./env.sh && ./env.sh && cp env-config.js /usr/share/nginx/html/

nginx -g 'daemon off;'
