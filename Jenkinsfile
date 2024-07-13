pipeline {
    agent any
    environment {
        APP_NAME = 'reticle-generator'
        HUSKY = 0
    }
    tools {
        nodejs 'nodejs 20.x'
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '5', daysToKeepStr: '5'))
        timestamps()
        timeout(time: 10, unit: 'MINUTES')
    }
    stages {
        stage("npm") {
            when {
                anyOf {
                    changeset "package-lock.json"
                    expression {
                        fileExists("node_modules") == false
                    }
                }
            }
            steps {
                sh 'npm ci --silent'
            }
        }
        stage("clean") {
            steps {
                sh 'npm run clean:coverage'
                sh 'npm run clean:dist'
            }
        }
        stage("test") {
            parallel {
                stage("unit") {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage("lint") {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage("stylelint") {
                    steps {
                        sh 'npm run stylelint'
                    }
                }
            }
            post {
                success {
                    recordCoverage(tools: [[parser: 'COBERTURA', pattern: 'coverage/cobertura-coverage.xml']])
                }
            }
        }
        stage("build") {
            when {
                branch 'main'
            }
            steps {
                sh 'npm run build:prod'
            }
        }
        stage("deploy") {
            when {
                branch 'main'
            }
            steps {
              sshagent(['PLESK_RSYNC_SSH_DEEGEEMEE']) {
                sh "rsync -av --delete --exclude .well-known -e 'ssh -o StrictHostKeyChecking=no' dist/reticle-generator/browser/ deegeemee@deegeemee.net:~/reticle-generator.deegeemee.net/"
              }         
            }
        }
    }
}
