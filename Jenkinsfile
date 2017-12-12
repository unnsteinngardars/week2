node {
    stage('Build') {
        echo 'Building..'
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
        echo 'Deploying..'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
             sh 'docker login -u $USERNAME -p $PASSWORD'
        }
        sh './dockerbuild.sh'
        sh 'cd provisioning && ./provision-new-environment.sh'
        sh 'npm run apitestJenkins'
    }
}
