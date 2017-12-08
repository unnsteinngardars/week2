#!/usr/bin/env bash -xv

THISDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source ${THISDIR}/functions.sh

INSTANCE_ID=$(cat ./ec2_instance/instance-id.txt)
SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
USERNAME=$(aws iam get-user --query 'User.UserName' --output text)
PEM_NAME=jenkins-${USERNAME}
JENKINS_SECURITY_GROUP=jenkins-${USERNAME}


if [ -e "./ec2_instance/instance-id.txt" ]; then
    aws ec2 terminate-instances --instance-ids ${INSTANCE_ID}

    aws ec2 wait --region us-east-2 instance-terminated --instance-ids ${INSTANCE_ID}

    rm ./ec2_instance/instance-id.txt
    rm ./ec2_instance/instance-public-name.txt
fi

if [ ! -e ./ec2_instance/security-group-id.txt ]; then
    SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
else
    delete-security-group ${JENKINS_SECURITY_GROUP}
    rm ./ec2_instance/security-group-id.txt
fi

rm -rf ./ec2_instance
