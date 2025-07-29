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
                withCredentials([
                    string(credentialsId: 'POSTGRES_USER', variable: 'POSTGRES_USER'),
                    string(credentialsId: 'POSTGRES_PASSWORD', variable: 'POSTGRES_PASSWORD'),
                    string(credentialsId: 'SPRING_DATASOURCE_USERNAME', variable: 'SPRING_DATASOURCE_USERNAME'),
                    string(credentialsId: 'SPRING_DATASOURCE_PASSWORD', variable: 'SPRING_DATASOURCE_PASSWORD')
                ]) {
                    script {
                        writeFile file: '.env', text: """
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}
"""
                    }
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
