# Backend Implementation Guide: Handling File Uploads to S3

## Introduction

The frontend has been updated to no longer upload files directly to AWS S3. Instead, it will send files to the Node.js backend, which is now responsible for handling the upload to S3 and deletion from S3. This document outlines the required API endpoints and logic that need to be implemented on the backend.

## 1. File Upload Endpoint

This endpoint will receive a file from the frontend and upload it to S3.

- **Endpoint:** `/api/upload`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`

### Request Body

The request will be a `multipart/form-data` request with the following fields:

- `file`: The file to be uploaded.
- `customName` (optional): A custom name for the file.

### Backend Logic

1.  **Receive the file:** Use a library like `multer` to handle `multipart/form-data` requests and process the file upload.
2.  **S3 Upload:**
    - Use the AWS SDK for Node.js (`@aws-sdk/client-s3` and `@aws-sdk/lib-storage`) to upload the file to your S3 bucket.
    - The S3 client should be configured with the necessary AWS credentials and region.
    - The file naming logic from the original frontend `s3Upload.js` should be replicated here.
3.  **Return the URL:** After a successful upload, the backend should return the public URL of the uploaded file.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "location": "https://your-s3-bucket.s3.amazonaws.com/your-file-name.jpg"
  }
  ```

### Error Response

- **Status Code:** `4xx` or `5xx`
- **Body:**
  ```json
  {
    "message": "File upload failed: <error message>"
  }
  ```

## 2. File Deletion Endpoint

This endpoint will delete a file from S3 and invalidate the CloudFront cache.

- **Endpoint:** `/api/delete`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Request Body

- **Body:**
  ```json
  {
    "fileUrl": "your-file-name.jpg"
  }
  ```

### Backend Logic

1.  **Receive the file URL:** Parse the JSON request body to get the `fileUrl`.
2.  **S3 Deletion:**
    - Use the AWS SDK (`@aws-sdk/client-s3`) to delete the object from the S3 bucket.
3.  **CloudFront Invalidation:**
    - Use the AWS SDK (`@aws-sdk/client-cloudfront`) to create an invalidation for the deleted file's path in your CloudFront distribution.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "File deleted successfully"
  }
  ```

### Error Response

- **Status Code:** `4xx` or `5xx`
- **Body:**
  ```json
  {
    "message": "File deletion failed: <error message>"
  }
  ```

## 3. Environment Variables

The backend server will require the following environment variables to be set:

- `AWS_REGION`: The AWS region for your S3 bucket and CloudFront distribution.
- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `S3_BUCKET_NAME`: The name of your S3 bucket.
- `CLOUDFRONT_DIST_ID`: The ID of your CloudFront distribution.

This guide should provide all the necessary information for the backend team to implement the required changes.

## 4. Security Considerations

To ensure the security of the file upload process, the backend must implement the following checks:

-   **Authentication and Authorization:**
    -   The `/api/upload` and `/api/delete` endpoints must be protected. Only authenticated and authorized users should be allowed to upload or delete files.
    -   Implement session-based authentication, token-based authentication (e.g., JWT), or another appropriate mechanism to verify the user's identity.

-   **File Type Validation:**
    -   Do not trust the `Content-Type` header sent by the client, as it can be easily spoofed.
    -   On the server, validate the file type by inspecting its content (e.g., using magic numbers). Use libraries like `file-type` for this purpose.
    -   Maintain a strict allowlist of permitted file types (e.g., `image/jpeg`, `image/png`). Reject any files that do not match.

-   **File Size Limits:**
    -   Implement a reasonable file size limit to prevent denial-of-service (DoS) attacks where an attacker uploads very large files to exhaust server resources.
    -   Configure this limit in your server and in the `multer` setup.

-   **Filename Sanitization:**
    -   Do not use the user-provided filename directly. An attacker could provide a malicious filename (e.g., `../../etc/passwd`).
    -   The current logic of generating a unique filename (e.g., using UUID) is a good practice. If you need to preserve the original filename, sanitize it thoroughly by removing any special characters or path traversal sequences.
