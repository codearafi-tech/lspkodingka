pipeline {
    agent any

    environment {

        HARBOR_REGISTRY        = 'harbor.nawastralabs.com'
        HARBOR_REPOSITORY      = 'lsp/web'
        IMAGE_NAME             = "${HARBOR_REGISTRY}/${HARBOR_REPOSITORY}"
        IMAGE_TAG              = "${env.BUILD_NUMBER}"
        HARBOR_CREDENTIALS     = 'harbor-credentials'    // Jenkins credentials ID (username/password or robot token) for Harbor
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                script {
                    def packageJson = readJSON file: 'package.json'
                    IMAGE_TAG = packageJson.version
                    dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                    currentBuild.displayName = "#${env.BUILD_NUMBER} - ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Push to Harbor') {
            steps {
                script {
                    docker.withRegistry("https://${HARBOR_REGISTRY}", HARBOR_CREDENTIALS) {
                        dockerImage.push("${IMAGE_TAG}")
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest || true"
        }
        success {
            echo "Pushed ${IMAGE_NAME}:${IMAGE_TAG} to Harbor"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
