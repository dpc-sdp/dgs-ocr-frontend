#!/usr/bin/env sh
set -eu

envsubst '${REACT_APP_ENDPOINT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"