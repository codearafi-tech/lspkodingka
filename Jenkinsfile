pipeline {
    agent any

    environment {

        HARBOR_REGISTRY        = 'harbor.nawastralabs.com'
        HARBOR_REPOSITORY      = 'lsp/web'
        IMAGE_NAME             = "${HARBOR_REGISTRY}/${HARBOR_REPOSITORY}"
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
                    env.IMAGE_TAG = packageJson.version
                    dockerImage = docker.build("${IMAGE_NAME}:${env.IMAGE_TAG}")
                    currentBuild.displayName = "#${env.BUILD_NUMBER} - ${IMAGE_NAME}:${env.IMAGE_TAG}"
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
                        RESPONSE_FILE=$(mktemp)

                        HTTP_STATUS=$(curl -s -o "$RESPONSE_FILE" -w "%{http_code}" -X PATCH "${COOLIFY_URL}/api/v1/services/${COOLIFY_SERVICE_UUID}/envs" \
                            -H "Authorization: Bearer ${COOLIFY_API_TOKEN}" \
                            -H "Content-Type: application/json" \
                            -d "{\\"key\\": \\"IMAGE_TAG\\", \\"value\\": \\"${IMAGE_TAG}\\"}")

                        if [ "$HTTP_STATUS" = "404" ]; then
                            echo "IMAGE_TAG env var not found on Coolify service, creating it instead..."
                            HTTP_STATUS=$(curl -s -o "$RESPONSE_FILE" -w "%{http_code}" -X POST "${COOLIFY_URL}/api/v1/services/${COOLIFY_SERVICE_UUID}/envs" \
                                -H "Authorization: Bearer ${COOLIFY_API_TOKEN}" \
                                -H "Content-Type: application/json" \
                                -d "{\\"key\\": \\"IMAGE_TAG\\", \\"value\\": \\"${IMAGE_TAG}\\"}")
                        fi

                        echo "Coolify response (HTTP $HTTP_STATUS):"
                        cat "$RESPONSE_FILE"
                        echo
                        rm -f "$RESPONSE_FILE"

                        if [ "$HTTP_STATUS" -ge 400 ]; then
                            exit 1
                        fi
                    '''
                }
            }
        }

        stage('Deploy on Coolify') {
            steps {
                withCredentials([string(credentialsId: COOLIFY_CREDENTIALS, variable: 'COOLIFY_API_TOKEN')]) {
                    sh '''
                        RESPONSE_FILE=$(mktemp)

                        HTTP_STATUS=$(curl -s -o "$RESPONSE_FILE" -w "%{http_code}" -X GET "${COOLIFY_URL}/api/v1/deploy?uuid=${COOLIFY_SERVICE_UUID}" \
                            -H "Authorization: Bearer ${COOLIFY_API_TOKEN}")

                        echo "Coolify response (HTTP $HTTP_STATUS):"
                        cat "$RESPONSE_FILE"
                        echo
                        rm -f "$RESPONSE_FILE"

                        if [ "$HTTP_STATUS" -ge 400 ]; then
                            exit 1
                        fi
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
