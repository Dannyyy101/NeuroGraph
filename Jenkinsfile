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
                        cp "$ENV_FILE_PATH" .env
                        echo "Current branch: $BRANCH_NAME"
                    '''
                }
            }
        }

        stage('Set Environment Variables') {
            steps {
                script {
                    def portConfig = ''
                    if (env.BRANCH_NAME == 'develop') {
                        portConfig = '''
SPRING_PORT=8080
NEXTJS_PORT=3000
POSTGRES_PORT=5432
'''
                    } else if (env.BRANCH_NAME == 'main') {
                        portConfig = '''
SPRING_PORT=8081
NEXTJS_PORT=3001
POSTGRES_PORT=5431
'''
                    }

                    if (portConfig) {
                        writeFile file: '.env.ports', text: portConfig
                        sh 'cat .env.ports >> .env'
                    } else {
                        echo "No additional ports set for branch ${env.BRANCH_NAME}"
                    }
                }
            }
        }

        stage('Docker Compose Build & Deploy') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                sh '''
                    docker compose -f docker-compose.yml --env-file .env down || true
                    docker compose -f docker-compose.yml --env-file .env up -d --build --force-recreate
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Deployment failed on branch ${env.BRANCH_NAME}"
        }
        success {
            echo "✅ Deployment succeeded on branch ${env.BRANCH_NAME}"
        }
        cleanup {
            sh 'rm -f .env.ports || true'
        }
    }
}
