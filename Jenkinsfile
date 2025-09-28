pipeline {
    agent any

    tools {
        maven 'Default'   // Ton Maven configuré
        nodejs 'NodeJS'  // Ton NodeJS configuré
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Microservices') {
            steps {
                script {
                    def services = [
                        "BackEnd/Microservices/Microservice-Assurance",
                        "BackEnd/Microservices/Microservice-Avis",
                        "BackEnd/Microservices/Microservice-Reclamation",
                        "BackEnd/Microservices/Microservice-Recrutement",
                        "BackEnd/Microservices/Microservice-Rendezvous",
                        "BackEnd/Microservices/Microservice-Sinistre",
                        "BackEnd/Microservices/Microservice-User",
                        "BackEnd/Microservices/config-service",
                        "BackEnd/Microservices/eureka",
                        "BackEnd/Microservices/gateway",
                        "BackEnd/Microservices/partenaire-service"
                    ]
                    
                    for (service in services) {
                        dir(service) {
                            sh 'mvn clean install -DskipTests'
                        }
                    }
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

        stage('Package with Docker') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy with Docker') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline terminé avec succès !'
        }
        failure {
            echo '❌ Erreur dans le pipeline.'
        }
    }
}
