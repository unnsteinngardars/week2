#!/usr/bin/env bash

export GIT_COMMIT=$1
echo $GIT_COMMIT
docker-compose down
docker-compose up -d --build
