pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'NeuroGraph'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
stage('Inject Secrets') {
    steps {
        withCredentials([string(credentialsId: '520b2dc7-dd30-469a-9b0e-4db480307e6b', variable: 'ENV_CONTENT')]) {
            writeFile file: '.env', text: "${ENV_CONTENT}"
        }
    }
}

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose -f docker-compose.yml --env-file .env build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose -f docker-compose.yml --env-file .env up -d'
            }
        }

        stage('Teardown') {
            steps {
                sh 'docker-compose -f docker-compose.yml --env-file .env down'
            }
        }
    }
}
