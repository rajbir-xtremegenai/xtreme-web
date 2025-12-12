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
      className="group block bg-black/20 border border-white/20 rounded-lg overflow-hidden shadow-[inset_0_-60px_60px_-10px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_-60px_60px_-10px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:border-white/30 transition-all duration-300 ease-in-out w-full backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row"> {/* Switch to column on mobile, row on md+ */}
        {/* Image Section */}
        <div className="relative w-full md:w-3/12 h-auto aspect-square m-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${imageUrl}`}
            alt={altText || title}
            fill={true}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="rounded-lg border border-white/20 object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            priority={priority}
          />
        </div>
        {/* Text Content Section */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-between"> {/* Full width on mobile, 2/3 on md+, more padding on desktop */}
          <div>
            <h1 className="text-2xl md:text-3xl text-white mb-3 group-hover:text-[var(--color-clr1)] transition-colors duration-300"> {/* Larger title on desktop */}
              {title}
            </h1>
            <div className="flex items-center text-sm text-white/70 mb-4"> {/* Larger text on desktop */}
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
            <p className="text-white/80 leading-relaxed"> {/* Larger description on desktop */}
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewBlogCard;