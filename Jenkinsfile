pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
        PATH = '/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'

        UNITY_PATH = '/Applications/Unity/Hub/Editor/2022.3.22f1/Unity.app/Contents/MacOS/Unity'
        PROJECT_PATH = "${WORKSPACE}/poker-table-unity-app"
        BUILD_PATH = "${PROJECT_PATH}/Builds/Android"
        APK_VERSIONED = "poker_v${BUILD_NUMBER}.apk"
        LOG_VERSIONED = "unity_build_v${BUILD_NUMBER}.log"

        JAVA_HOME = '/opt/homebrew/opt/openjdk@11'
        ANDROID_HOME = '/Users/monikakumari/Library/Android/sdk'
        ANDROID_NDK_HOME = '/Users/monikakumari/Library/Android/sdk/ndk/25.1.8937393'

        S3_BUCKET = 'only-unity-build'
        S3_FOLDER = 'wildace-poker-apk'
        S3_REGION = 'ap-south-1'  // S3 upload region....

        SES_REGION = 'us-west-2'  // SES verified region

        DOCKER_IMAGE = 'wildace/poker-webapp-server'
        DOCKER_TAG = "v${BUILD_NUMBER}"

        EMAIL_RECIPIENTS = 'naveen@wildace.in,monika@wildace.in,ravi@wildace.in,dileep@wildace.in,wilson@wildace.in'
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    def start = System.currentTimeMillis()
                    git branch: 'main',
                        url: 'https://github.com/PredictaPoker/poker-mono-repo.git',
                        credentialsId: 'predicta-github-connection-jenkins'
                    env.CHECKOUT_DURATION = ((System.currentTimeMillis() - start)/1000) + " sec"
                }
            }
        }

        stage('Build React Apps') {
            steps {
                script {
                    def start = System.currentTimeMillis()
                    dir('poker-player-react-app') {
                        sh '''
                            npm uninstall node-sass --force
                            npm install sass --force
                            npm install --force
                            npm run build
                        '''
                    }
                    dir('poker-admin-react-app') {
                        sh '''
                            npm install --force
                            npm run build
                        '''
                    }
                    env.REACT_DURATION = ((System.currentTimeMillis() - start)/1000) + " sec"
                }
            }
        }

        stage('Copy React Builds') {
            steps {
                script {
                    def start = System.currentTimeMillis()
                    sh '''
                        rm -rf poker-webapp-server/public/compiled/tablet
                        rm -rf poker-webapp-server/public/compiled/admin
                        mkdir -p poker-webapp-server/public/compiled/tablet
                        mkdir -p poker-webapp-server/public/compiled/admin
                        cp -r poker-player-react-app/release/app/* poker-webapp-server/public/compiled/tablet/ || echo "Player build not found"
                        cp -r poker-admin-react-app/release/app/* poker-webapp-server/public/compiled/admin/ || echo "Admin build not found"
                    '''
                    env.COPY_DURATION = ((System.currentTimeMillis() - start)/1000) + " sec"
                }
            }
        }

        stage('Unity Build') {
            steps {
                script {
                    def start = System.currentTimeMillis()
                    sh """
                        mkdir -p "${BUILD_PATH}"
                        export JAVA_HOME=${JAVA_HOME}
                        export ANDROID_HOME=${ANDROID_HOME}
                        export ANDROID_NDK_HOME=${ANDROID_NDK_HOME}
                        export PATH=$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_NDK_HOME:$PATH

                        "${UNITY_PATH}" -batchmode -nographics -quit -projectPath "${PROJECT_PATH}" \
                            -executeMethod BuildScript.BuildAndroid -buildTarget Android \
                            -customBuildPath "${BUILD_PATH}/${APK_VERSIONED}" \
                            -logFile "${WORKSPACE}/${LOG_VERSIONED}"

                        tail -50 "${WORKSPACE}/${LOG_VERSIONED}"

                        if [ ! -f "${BUILD_PATH}/${APK_VERSIONED}" ]; then
                            exit 1
                        fi
                    """
                    env.UNITY_DURATION = ((System.currentTimeMillis() - start)/1000) + " sec"
                }
            }
        }

        stage('Upload to S3') {
            when { expression { fileExists("${BUILD_PATH}/${APK_VERSIONED}") } }
            steps {
                script {
                    def start = System.currentTimeMillis()
                    sh """
                        aws s3 cp "${BUILD_PATH}/${APK_VERSIONED}" \
                            "s3://${S3_BUCKET}/${S3_FOLDER}/latest/${APK_VERSIONED}" \
                            --region ${S3_REGION}

                        aws s3 cp "${WORKSPACE}/${LOG_VERSIONED}" \
                            "s3://${S3_BUCKET}/${S3_FOLDER}/latest/${LOG_VERSIONED}" \
                            --region ${S3_REGION}
                    """
                    env.S3_DURATION = ((System.currentTimeMillis() - start)/1000) + " sec"
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    def start = System.currentTimeMillis()
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-access-token',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )]) {
                        sh """
                            export DOCKER_CONFIG="\$WORKSPACE/.jenkins-docker-config"
                            mkdir -p "\$DOCKER_CONFIG"
                            echo '{"auths":{"https://index.docker.io/v1/":{}},"credsStore":""}' > "\$DOCKER_CONFIG/config.json"

                            docker login -u "\$DOCKERHUB_USERNAME" -p "\$DOCKERHUB_TOKEN"

                            cd poker-webapp-server
                            docker build -t \$DOCKER_IMAGE:\$DOCKER_TAG .
                            docker push \$DOCKER_IMAGE:\$DOCKER_TAG
                        """
                    }
                    env.DOCKER_DURATION = ((System.currentTimeMillis() - start)/1000) + " sec"
                }
            }
        }

        stage('Send Final Email via SES') {
            steps {
                script {
                    def recipients = EMAIL_RECIPIENTS.split(',').collect { "\"$it\"" }.join(',')
                    def statusEmoji = currentBuild.currentResult == 'SUCCESS' ? "✅" : "❌"
                    def statusColor = currentBuild.currentResult == 'SUCCESS' ? "#28a745" : "#dc3545"

                    def baseUrl = "https://only-unity-build.s3.ap-south-1.amazonaws.com/${S3_FOLDER}/latest"

                    def bodyHtml = """
                    <div style='font-family:Arial,sans-serif;line-height:1.5;'>
                        <h2 style='color:${statusColor}'>${statusEmoji} Poker Pipeline Build #${BUILD_NUMBER} - ${currentBuild.currentResult}</h2>
                        <table style='border-collapse:collapse;width:100%;border:1px solid #ddd;'>
                            <tr style='background:#f2f2f2;'>
                                <th style='text-align:left;padding:8px;'>Stage</th>
                                <th style='text-align:right;padding:8px;'>Duration</th>
                                <th style='text-align:right;padding:8px;'>Status</th>
                            </tr>
                            <tr><td style='padding:8px;'>Checkout SCM</td><td style='padding:8px;text-align:right;'>${env.CHECKOUT_DURATION}</td><td style='padding:8px;text-align:right;'>${statusEmoji}</td></tr>
                            <tr><td style='padding:8px;'>React Build</td><td style='padding:8px;text-align:right;'>${env.REACT_DURATION}</td><td style='padding:8px;text-align:right;'>${statusEmoji}</td></tr>
                            <tr><td style='padding:8px;'>Copy React Builds</td><td style='padding:8px;text-align:right;'>${env.COPY_DURATION}</td><td style='padding:8px;text-align:right;'>${statusEmoji}</td></tr>
                            <tr><td style='padding:8px;'>Unity Build</td><td style='padding:8px;text-align:right;'>${env.UNITY_DURATION}</td><td style='padding:8px;text-align:right;'>${statusEmoji}</td></tr>
                            <tr><td style='padding:8px;'>Upload to S3</td><td style='padding:8px;text-align:right;'>${env.S3_DURATION}</td><td style='padding:8px;text-align:right;'>${statusEmoji}</td></tr>
                            <tr><td style='padding:8px;'>Docker Build & Push</td><td style='padding:8px;text-align:right;'>${env.DOCKER_DURATION}</td><td style='padding:8px;text-align:right;'>${statusEmoji}</td></tr>
                        </table>
                        <p style='margin-top:15px;'><strong>APK:</strong> <a href='${baseUrl}/${APK_VERSIONED}'>${APK_VERSIONED}</a></p>
                        <p><strong>Unity Log:</strong> <a href='${baseUrl}/${LOG_VERSIONED}'>${LOG_VERSIONED}</a></p>
                        <p><strong>Docker Image:</strong> <code>docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}</code></p>
                    </div>
                    """

                    sh """
                    cat << 'EOF' > /tmp/ses_pipeline_email.json
{
  "Source": "monika@wildace.in",
  "Destination": {
    "ToAddresses": [${recipients}]
  },
  "Message": {
    "Subject": {"Data": "Poker Pipeline Build #${BUILD_NUMBER} - ${currentBuild.currentResult}"},
    "Body": {
      "Html": {"Data": "${bodyHtml.replace('"','\\"').replace("\n","")}"}
    }
  }
}
EOF
                    aws ses send-email --cli-input-json file:///tmp/ses_pipeline_email.json --region ${SES_REGION}
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
