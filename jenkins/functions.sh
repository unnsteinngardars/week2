function create-key-pair(){
  PEM_NAME=$1
  INSTANCE_DIR=$2
  SECURITY_GROUP_NAME=$3
    if [ ! -e ${INSTANCE_DIR}/${PEM_NAME}.pem ]; then
        aws ec2 create-key-pair --key-name ${PEM_NAME} --query 'KeyMaterial' --output text > ${INSTANCE_DIR}/${PEM_NAME}.pem
        chmod 400 ${INSTANCE_DIR}/${PEM_NAME}.pem
        echo ${PEM_NAME} > ./ec2_instance/pem-name.txt
    fi

}

function create-security-group(){
    SECURITY_GROUP_NAME=${1}
    if [ ! -e ./ec2_instance/security-group-id.txt ]; then
        export SECURITY_GROUP_ID=$(aws ec2 create-security-group --group-name ${SECURITY_GROUP_NAME} --description "security group for dev environment in EC2" --query "GroupId"  --output=text)
        echo ${SECURITY_GROUP_ID} > ./ec2_instance/security-group-id.txt
    else
        export SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
    fi
}

function delete-security-group(){
    SECURITY_GROUP_NAME=${1}
    if [ -e ./ec2_instance/security-group-id.txt ]; then
        SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
        aws ec2 delete-security-group --group-name ${SECURITY_GROUP_NAME}
        rm ./ec2_instance/security-group-id.txt
    fi
}

function create-ec2-instance(){
    AMI_IMAGE_ID=$1
    SECURITY_GROUP_ID=$2
    INSTANCE_INIT_SCRIPT=$3
    PEM_NAME=$4

    if [ ! -e ./ec2_instance/instance-id.txt ]; then
        set -e
        echo aws ec2 run-instances  --user-data file://${INSTANCE_INIT_SCRIPT} --image-id ${AMI_IMAGE_ID} --security-group-ids ${SECURITY_GROUP_ID} --count 1 --instance-type t2.micro --key-name ${PEM_NAME} --query 'Instances[0].InstanceId'  --output=text

        INSTANCE_ID=$(aws ec2 run-instances  --user-data file://${INSTANCE_INIT_SCRIPT} --image-id ${AMI_IMAGE_ID} --security-group-ids ${SECURITY_GROUP_ID} --count 1 --instance-type t2.micro --key-name ${PEM_NAME} --query 'Instances[0].InstanceId'  --output=text)
        echo ${INSTANCE_ID} > ./ec2_instance/instance-id.txt

        echo aws ec2 wait --region us-east-2 instance-running --instance-ids ${INSTANCE_ID}
        aws ec2 wait --region us-east-2 instance-running --instance-ids ${INSTANCE_ID}
        export INSTANCE_PUBLIC_NAME=$(aws ec2 describe-instances --instance-ids ${INSTANCE_ID} --query "Reservations[*].Instances[*].PublicDnsName" --output=text)
    fi

    if [ ! -e ./ec2_instance/instance-public-name.txt ]; then
        echo ${INSTANCE_PUBLIC_NAME} > ./ec2_instance/instance-public-name.txt
    fi
}


function authorize-access(){
    SECURITY_GROUP_NAME=$1
    MY_PUBLIC_IP=$(curl http://checkip.amazonaws.com)
    MY_CIDR=${MY_PUBLIC_IP}/32
    ALL=0.0.0.0/0

    echo Adding permissions. AWS console errors are ignored.
    set +e
    aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 22 --cidr ${MY_CIDR}
    aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 80 --cidr ${MY_CIDR}
    aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 8080 --cidr ${MY_CIDR}
    aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 443 --cidr ${MY_CIDR}
    aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 443 --cidr ${ALL}
    aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 80 --cidr ${ALL}
    aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 8080 --cidr ${ALL}
    set -e
}
