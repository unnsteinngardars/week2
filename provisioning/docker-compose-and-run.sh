#!/usr/bin/env bash

export GIT_COMMIT=$1
echo $GIT_COMMIT
echo (pwd)
docker-compose down
docker-compose up -d --build
