#!/bin/sh

docker-compose down --remove-orphans
docker-compose up -d --remove-orphans

pnpm run dev
