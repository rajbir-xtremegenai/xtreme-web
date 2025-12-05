import React from 'react';

// Helper function to format dates in "Month Day, Year" format.
const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const ArticleMeta = ({ author, createdAt, updatedAt }) => {
  const publishedDate = formatDate(createdAt);
  const updatedDate = formatDate(updatedAt);

  // Determine which dates to show. If updated date is same as published, only show published.
  // This logic assumes you might want to hide "Updated" if it's on the same day.
  // For simplicity, we'll show both if they exist and are different.
  const showUpdated = publishedDate && updatedDate && publishedDate !== updatedDate;

  return (
    <div className="mb-4 text-sm text-gray-600 border-b pb-4">
      {author && (
        <p className="font-semibold text-gray-800">
          By {author}
        </p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        {publishedDate && (
          <p>
            Published: {publishedDate}
          </p>
        )}
        {showUpdated && (
          <>
            {/* Hide separator on mobile, show on sm and above */}
            <span className="hidden sm:inline text-gray-400">|</span>
            <p>
              Last Updated: {updatedDate}
            </p>
          </>
        )}
      </div>

    </div>
  );
};

export default ArticleMeta;