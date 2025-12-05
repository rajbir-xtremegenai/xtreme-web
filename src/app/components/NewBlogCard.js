'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { event } from '../lib/gtag';

const NewBlogCard = ({ blog, priority = false }) => {
  const { title, author, imageUrl, slug, description, altText, updatedAt } = blog;
  const link = `/blogs/${slug}`;

  // const handleNewBlogCardClick = () => {
  //   event({
  //     action: 'new_blog_card_clicked',
  //     params: {
  //       blog_title: title,
  //     },
  //   });
  // };

  return (
    <Link
      href={link}
      // onClick={handleNewBlogCardClick}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-full"
    >
      <div className="flex flex-col md:flex-row"> {/* Switch to column on mobile, row on md+ */}
        {/* Image Section */}
        <div className="relative w-full md:w-3/12 h-auto aspect-square m-2">
          {/* <Image
            src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${imageUrl}`}
            alt={altText || title}
            fill={true}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="rounded-lg border border-gray-200 object-cover"
            priority={priority}
          /> */}
        </div>
        {/* Text Content Section */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-between"> {/* Full width on mobile, 2/3 on md+, more padding on desktop */}
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300"> {/* Larger title on desktop */}
              {title}
            </h1>
            <div className="flex items-center text-sm  text-gray-600 mb-4"> {/* Larger text on desktop */}
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
            <p className="text-gray-700 leading-relaxed"> {/* Larger description on desktop */}
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewBlogCard;