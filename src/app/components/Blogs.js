import React from 'react'
import Link from 'next/link'

function Blogs({ blogs = [] }) {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  // Limit to only 3 blogs
  const visibleBlogs = blogs.slice(0, 3);

  const imageBaseUrl = process.env.NEXT_PUBLIC_Image_BASE_URL || '';

  // Format date as "Oct 26, 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Calculate reading time (default 5 min, or estimate based on title length)
  const getReadingTime = (title) => {
    // Simple estimation: assume ~200 words per minute, estimate words from title
    // For now, default to 5 min as shown in reference
    return '3 min read';
  };

  return (
    <section className="mx-auto mt-4 w-11/12 max-w-6xl rounded-2xl px-5 py-10 text-white lg:w-full">
      {/* Header Pill */}
      <div className="flex justify-center mb-8">
        <h2 className="text-center py-1.5 px-5 bg-[rgba(174,0,255,0.17)] text-[rgb(110,99,255)] text-sm font-normal uppercase rounded-full mx-auto mb-1.5 mt-5 block w-max">
          Blogs
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleBlogs.map((blog) => (
          <div
            key={blog.id}
            className="group relative rounded-2xl p-[2px] transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(51, 0, 255, 0.8), rgba(173, 74, 234, 0.8))',
              boxShadow: '0 0 25px rgba(51, 0, 255, 0.5), 0 0 50px rgba(173, 74, 234, 0.3)'
            }}
          >
            <Link
              href={`/blogs/${blog.slug}`}
              className="flex flex-col h-full bg-[#0a0520] rounded-2xl overflow-hidden"
            >
              {/* Top Section - Image with overlay effects */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={`${imageBaseUrl}/${blog.imageUrl}`}
                  alt={blog.altText || blog.title}
                  className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-110"
                />
                {/* Futuristic overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-purple-900/50" />
              </div>

              {/* Bottom Section - Text Content */}
              <div className="relative bg-[#0f0a2a] p-5 flex flex-col flex-1">
                {/* Title - Left aligned, truncates after 2 lines with ... */}
                <h4 className="text-2xl font-bold text-white text-left mb-2 line-clamp-2 leading-tight overflow-hidden">
                  {blog.title}
                </h4>

                {/* Bottom Row - Metadata and Button aligned */}
                <div className="flex items-center justify-between gap-4">
                  {/* Metadata - Date and Reading Time */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 text-sm text-white/80 font-normal">
                    <span>{formatDate(blog.updatedAt)}</span>
                    <span className="hidden sm:inline m-1"> | </span>
                    <span className="sm:ml-0">{getReadingTime(blog.title)}</span>
                  </div>

                  {/* Read More Button - Bottom Right */}
                  <span
                    className="px-6 py-2.5 text-white font-bold text-sm rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(173,74,234,0.6)] inline-block cursor-pointer flex-shrink-0"
                    style={{
                      background: 'linear-gradient(90deg, #ad4aea 0%, #ff00ff 100%)',
                      boxShadow: '0 4px 15px rgba(173, 74, 234, 0.4)'
                    }}
                  >
                    Read More
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Blogs
