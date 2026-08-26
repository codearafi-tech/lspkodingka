pipeline {
    agent any

    environment {

        HARBOR_REGISTRY        = 'harbor.nawastralabs.com'
        HARBOR_REPOSITORY      = 'lsp/web'
        IMAGE_NAME             = "${HARBOR_REGISTRY}/${HARBOR_REPOSITORY}"
        IMAGE_TAG              = "${env.BUILD_NUMBER}"
        HARBOR_CREDENTIALS     = 'harbor-credentials'    // Jenkins credentials ID (username/password or robot token) for Harbor

        COOLIFY_URL            = 'https://coolify.nawastralabs.com'
        COOLIFY_SERVICE_UUID   = 'vxgi8g87njqcjywr4jgzphu1'
        COOLIFY_CREDENTIALS    = 'coolify-api-token'      // Jenkins credentials ID (secret text) for the Coolify API token
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

        stage('Update Coolify IMAGE_TAG') {
            steps {
                withCredentials([string(credentialsId: COOLIFY_CREDENTIALS, variable: 'COOLIFY_API_TOKEN')]) {
                    sh '''
                        curl -sf -X PATCH "${COOLIFY_URL}/api/v1/services/${COOLIFY_SERVICE_UUID}/envs" \
                            -H "Authorization: Bearer ${COOLIFY_API_TOKEN}" \
                            -H "Content-Type: application/json" \
                            -d "{\\"key\\": \\"IMAGE_TAG\\", \\"value\\": \\"${IMAGE_TAG}\\"}"
                    '''
                }
            }
        }

        stage('Deploy on Coolify') {
            steps {
                withCredentials([string(credentialsId: COOLIFY_CREDENTIALS, variable: 'COOLIFY_API_TOKEN')]) {
                    sh '''
                        curl -sf -X GET "${COOLIFY_URL}/api/v1/deploy?uuid=${COOLIFY_SERVICE_UUID}" \
                            -H "Authorization: Bearer ${COOLIFY_API_TOKEN}"
                    '''
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
