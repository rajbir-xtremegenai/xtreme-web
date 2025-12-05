import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import BlogCard from './BlogCard';
import Image from 'next/image';

const Blogs = ({ blogs }) => {
  // Ensure blogs is an array to prevent errors
  const validBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Latest Blog Posts</h3>
        <Link href="/blogs">
          <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            View All
            <Image
              src="/ic_upper_arrow.svg"
              alt="View All"
              width={16}
              height={16}
              className="h-auto ml-2 h-4 w-4" />
          </div>
        </Link>
      </div>
      <div className="flex flex-wrap justify-left gap-6 ">
        {validBlogs.map((blog) => (
          <BlogCard key={blog.title} blog={blog} />
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
};

export default Blogs;