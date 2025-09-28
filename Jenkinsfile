pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build') {
      steps {
        echo 'Build du projet...'
        sleep 2
      }
    }
    stage('Test') {
      steps {
        echo 'Tests en cours...'
        sleep 2
      }
    }
    stage('Deploy') {
      steps {
        echo 'Déploiement simulé...'
        sleep 2
      }
    }
  }
}
