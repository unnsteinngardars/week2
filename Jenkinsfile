node {
    stage('Build') {
        echo 'Building..'
        def nodeHome = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${nodeHome}/bin:${env.PATH}"
        checkout scm
        sh 'npm install'
        sh 'npm install -g nodemon'
        sh 'npm install -g create-react-app'
        sh 'npm install -g db-migrate'
        sh 'cd client && npm install && cd ..'
    }
    stage('Test') {
        echo 'Testing..'
        echo 'Running unit tests'
        sh 'npm run testJenkins'
        sh 'npm run startpostgres'
        sh 'npm run startserver:dev & npm run apitestJenkins && npm run loadtestJenkins && sleep 10 && kill $!'
        junit '**/jasmine-reports/*.xml'
    }
    stage('Deploy') {
        echo 'Deploying..'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
             sh 'docker login -u $USERNAME -p $PASSWORD'
        }
        sh './dockerbuild.sh'
        sh 'cd provisioning && ./provision-new-environment.sh'
    }
}
