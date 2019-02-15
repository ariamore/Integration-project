# Integration project
This is a basic integration project. The main scope is to experiment and learn about container-based apps and containerization.

The main tools used are:
- [Docker](https://hub.docker.com/)
- [ExpressJS](https://expressjs.com/)
- [Helm](https://docs.helm.sh/)
- [Kubernetes](https://kubernetes.io/docs/)
- [MongoDB](https://docs.mongodb.com/)
- [NodeJS](https://nodejs.org/en/docs/)

Steps to run it inside Kubernetes:
- Install [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
- Start the minikube with:
    - Windows 10 with Hyper-V: [link](https://medium.com/@JockDaRock/minikube-on-windows-10-with-hyper-v-6ef0f4dc158c) `minikube start --vm-driver=hyperv --hyperv-virtual-switch="minikube-switch"`
    - Other: `minikube start`
- Install [Helm](https://docs.helm.sh/using_helm/#quickstart)
- Deploy using Helm:
    - `helm install --name db -f ./production/mongo-values.yaml stable/mongodb`
    - `helm install --name app ./production/app-chart/`
- Access the app with: `minikube service app`
- Access the dashboard with: `minikube dashboard`

Steps to update the image stored in DockerHub:
- Transpile the code with Babel: `npm run build`
- Build and tag the image locally: `docker build -f ./production/Dockerfile -t memignone/basic-node-app:latest .`
- Push it to Docker Hub: `docker push memignone/basic-node-app:latest`
