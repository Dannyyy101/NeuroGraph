pipeline {
  agent any
  environment { COMPOSE_PROJECT_NAME = 'neurograph' }

  stages {
    stage('Checkout') {
      steps { checkout scm }
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
    stage('Set Env & Deploy') {
      when { anyOf { branch 'develop'; branch 'main' } }
      steps {
        script {
          // Ports basierend auf BRANCH_NAME setzen
          def ports = (env.BRANCH_NAME == 'develop') ?
            "SPRING_PORT=8080\nNEXTJS_PORT=3000\nPOSTGRES_PORT=5432\n" :
            "SPRING_PORT=8081\nNEXTJS_PORT=3001\nPOSTGRES_PORT=5431\n"
          writeFile file: '.env.ports', text: ports
          sh '''
            cat .env.ports >> .env
            docker compose down || true
            docker compose up -d --build --force-recreate
          '''
        }
      }
    }
  }
  post {
    success { echo "✅ Deploy ${env.BRANCH_NAME} erfolgreich" }
    failure { echo "❌ Deploy ${env.BRANCH_NAME} fehlgeschlagen" }
    cleanup { sh 'rm -f .env.ports' }
  }
}
