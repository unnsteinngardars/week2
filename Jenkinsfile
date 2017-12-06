node {
    checkout scm
    stage('Build') {
        echo 'Building..'
        env.NODEJS_HOME = "${tool 'Node 6.9.1'}"
        env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
        sh 'npm install'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
