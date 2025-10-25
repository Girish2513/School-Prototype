pipeline {
    agent any

    environment {
        DEPLOY_DIR = "C:\\inetpub\\wwwroot\\school" 
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo ' Cloning code from GitHub...'
                git branch: 'main', url: 'https://github.com/Girish2513/School-Prototype.git'
            }
        }

        stage('Deploy Application') {
            steps {
                echo ' Deploying website files to web directory...'
                bat """
                if not exist "%DEPLOY_DIR%" mkdir "%DEPLOY_DIR%"
                xcopy * "%DEPLOY_DIR%" /E /Y
                """
            }
        }
    }

    post {
        success {
            echo ' School-Prototype deployed successfully!'
        }
        failure {
            echo ' Deployment failed. Check Jenkins console logs.'
        }
    }
}
