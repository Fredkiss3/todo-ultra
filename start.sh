#!/bin/sh

docker-down up --remove-orphans
docker-compose up -d --remove-orphans

pnpm run dev
