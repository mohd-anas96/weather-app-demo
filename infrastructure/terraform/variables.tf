
variable "project_id" {
  description = "The Google Cloud project ID."
  type        = string
}

variable "region" {
  description = "The Google Cloud region to deploy the resources in."
  type        = string
  default     = "us-central1"
}
