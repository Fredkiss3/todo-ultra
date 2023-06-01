#!/bin/sh

# Generate keyfile for mongoDB
openssl rand -base64 741 > mongodb_keyfile
chmod 600 mongodb_keyfile

# Start docker
docker-compose down --remove-orphans
docker-compose up -d --remove-orphans

# Start server
pnpm run dev
