#!/bin/sh

CONFIG_PATH=/app/build/runtime-config.js

if [ -z ${SERVER_HOST} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, SERVER_HOST env is empty, failing!"
  exit 1
fi
if [ -z ${SHOPIFY_DOMAIN} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, SHOPIFY_DOMAIN env is empty, failing!"
  exit 1
fi
if [ -z ${SHOPIFY_STOREFRONT_ACCESS_TOKEN} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, SHOPIFY_STOREFRONT_ACCESS_TOKEN env is empty, failing!"
  exit 1
fi
if [ -z ${AUTH0_DOMAIN} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, AUTH0_DOMAIN env is empty, failing!"
  exit 1
fi
if [ -z ${AUTH0_CLIENT_ID} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, AUTH0_CLIENT_ID env is empty, failing!"
  exit 1
fi
if [ -z ${AUTH0_AUDIENCE} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, AUTH0_AUDIENCE env is empty, failing!"
  exit 1
fi
if [ -z ${PLAID_PUBLIC_KEY} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, PLAID_PUBLIC_KEY env is empty, failing!"
  exit 1
fi
if [ -z ${FILESTORE_CLIENT_ID} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, FILESTORE_CLIENT_ID env is empty, failing!"
  exit 1
fi
if [ -z ${CREATOR_ACCESS_CODE_HASH} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, CREATOR_ACCESS_CODE_HASH env is empty, failing!"
  exit 1
fi
if [ -z ${ADMIN_ACCESS_CODE_HASH} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, ADMIN_ACCESS_CODE_HASH env is empty, failing!"
  exit 1
fi
if [ -z ${AL_FRONTEND_URL} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, AL_FRONTEND_URL env is empty, failing!"
  exit 1
fi
if [ -z ${GOOGLE_ANALYTICS_UA_ID} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, GOOGLE_ANALYTICS_UA_ID env is empty, failing!"
  exit 1
fi
if [ -z ${SMARTLOOK_KEY} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, SMARTLOOK_KEY env is empty, failing!"
  exit 1
fi
if [ -z ${NODE_ENV} ]; then
  echo "The ENDPOINT HAS NOT BEEN SET, NODE_ENV env is empty, failing!"
  exit 1
fi

RUNTIME_CONFIG='window['"'"'runConfig'"'"'] = {
	"SERVER_HOST": "%s",
	"SHOPIFY_DOMAIN": "%s",
	"SHOPIFY_STOREFRONT_ACCESS_TOKEN": "%s",
	"AUTH0_DOMAIN": "%s",
	"AUTH0_CLIENT_ID": "%s",
	"AUTH0_AUDIENCE": "%s",
	"PLAID_PUBLIC_KEY": "%s",
	"FILESTORE_CLIENT_ID": "%s",
	"CREATOR_ACCESS_CODE_HASH": "%s",
	"ADMIN_ACCESS_CODE_HASH": "%s",
	"AL_FRONTEND_URL": "%s",
	"GOOGLE_ANALYTICS_UA_ID": "%s",
	"SMARTLOOK_KEY": "%s",
	"NODE_ENV":"%s"
};
'
printf 	"$RUNTIME_CONFIG" \
	"$SERVER_HOST" \
	"$SHOPIFY_DOMAIN" \
	"$SHOPIFY_STOREFRONT_ACCESS_TOKEN" \
	"$AUTH0_DOMAIN" \
	"$AUTH0_CLIENT_ID" \
	"$AUTH0_AUDIENCE" \
	"$PLAID_PUBLIC_KEY" \
	"$FILESTORE_CLIENT_ID" \
	"$CREATOR_ACCESS_CODE_HASH" \
	"$ADMIN_ACCESS_CODE_HASH" \
	"$AL_FRONTEND_URL" \
	"$GOOGLE_ANALYTICS_UA_ID" \
	"$SMARTLOOK_KEY" \
	"$NODE_ENV" \
	> ${CONFIG_PATH}
/usr/sbin/nginx -g 'daemon off;'