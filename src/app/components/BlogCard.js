// src/components/BlogCard.js
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { event } from '../lib/gtag';

const BlogCard = ({ blog }) => {
  const { title, author, imageUrl, slug, altText, updatedAt } = blog;
  const link = `/blogs/${slug}`;

  const handleBlogCardClick = () => {
    event({
      action: 'blog_card_clicked',
      params: {
        blog_title: title,
      },
    });
  };

  return (
    <Link
      href={link}
      onClick={handleBlogCardClick}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-full max-w-sm"
    >
      <div className="relative w-full h-56"> {/* Increased height for better image display */}
        <Image
          src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${imageUrl}`}
          alt={altText || title}
          fill={true}
          sizes="(max-width: 384px) 100vw, 384px"
          className="rounded-t-lg object-cover" // Apply border radius to the top of the image
        />
        {/* Optional: Sound/Category Tag like in the image */}
        {/* <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">Sound</span> */}
      </div>
      <div className="p-5">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>
            {new Date(updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default BlogCard;
