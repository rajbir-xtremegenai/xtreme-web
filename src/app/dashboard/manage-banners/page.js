"use client";
// src/app/manage-banners/page.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { uploadFileToS3, deleteFileFromS3 } from '../utils/s3Upload';

const ManageBannersPage = () => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [empId, setEmpId] = useState(null);

  const [banners, setBanners] = useState([]);
  const [apiError, setApiError] = useState("");
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentBanner, setCurrentBanner] = useState({
    srcPath: '',
    link: '',
    order: '',
    altText: '',
    title: '',
    subtitle: '',
    active: false
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const token = localStorage.getItem('authToken');
    const storedEmpId = localStorage.getItem('empId');
    if (!token || !storedEmpId) {
      router.replace('/login');
    } else {
      setEmpId(storedEmpId);
      setIsCheckingAuth(false);
    }
  }, [router, isClient]);

  const fetchBanners = async () => {
    setApiError("");
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/banners`);
      setBanners(response.data.data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Error fetching banners:", error);
      setApiError("Failed to load banners. Please check your connection and try again.");
      setBanners([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isClient && !isCheckingAuth) {
      fetchBanners();
    }
  }, [isClient, isCheckingAuth]);

  const handleOpenDialog = (mode, banner = null) => {
    setDialogMode(mode);
    setApiError("");
    if (mode === 'edit' && banner) {
      setCurrentBanner({
        id: banner.id,
        srcPath: banner.srcPath || '',
        link: banner.link || '',
        order: banner.order,
        altText: banner.altText || '',
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        active: banner.active || false
      });
    } else {
      setCurrentBanner({
        srcPath: '',
        link: '',
        order: '',
        altText: '',
        title: '',
        subtitle: '',
        active: false
      });
    }
    setBannerImageFile(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentBanner({
      srcPath: '',
      link: '',
      order: '',
      altText: '',
      title: '',
      subtitle: '',
      active: false
    });
    setBannerImageFile(null);
  };

  const handleSaveBanner = async () => {
    const { srcPath, altText, order } = currentBanner;
    if (!altText.trim() || !order.toString().trim() || (dialogMode === 'add' && !srcPath.trim())) {
      setApiError("All fields marked with * are mandatory.");
      return;
    }

    if (dialogMode === 'add' && !bannerImageFile) {
      setApiError("Image is mandatory for a new banner.");
      return;
    }

    setApiError("");
    let finalSrcPath = srcPath;

    if (bannerImageFile) {
      const fileExtension = bannerImageFile.name.split('.').pop();
      const imageName = `banners/${finalSrcPath}-CarsInUSA.${fileExtension}`;
      try {
        const originalBanner = banners.find(b => b.id === currentBanner.id);
        let imageUniquenessCheckNeeded = dialogMode === 'add' || (originalBanner && imageName !== originalBanner.srcPath);

        if (imageUniquenessCheckNeeded) {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/banners/check-image-url`, { srcPath: imageName });
          if (response.data.exists) {
            setApiError("Image name already exists. Please choose a different name.");
            return;
          }
        }
      } catch (error) {
        console.error("Error checking image URL:", error);
        setApiError("Failed to verify image URL. Please try again.");
        return;
      }
    }

    setIsUploading(true);

    if (bannerImageFile && dialogMode === 'edit') {
      const originalBanner = banners.find(b => b.id === currentBanner.id);
      if (originalBanner && originalBanner.srcPath) {
        console.log("Deleting old image from S3:", originalBanner.srcPath);
        try {
          // The delete function in s3Upload expects the Key, which is what srcPath should be
          // await deleteFileFromS3(originalBanner.srcPath);
        } catch (error) {
          console.error("Error deleting old image:", error);
          setApiError("Failed to delete previous image from storage. Continuing with update.");
        }
      }
    }

    if (bannerImageFile) {
      try {
        let imagePath = finalSrcPath;
        if (!imagePath.match(/\.(png|jpg|jpeg|webp)$/)) {
          const fileExtension = bannerImageFile.name.split('.').pop();
          imagePath = `banners/${finalSrcPath}-CarsInUSA.${fileExtension}`;
        }
        // finalSrcPath = await uploadFileToS3(bannerImageFile, imagePath);
      } catch (error) {
        console.error("Error uploading image:", error);
        setApiError(`Failed to upload image: ${error.message}. Please try again.`);
        setIsUploading(false);
        return;
      }
    }
    setIsUploading(false);

    const bannerData = { ...currentBanner, srcPath: finalSrcPath, empId, order: parseInt(order) };
    const token = localStorage.getItem('authToken');

    try {
      if (dialogMode === 'add') {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/banners`, bannerData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/banners/${currentBanner.id}`, bannerData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      handleCloseDialog();
      fetchBanners();
    } catch (error) {
      console.error(`Error ${dialogMode === 'add' ? 'adding' : 'updating'} banner:`, error);
      setApiError(`Failed to ${dialogMode === 'add' ? 'add' : 'update'} banner: ${error.response?.data?.message || error.message}. Please try again.`);
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setApiError("Authentication token not found. Please log in again.");
      return;
    }

    const bannerToDelete = banners.find(b => b.id === bannerId);
    if (!bannerToDelete) {
      setApiError("Banner data not found.");
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      if (bannerToDelete.srcPath) {
        try {
          // await deleteFileFromS3(bannerToDelete.srcPath);
        } catch (s3Error) {
          console.error(`Failed to delete image from S3:`, s3Error);
          setApiError(`Failed to delete image from storage: ${s3Error.message}. Database record not deleted.`);
          setIsLoading(false);
          return;
        }
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/banners/${bannerId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      fetchBanners();
    } catch (error) {
      console.error(`Error during delete banner process for bannerId: ${bannerId}. Error:`, error);
      setApiError(`An unexpected error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient || isCheckingAuth) {
    if (isClient && !localStorage.getItem('authToken')) {
      return <p>Redirecting to login...</p>;
    }
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto p-4 bg-grey text-gray-800">
        <button onClick={() => router.back()} className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-150">
          Back to Home
        </button>
        <h1 className="text-2xl font-bold mb-4">Manage Banners</h1>

        {apiError && !isDialogOpen && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={() => handleOpenDialog('add')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Banner
          </button>
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-semibold mb-4">
                {dialogMode === 'add' ? 'Add Banner' : 'Update Banner'}
              </h2>

              {apiError && <p className="text-red-500 mb-3">{apiError}</p>}

              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Image Name (e.g., my-banner.png)*</label>
                  <input
                    type="text"
                    value={currentBanner.srcPath}
                    onChange={(e) => setCurrentBanner({ ...currentBanner, srcPath: e.target.value })}
                    placeholder="Enter image name"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    disabled={dialogMode === 'edit' && !bannerImageFile}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Upload Image File*</label>
                  <input
                    type="file"
                    onChange={(e) => setBannerImageFile(e.target.files[0])}
                    className="border rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                       file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700
                       hover:file:bg-indigo-200 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Display Order*</label>
                  <input
                    type="number"
                    value={currentBanner.order}
                    onChange={(e) => setCurrentBanner({ ...currentBanner, order: e.target.value })}
                    placeholder="Enter display order"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Image Alt Text*</label>
                  <input
                    type="text"
                    value={currentBanner.altText}
                    onChange={(e) => setCurrentBanner({ ...currentBanner, altText: e.target.value })}
                    placeholder="Image alt text"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
                  <input
                    type="text"
                    value={currentBanner.title}
                    onChange={(e) => setCurrentBanner({ ...currentBanner, title: e.target.value })}
                    placeholder="Enter title"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Subtitle (Optional)</label>
                  <input
                    type="text"
                    value={currentBanner.subtitle}
                    onChange={(e) => setCurrentBanner({ ...currentBanner, subtitle: e.target.value })}
                    placeholder="Enter subtitle"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Link URL (Optional)</label>
                  <input
                    type="url"
                    value={currentBanner.link}
                    onChange={(e) => setCurrentBanner({ ...currentBanner, link: e.target.value })}
                    placeholder="https://example.com"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={currentBanner.active}
                    onChange={(e) => setCurrentBanner({ ...currentBanner, active: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleCloseDialog}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBanner}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-60"
                  disabled={isUploading || isLoading}
                >
                  {isUploading ? 'Uploading...' : (isLoading ? 'Saving...' : 'Save')}
                </button>
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-2">Banners List</h2>
          <div className="space-y-4">
            {Array.isArray(banners) && banners.map((banner) => (
              <div key={banner.id} className="flex flex-col sm:flex-row items-center justify-between border-b p-2">
                <img src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${banner.srcPath}`} alt={banner.altText} className="w-32 h-16 object-cover mr-4" />
                <div className="flex-grow">
                  <span className="font-bold">Order: {banner.order}</span> - <span>{banner.title}</span>
                  <p className="text-gray-500 text-sm">{banner.srcPath}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${banner.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => handleOpenDialog('edit', banner)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded ml-2 text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    disabled={isLoading}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBannersPage;
