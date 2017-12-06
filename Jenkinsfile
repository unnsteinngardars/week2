node {
    checkout scm
    stage('Build') {
        echo 'Building..'
        def nodeHome = tool name: 'node-6.9.1', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${nodeHome}/bin:${env.PATH}"
        sh 'npm install'
        sh 'npm install'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
