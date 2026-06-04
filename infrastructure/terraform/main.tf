
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.39.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 3.6.2"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "random_pet" "default" {
  length = 2
}

resource "google_cloud_run_v2_service" "default" {
  name     = "weather-app-${random_pet.default.id}"
  location = var.region

  template {
    containers {
      image = "gcr.io/${var.project_id}/weather-app:latest"
    }
  }

  traffic {
    type    = "TRAFFIC_TYPE_LATEST"
    percent = 100
  }
