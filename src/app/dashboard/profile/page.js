"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteFileFromS3, uploadFileToS3 } from '../utils/s3Upload';

const ProfilePage = () => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);
  const [authorBio, setAuthorBio] = useState('');
  const [authorProfession, setAuthorProfession] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/dashboard/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router, isClient]);

  useEffect(() => {
    if (isClient && !isCheckingAuth) { // Ensure client-side and auth check complete
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          const data = JSON.parse(storedUserData);
          setProfileData(data);
          setAuthorBio(data.author_bio || '');
          setAuthorProfession(data.author_profession || '');
        } catch (error) {
          console.error("Failed to parse user data from local storage:", error);
          // Optionally set an error state here
        }
      }
    }
  }, [isClient, isCheckingAuth]);

  const handleUpdateProfile = async () => {
    setApiError('');
    setIsSaving(true);

    try {
      let photoUrl = profileData.photo_url;

      if (newImageFile) {
        if (profileData.photo_url) {
          try {
            await deleteFileFromS3(profileData.photo_url);
          } catch (error) {
            console.error("Failed to delete old image from S3, continuing with upload...", error);
          }
        }
        const imageName = `profile/${profileData.empId}-${Date.now()}`;
        photoUrl = await uploadFileToS3(newImageFile, imageName);
      }

      const updatedProfileData = {
        ...profileData,
        photo_url: photoUrl,
        author_bio: authorBio,
        author_profession: authorProfession,
      };

      // TODO: Replace with actual API call
      console.log("Making API call to update profile with data:", updatedProfileData);
      // const response = await fetch('/api/update-employee', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedProfileData),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.message || 'Failed to update profile');
      // }

      setProfileData(updatedProfileData);
      localStorage.setItem('userData', JSON.stringify(updatedProfileData));
      setIsModalOpen(false);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isClient || isCheckingAuth) {
    if (isClient && !localStorage.getItem('authToken')) {
      return <p>Redirecting to login...</p>;
    }
    return <p>Loading...</p>;
  }

  if (!profileData) {
    // This assumes auth check is done and we are just waiting for profile data to be set.
    // Or if userData was missing/corrupted in localStorage.
    return <p>Loading profile data...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mt-20 mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Profile Information
          </h1>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-gray-600">Employee ID:</p>
              <p className="text-lg text-gray-800">{profileData?.empId}</p>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="text-sm font-semibold text-gray-600">Employee Name:</p>
              <p className="text-lg text-gray-800">{profileData?.name}</p>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="text-sm font-semibold text-gray-600">Employee Email ID:</p>
              <p className="text-lg text-gray-800">{profileData?.email}</p>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="text-sm font-semibold text-gray-600">Employee Phone Number:</p>
              <p className="text-lg text-gray-800">{profileData?.mobile_number}</p>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="text-sm font-semibold text-gray-600">Employee Bio:</p>
              <p className="text-lg text-gray-800">{profileData?.author_bio}</p>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="text-sm font-semibold text-gray-600">Employee Profession:</p>
              <p className="text-lg text-gray-800">{profileData?.author_profession}</p>
            </div>
            {profileData?.photo_url && (
              <>
                <hr className="border-gray-200" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Photo:</p>
                  <img src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${profileData.photo_url}`} alt="Employee Photo" className="mt-2 rounded-lg max-w-xs h-auto" />
                </div>
              </>
            )}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 text-gray-700">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImageFile(e.target.files[0])}
                  className="mt-1 block w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Bio</label>
                <textarea
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="e.g., A short bio about yourself"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Profession</label>
                <input
                  type="text"
                  value={authorProfession}
                  onChange={(e) => setAuthorProfession(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
              <button onClick={handleUpdateProfile} className="bg-green-500 text-white py-2 px-4 rounded-lg" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
            {apiError && <p className="text-red-500 bg-red-100 mt-4 p-3 rounded mb-4">{apiError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
