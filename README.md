# NodeJS project setup
This is a basic NodeJS integration project.

The main tools used are:
- [Docker](https://hub.docker.com/)
- [ExpressJS](https://expressjs.com/)
- [Kubernetes](https://kubernetes.io/docs/)
- [MongoDB](https://docs.mongodb.com/)
- [NodeJS](https://nodejs.org/en/docs/)

Steps to run it inside Kubernetes:
- Install [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
- Start the minikube with:
    - Windows 10 with Hyper-V: [link](https://medium.com/@JockDaRock/minikube-on-windows-10-with-hyper-v-6ef0f4dc158c) `minikube start --vm-driver=hyperv --hyperv-virtual-switch="minikube-switch"`
    - Other: `minikube start`
- Deploy:
    - `kubectl create -f ./production/db-volume.yaml`
    - `kubectl create -f ./production/mongo-controller.yaml`
    - `kubectl create -f ./production/mongo-service.yaml`
    - `kubectl create -f ./production/app-controller.yaml`
    - `kubectl create -f ./production/app-service.yaml`
- Access the app with: `minikube service app`
- Access the dashboard with: `minikube dashboard`

Steps to update the image stored in DockerHub:
- Build and tag the image locally: `docker build -f ./production/Dockerfile -t memignone/basic-node-app:latest .`
- Push it to Docker Hub: `docker push memignone/basic-node-app:latest`