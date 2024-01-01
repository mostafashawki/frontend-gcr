# Web Application Deployment on Google Cloud Run

## Overview

This document provides step-by-step instructions on deploying your web application on Google Cloud Run using Continuous Integration and Continuous Deployment (CI/CD) with GitHub and Google Cloud Build.

### Prerequisites

Make sure you have the following prerequisites before proceeding:

- A GitHub repository containing your web application code.
- A Dockerfile for building your application as a container.
- A cloudbuild.yaml file for setting up CI/CD in the root of your project.

## Deployment Steps

### 1. Push to GitHub

Ensure that your project is pushed to GitHub, and your repository includes the Dockerfile and cloudbuild.yaml files.

### 2. Create Cloud Build Trigger

1. Go to [Google Cloud Console - Cloud Build](https://console.cloud.google.com/cloud-build).
2. Click on "Triggers" in the left navigation.
3. Click "Connect Repository" and link your GitHub repository.
4. Create a new trigger with the desired settings (e.g., branch or tag filter).

### 3. Enable Cloud Run Admin

1. Visit [Google Cloud Console - Cloud Build Settings](https://console.cloud.google.com/cloud-build/settings/).
2. Search for "Cloud Run" and enable "Cloud Run Admin."

### 4. Create a Cloud Run Service

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. In the navigation menu, select "Cloud Run."
3. Click "Create Service" to create a new service.
4. Configure the service with the required settings, including the container image URL.

### 5. Update cloudbuild.yaml

Update your cloudbuild.yaml file to include the CI/CD pipeline. Replace placeholders with your specific information:

```yaml
steps:
# Build the container image
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'gcr.io/$PROJECT_ID/[SERVICE-NAME]:$COMMIT_SHA', '.']

# Push the container image to Container Registry
- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'gcr.io/$PROJECT_ID/[SERVICE-NAME]:$COMMIT_SHA']

# Deploy container image to Cloud Run
- name: 'gcr.io/cloud-builders/gcloud'
  args:
  - 'run'
  - 'deploy'
  - '[SERVICE-NAME]'
  - '--image'
  - 'gcr.io/$PROJECT_ID/[SERVICE-NAME]:$COMMIT_SHA'
  - '--region'
  - '[REGION]'
images:
- 'gcr.io/$PROJECT_ID/[SERVICE-NAME]:$COMMIT_SHA'
```

Replace:
- `[SERVICE-NAME]` with the name of the Cloud Run service.
- `[REGION]` with the region of the Cloud Run service you are deploying.

### 6. Commit and Push Changes

Commit the changes to your cloudbuild.yaml file and push them to your GitHub repository. This action triggers the Cloud Build pipeline.

### 7. Monitor CI/CD Pipeline

Go back to the [Google Cloud Console - Cloud Build](https://console.cloud.google.com/cloud-build) to monitor the progress of your CI/CD pipeline.

Upon successful completion, your web application will be deployed to Google Cloud Run automatically.

Congratulations! You have successfully set up CI/CD for your web application on Google Cloud Run.