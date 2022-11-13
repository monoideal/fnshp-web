#! /usr/bin/env bash
trap exit ERR

echo "Installing yarn..."
npm install --global yarn

echo
echo "Installing dependencies..."
yarn install

echo
echo "Injecting local development artifacts..."
mkdir -p public/
echo '{"API_URL": "http://localhost:3333"}' > public/apiendpoint.json

echo
echo "Bootstrapping done! For development, run using:"
printf "\tyarn start\n\n"
echo "Make sure you also pull FS_BE (Fanship Backend) and run it simultaneously with:"
printf "\tyarn run dev\n"