# Weather App

This repository contains a simple weather application, along with the infrastructure and configuration to deploy it to Google Kubernetes Engine (GKE).

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Google Cloud SDK:** [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
*   **Terraform:** [Install Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
*   **Docker:** [Install Docker](https://docs.docker.com/get-docker/)
*   **kubectl:** [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Repository Structure

The repository is organized into the following directories:

```
weather-app-demo/
├── app/
├── docs/
├── infrastructure/
│   ├── terraform/
│   └── kubernetes/
├── .github/
│   └── workflows/
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

- **app/**: Contains the source code for the weather application (HTML, CSS, and JavaScript).
- **docs/**: Contains documentation files, including architecture diagrams, modernization plans, and CI/CD guides.
- **infrastructure/**: Contains the infrastructure-as-code for the project.
    - **terraform/**: Contains Terraform files for provisioning Google Cloud resources.
    - **kubernetes/**: Contains Kubernetes manifest files for deploying the application.
- **.github/workflows/**: Contains the CI/CD pipeline configuration for deploying the application to GKE.
- **Dockerfile**: Defines the Docker image for the application.
- **.dockerignore**: Specifies files to be excluded from the Docker build.
- **.gitignore**: Specifies files to be ignored by Git.
- **README.md**: This file.

## Deployment

The application is deployed to GKE using a GitHub Actions workflow. The workflow is defined in `.github/workflows/gke-deploy.yml`.

The workflow is triggered on push to the `main` branch and performs the following steps:
1.  Builds a Docker image of the application.
2.  Pushes the Docker image to Google Artifact Registry.
3.  Updates the Kubernetes manifest with the new image tag.
4.  Deploys the application to the GKE cluster.

Before running the workflow, you will need to configure the following secrets in your GitHub repository:
- `GCP_PROJECT_ID`: Your Google Cloud project ID.
- `GCP_SA_KEY`: A service account key with permissions to push to Artifact Registry and deploy to GKE.

You will also need to update the following variables in the `.github/workflows/gke-deploy.yml` file:
- `GKE_CLUSTER`: The name of your GKE cluster.
- `GKE_ZONE`: The zone of your GKE cluster.
- `ARTIFACT_REGISTRY`: The name of your Artifact Registry.

## Clean Up Resources

To avoid incurring future charges, you can destroy the created resources:

```sh
# From the infrastructure/terraform directory
terraform destroy -var="project_id=$PROJECT_ID"
```

This command will remove all the resources created by Terraform.
