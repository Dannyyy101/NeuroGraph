pipeline {
    agent any

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
                        echo "Branch: $BRANCH_NAME"
                    '''
                }
            }
        }

        stage('Set Ports & Deploy') {
            when { anyOf { branch 'develop'; branch 'main' } }
            steps {
                script {
                    // 1) branch‑spezifisches Docker‑Project
                    def projectName = "neurograph-${env.BRANCH_NAME}"

                    // 2) Port‑Konfiguration
                    def ports = (env.BRANCH_NAME == 'develop') ? '''
                        SPRING_PORT=8080
                        NEXTJS_PORT=3000
                        POSTGRES_PORT=5432
                        ''' : '''
                        SPRING_PORT=8081
                        NEXTJS_PORT=3001
                        POSTGRES_PORT=5431
                        '''
                    writeFile file: '.env.ports', text: ports
                    sh '''
                        # Merge secrets‑.env mit Ports
                        cat .env.ports >> .env

                        # Clean deploy nur für dieses Project
                        docker compose -p ''' + projectName + ''' -f docker-compose.yml --env-file .env down || true

                        # Build & up für dieses Project
                        docker compose -p ''' + projectName + ''' -f docker-compose.yml --env-file .env up -d --build --force-recreate
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment ${env.BRANCH_NAME} (Project: neurograph-${env.BRANCH_NAME}) erfolgreich"
        }
        failure {
            echo "❌ Deployment ${env.BRANCH_NAME} fehlgeschlagen"
        }
        cleanup {
            sh 'rm -f .env.ports || true'
        }
    }
}
