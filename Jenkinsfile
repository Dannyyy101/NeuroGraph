pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'neurograph'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    stage('Inject Secrets') {
        steps {
            withCredentials([file(credentialsId: '520b2dc7-dd30-469a-9b0e-4db480307e6b', variable: 'ENV_FILE_PATH')]) {
                sh '''
                    cp $ENV_FILE_PATH .env
                    echo "Current branch: $BRANCH_NAME"
                '''
            }
        }
    }

    stage("Deploy to develop"){
            when {
                branch 'develop'
            }
            steps {
                echo "SPRING_PORT=8080" >> .env
                echo "NEXTJS_PORT=3000" >> .env
                echo "POSTGRES_PORT=5432" >> .env
                sh 'docker compose -f docker-compose.yml --env-file .env build'
                sh 'docker compose -f docker-compose.yml --env-file .env up -d'
            }
        }

    stage("Deploy to production"){
        when {
            branch 'main'
        }
        steps {
            echo "SPRING_PORT=8081" >> .env
            echo "NEXTJS_PORT=3001" >> .env
            echo "POSTGRES_PORT=5431" >> .env
            sh 'docker compose -f docker-compose.yml --env-file .env build'
            sh 'docker compose -f docker-compose.yml --env-file .env up -d'
        }
    }
}
