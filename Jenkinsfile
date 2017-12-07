node {
    stage('Build') {
        echo 'Building...'
        def nodeHome = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${nodeHome}/bin:${env.PATH}"
        checkout scm
        sh 'npm install'
        dir('/var/lib/jenkins/jobs/week2/workspace/client'){
            sh 'pwd'
            sh 'npm install'
        }
        dir('/'){
            sh 'pwd'
        }
    }
    stage('Test') {
        echo 'Testing..'
        sh 'npm run testJenkins'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
