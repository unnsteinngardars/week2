node {
    stage('Build') {
        echo 'Building....'
        def nodeHome = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${nodeHome}/bin:${env.PATH}"
        checkout scm
        sh 'npm install'
        sh 'cd client && npm install && cd ..'
    }
    stage('Test') {
        echo 'Testing..'
        echo 'Running unit tests'
        sh 'npm run testJenkins'
    }
    stage('Deploy') {
        echo 'Deploying....'
        echo ${DeclarativeDockerUtils.getRegistryCredentialsId('docker-id')}
    }
}
