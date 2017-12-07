#!/bin/bash -xv
if [ -z "$GIT_COMMIT" ];
then
    export GIT_COMMIT=$(git rev-parse HEAD)
fi


if [ ! -d ~/ec2_instance/ ]; then
    source ./create-aws-docker-host-instance.sh
fi

INSTANCE_PUBLIC_NAME=$(cat ./ec2_instance/instance-public-name.txt)
source ./update-env.sh ${INSTANCE_PUBLIC_NAME}

echo New environment provisioned