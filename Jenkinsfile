node {
    stage('Build') {
        echo 'Building..'
        def nodeHome = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${nodeHome}/bin:${env.PATH}"
        checkout scm
        sh 'npm install'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
