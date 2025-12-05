// path of this firl
// src/utils/s3Upload.js
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from 'uuid';

// Configure AWS SDK v3
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

const cloudFrontClient = new CloudFrontClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFileToS3 = async (file, customName = null) => {
  let fileName;
  const fileExtension = file.name.split('.').pop();
  if (!fileExtension) {
    console.error('Error: File does not have a valid extension.');
    throw new Error('File must have a valid extension.');
  }
  
  // if fileName already contains png,jpg,jpeg,webp then don't add fileExtension to fileName
  if (customName && customName.match(/\.(png|jpg|jpeg|webp)$/)) {
    fileName = customName;
  } else if (customName && !customName.match(/\.(png|jpg|jpeg|webp)$/)) {
    // if customName is provided but does not have an extension, append the file extension
    fileName = `${customName}.${fileExtension}`;
  } else if (!customName && file.name.match(/\.(png|jpg|jpeg|webp)$/)) {
    // if no customName is provided and file name already has an extension, use the file name as is
    fileName = file.name;
  } else if (!customName && !file.name.match(/\.(png|jpg|jpeg|webp)$/)) {
    // if no customName is provided and file name does not have an extension, use a UUID with the file extension
    fileName = `${uuidv4()}.${fileExtension}`;
  } else  {
    // if customName is provided and does not have an extension, append the file extension
    fileName = `${customName}.${fileExtension}`;
  }

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: fileName, // File name to save as in S3
    Body: file,
    ContentType: file.type,
  };

  try {
    const upload = new Upload({
      client: s3Client,
      params: params,
    });

    const data = await upload.done();

    if (customName) {
      return fileName;
    } else {
      return data.Location; // Returns the URL of the uploaded file
    }
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

// Function to delete a file from S3
export const deleteFileFromS3 = async (fileUrl) => {
  if (!fileUrl) {
    throw new Error('File URL is required.');
  }

  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: fileUrl,
  };

  try {
    // 1. Delete from S3
    await s3Client.send(new DeleteObjectCommand(params));
    console.log(`File deleted successfully from S3: ${fileUrl}`);

    // 2. Invalidate CloudFront cache
    const invalidationParams = {
      DistributionId: process.env.NEXT_PUBLIC_CLOUDFRONT_DIST_ID, // <-- Add in .env
      InvalidationBatch: {
        Paths: {
          Quantity: 1,
          Items: [`/${fileUrl}`], // must start with "/"
        },
        CallerReference: `delete-${fileUrl}-${Date.now()}`,
      },
    };

    await cloudFrontClient.send(new CreateInvalidationCommand(invalidationParams));
    console.log(`CloudFront cache invalidated for: /${fileUrl}`);

    return true;
  } catch (error) {
    console.error(`Error deleting file or invalidating cache (key: ${fileUrl}):`, error);
    throw new Error(`Delete failed: ${error.message}`);
  }
};