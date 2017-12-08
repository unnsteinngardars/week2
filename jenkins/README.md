# Create ec2 instance for jenkins
Using the following scripts and files
* cicd-access-policy.json
* createAndConfigureRole.sh
* createCredentialsAndProvisionInstance.sh
* deployOnInstance.sh
* bootstrap-jenkins.sh
* functions.sh
* destroyInstance.sh

## Create and configure Role
'''./createAndConfigureRole.sh'''

CreateRole operations creates role StudentCICDServer
CreateInstanceProfile operation creates instance profile CICDServer-Instance-Profile

## Create credentials and provision Instance
'''./createCredentialsAndProvisionInstance.sh'''

## Deploy on instances
'''./deployOnInstance.sh'''

# Configure AWS jenkins server

'''ssh -i ./ec2_instance/pem-file-name.pem ec2-user@instance-public-name'''
'''sudo su -s /bin/bash jenkins'''
'''cd /var/lib/jenkins'''
'''ssh-keygen'''
press enter until randomart shows up
'''cat .ssh/id_rsa.pub'''

* Copy public key to clipboard
* Add key to github

Exit from jenkins user
'''exit'''
'''sudo vim /var/lib/jenkins/config.xml'''
change <useSecurity>true</useSecurity> to false
and remove <authorizeStrategy> and <securityRealm>
'''sudo service jenkins restart'''
'''sudo reboot'''

## Configure jenkins in browser
* navigate to INSTANCE_PUBLIC_NAME:8080
* select Manage Jenkins -> Configure Global Security
* then select enable security and Jenkins' own user database
* and also select logged in users can do anything

### Create Jenkinsfile in root of the app project repo
```
node {
    checkout scm
    stage('Build') {
        echo 'Building..'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
```
This file will be edited

## Create Jenkins project
### Install following plugins
* pipeline
* git plugin for SCM
* GitHub Integration plugin

### Create a new job
* Select Create new job
* Select pipeline
* navigate to pipeline tab
* set definition as pipeline script from SCM
* select git as SCM

**Go to then next step of this README.md file, Configure your git repository, then continue here**

* Enter your SSH repo url in the Repository url field
* Create new credentials
  * select kind as SSH username with private key
  * enter your username
  * select From the Jenkins master ~/.ssh
* open terminal where you are logged into the linux AMI machine
* enter the following commands
'''sudo yum install git'''
'''sudo su -s /bin/bash jenkins'''
'''ssh git@github.com'''
'''yes'''
'''exit'''

* add, commit and push the Jenkinsfile to your repo and see it getting polled by jenkins

### Configure your git repository
* Go to your git repository
* settings -> integration & services
* Add service -> select Jenkins(GitHub plugin)
* in the Jenkins hook url input field paste your url plus /github-webhook/
  * e.g http://ec2-13-58-66-142.us-east-2.compute.amazonaws.com:8080/github-webhook/
* click add service

**Go back to the previous step, Create jenkins project**

### Install NPM on ec2 instance and jenkins user

'''curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash'''
'''. ~/.nvm/nvm.sh'''
'''nvm install 6.9.1'''
'''npm install'''
'''sudo su -s /bin/bash jenkins'''
'''curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash'''
'''. ~/.nvm/nvm.sh'''
'''nvm install 6.9.1'''
'''cd /var/lib/jenkins/jobs/week2/workspace/client'''
'''npm install'''

### Add Node JS plugin
* Add Node JS plugin for jenkins if not already available
* restart jenkins
* manage jenkins -> configure Tools
* NodeJS -> Add Node
  * Name: node <!-- Important that name is exactly as tool name in Jenkinsfile -->
  * version: 6.9.1
  * Global NPM packages to install
    * nodemon

### Configure Jenkinsfile
```
node {
    stage('Build') {
        echo 'Building....'
        def nodeHome = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${nodeHome}/bin:${env.PATH}"
        checkout scm
        sh 'npm install'
        sh 'npm install -g nodemon'
        sh 'npm install -g create-react-app'
        sh 'cd client && npm install && cd ..'
    }
    stage('Test') {
        echo 'Testing..'
        echo 'Running unit tests'
        sh 'npm run testJenkins'
    }
    stage('Deploy') {
        echo 'Deploying....'
        sh 'npm run build'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
             sh 'docker login -u $USERNAME -p $PASSWORD'
        }
        sh './dockerbuild.sh'
        sh 'cd provisioning && ./provision-new-environment.sh'
    }
}
```

### aws configure on jenkins
run aws configure on jenkins to grant aws cli to jenkins
'''aws configure'''
create key and enter stuff as before
key, secret key, zone and text
