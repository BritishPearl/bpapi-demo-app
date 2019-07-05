#!/bin/sh

set -e

rm -rf ./env-config.js
touch ./env-config.js

echo "window._env_ = {" >> ./env-config.js

echo "  BP_DEMO_API_URL: \"$BP_DEMO_API_URL\"," >> ./env-config.js

SITE_KEY=${REACT_APP_GOOGLE_SITE_KEY:-''}

echo "  REACT_APP_GOOGLE_SITE_KEY: \"$SITE_KEY\"," >> ./env-config.js

echo "}" >> ./env-config.js
