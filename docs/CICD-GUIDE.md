
# CI/CD Pipeline Guide for GKE Deployment

This guide provides the steps to set up the CI/CD pipeline using GitHub Actions to deploy the weather application to Google Kubernetes Engine (GKE).

## Prerequisites

*   A Google Cloud Platform (GCP) project.
*   A GitHub repository for your application.
*   `gcloud` CLI installed and configured on your local machine.

## 1. Set up Google Cloud Resources

### a. Create a GKE Cluster

Create a GKE cluster where your application will be deployed.

```sh
export PROJECT_ID="your-gcp-project-id"
export GKE_CLUSTER="your-gke-cluster-name"
export GKE_ZONE="your-gke-cluster-zone"

gcloud container clusters create $GKE_CLUSTER 
  --project $PROJECT_ID 
  --zone $GKE_ZONE 
  --num-nodes "1" 
  --machine-type "e2-small"
```

### b. Create an Artifact Registry Repository

Create an Artifact Registry repository to store your Docker images.

```sh
export ARTIFACT_REGISTRY="your-artifact-registry-name"

gcloud artifacts repositories create $ARTIFACT_REGISTRY 
  --project $PROJECT_ID 
  --repository-format=docker 
  --location=$GKE_ZONE
```

### c. Create a Service Account

Create a service account that GitHub Actions will use to authenticate with Google Cloud.

```sh
export SA_NAME="github-actions-sa"
export SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create $SA_NAME 
  --project $PROJECT_ID 
  --display-name "GitHub Actions Service Account"

# Grant the service account the necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID 
  --member "serviceAccount:$SA_EMAIL" 
  --role "roles/container.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID 
  --member "serviceAccount:$SA_EMAIL" 
  --role "roles/artifactregistry.writer"

# Create and download a JSON key for the service account
gcloud iam service-accounts keys create github-actions-key.json 
  --iam-account $SA_EMAIL
```

## 2. Configure GitHub Secrets

In your GitHub repository, go to `Settings > Secrets and variables > Actions` and add the following secrets:

*   `GCP_PROJECT_ID`: Your Google Cloud project ID.
*   `GCP_SA_KEY`: The content of the `github-actions-key.json` file you downloaded in the previous step. You can copy the content of the file and paste it into the secret.

## 3. Update the GitHub Actions Workflow

Open the `.github/workflows/gke-deploy.yml` file and replace the following placeholder values:

*   `your-gke-cluster-name`: The name of your GKE cluster.
*   `your-gke-cluster-zone`: The zone of your GKE cluster.
*   `your-artifact-registry-name`: The name of your Artifact Registry repository.

## 4. How it Works

When you push a change to the `main` branch, the GitHub Actions workflow will:

1.  **Authenticate** with Google Cloud using the service account.
2.  **Build** the Docker image of your application.
3.  **Tag** the image with the Git SHA and push it to your Artifact Registry repository.
4.  **Update** the `kubernetes-manifests.yaml` file to use the newly pushed image.
5.  **Connect** to your GKE cluster.
6.  **Deploy** the application by applying the updated Kubernetes manifest.
