pipeline {
  agent any

  tools {
    maven 'Default'    // Configure Maven dans Jenkins
    nodejs 'NodeJS'    // Configure NodeJS dans Jenkins
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend') {
      steps {
        dir('BackEnd') {
          sh 'mvn clean install -DskipTests'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('FrontEnd') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Run Tests') {
      steps {
        dir('BackEnd') {
          sh 'mvn test'
        }
        dir('FrontEnd') {
          sh 'npm test || true'
        }
      }
    }

    stage('Package') {
      steps {
        archiveArtifacts artifacts: 'BackEnd/target/*.jar', fingerprint: true
        archiveArtifacts artifacts: 'FrontEnd/dist/**', fingerprint: true
      }
    }

    stage('Deploy with Docker') {
      steps {
        sh 'docker-compose up -d --build'
      }
    }
  }

  post {
    success {
      echo '✅ Build et déploiement réussis !'
    }
    failure {
      echo '❌ Erreur dans le pipeline'
    }
  }
}
