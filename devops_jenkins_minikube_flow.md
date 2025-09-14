# 🛠 DevOps CI/CD Flow with Jenkins, Docker, Minikube, and Helm

This document provides a full checklist and command reference for setting up a complete CI/CD flow using Jenkins on Minikube, building Docker images using Docker daemon, and deploying via Helm.

---

## ✅ Prerequisites

- OS: Windows with WSL2 (or Linux/macOS natively)
- Install these:
  - Docker Desktop (Kubernetes disabled)
  - [Minikube](https://minikube.sigs.k8s.io/docs/start/)
  - [kubectl](https://kubernetes.io/docs/tasks/tools/)
  - [Helm](https://helm.sh/docs/intro/install/)
  - [Git](https://git-scm.com/)
- DockerHub account

---

## 🧱 Step 1: Start Minikube with Docker Driver

```bash
minikube start --driver=docker
eval $(minikube docker-env)  # optional
```

---

## 🧩 Step 2: Install Jenkins on Minikube

```bash
kubectl create namespace jenkins
kubectl apply -f https://raw.githubusercontent.com/jenkinsci/kubernetes-operator/master/deploy/all-in-one-v1alpha2.yaml -n jenkins
kubectl port-forward svc/jenkins-service -n jenkins 8080:8080
```

Access Jenkins: [http://localhost:8080](http://localhost:8080)

---

## 🔑 Step 3: Get Jenkins Admin Password

```bash
kubectl get secret jenkins-operator-credentials -n jenkins -o jsonpath="{.data.user}" | base64 --decode
kubectl get secret jenkins-operator-credentials -n jenkins -o jsonpath="{.data.password}" | base64 --decode
```

---

## 🧩 Step 4: Configure Jenkins UI

Install Plugins:

- Kubernetes
- Docker Pipeline
- GitHub Integration
- GitHub Branch Source
- Blue Ocean (optional)
- Pipeline

Configure Kubernetes Cloud:

- Name: `Kubernetes`
- Kubernetes URL: `https://kubernetes.default`
- Jenkins URL: `http://jenkins.jenkins.svc.cluster.local:8080`
- Namespace: `jenkins`

---

## ⚙️ Step 5: Create Docker-based Jenkins Agent

**Dockerfile:**

```Dockerfile
FROM jenkins/inbound-agent
USER root
RUN apt update && apt install -y docker.io kubectl helm
USER jenkins
```

```bash
docker build -t singhsajal/devops-agent:latest .
docker push singhsajal/devops-agent:latest
```

In Jenkins UI (K8s cloud template):

- Name: `docker-agent`
- Labels: `docker`
- Container Image: `singhsajal/devops-agent:latest`
- Working Directory: `/home/jenkins/agent`

---------- docker agent yaml file -------------

apiVersion: v1
kind: Pod
metadata:
name: docker-agent
labels:
jenkins: agent
spec:
containers: - name: docker
image: docker:dind
securityContext:
privileged: true
volumeMounts: - name: docker-graph-storage
mountPath: /var/lib/docker - name: jenkins-agent
image: jenkins/inbound-agent:latest
env: - name: JENKINS_URL
value: http://jenkins.jenkins.svc.cluster.local:8080 - name: JENKINS_SECRET
valueFrom:
secretKeyRef:
name: jenkins-agent-secret
key: jenkins-agent-token - name: JENKINS_AGENT_NAME
value: docker-agent
volumes: - name: docker-graph-storage
emptyDir: {}
restartPolicy: Never

---

-------------- raw yaml file for deploy agent ---------------------

apiVersion: v1
kind: Pod
metadata:
name: deploy-agent
labels:
jenkins: agent
spec:
containers: - name: kubectl-helm
image: lachlanevenson/k8s-helm:latest
command: - cat
tty: true
volumeMounts: - name: kube-config
mountPath: /root/.kube
volumes: - name: kube-config
configMap:
name: kubeconfig
restartPolicy: Never

---

## 🐙 Step 6: Create Jenkins Pipeline Job

**Jenkinsfile:**

```groovy
pipeline {
  agent { label 'docker' }
  environment {
    DOCKER_IMAGE = "singhsajal/ecommerce-frontend:${env.BUILD_NUMBER}"
    DOCKER_CREDENTIALS_ID = "dockerhub-creds"
  }
  stages {
    stage('Checkout') {
      steps {
        git branch: 'staging', url: 'https://github.com/singhsajal/ecommerce-frontend.git'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }
    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }
    stage('Deploy to K8s') {
      steps {
        sh '''
          helm upgrade --install frontend-release ./chart/frontend           -f envs/staging/frontend-values.yaml           --set image.repository=singhsajal/ecommerce-frontend           --set image.tag=${BUILD_NUMBER}           --namespace staging --create-namespace
        '''
      }
    }
  }
}
```

---

## 🛠 Step 7: Helm Chart Structure

```
k8s/
├── chart/
│   └── frontend/
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── values-staging.yaml
│       └── templates/
│           ├── deployment.yaml
│           ├── service.yaml
│           └── ingress.yaml
├── envs/
│   └── staging/
│       └── frontend-values.yaml
```

---

## 🧪 Step 8: Test Docker Image Locally

```bash
docker run -p 3000:3000 singhsajal/ecommerce-frontend:latest
```

Access: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Step 9: Access App on Minikube

```bash
minikube service frontend-release-frontend -n staging
# or
kubectl port-forward svc/frontend-release-frontend -n staging 8888:80
```

Access: [http://localhost:8888](http://localhost:8888)

---

## 🧹 Step 10: Cleanup

```bash
helm uninstall frontend-release -n staging
kubectl delete ns staging
kubectl delete ns jenkins
minikube delete
```
