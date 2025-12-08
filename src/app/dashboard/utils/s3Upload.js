// This function will now send the file to the backend server for upload to S3
export const uploadFileToS3 = async (file, customName = null) => {
  const formData = new FormData();
  formData.append('file', file);
  if (customName) {
    formData.append('customName', customName);
  }

  try {
    const response = await fetch('/api/upload', { // Assuming '/api/upload' is the backend endpoint
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'File upload failed');
    }

    const data = await response.json();
    return data.location; // The backend should return the file location
  } catch (error) {
    console.error('Error uploading file to server:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

// This function will now send a request to the backend server to delete a file from S3
export const deleteFileFromS3 = async (fileUrl) => {
  if (!fileUrl) {
    throw new Error('File URL is required.');
  }

  try {
    const response = await fetch('/api/delete', { // Assuming '/api/delete' is the backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'File deletion failed');
    }

    return true;
  } catch (error) {
    console.error('Error deleting file from server:', error);
    throw new Error(`Delete failed: ${error.message}`);
  }
};
