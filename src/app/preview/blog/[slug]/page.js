// src/app/preview/blog/[slug]/page.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArticleMeta from '../../../components/ArticleMeta';

const imageBaseUrl = process.env.NEXT_PUBLIC_Image_BASE_URL;


// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = await params; // Await params before destructuring
  const blogPost = await getBlogData(slug);

  if (!blogPost.success) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const { blog } = blogPost.data;
  const seoTitle = blog.seoTitle;
  const seoDescription = blog.seoDescription || `Read the latest blog post about ${blog.seoTitle}.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: blog.seoKeywords ? blog.seoKeywords.split(', ') : [],
    author: [{ name: blog.author || 'Content Team' }],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`,
      type: 'article',
      images: [
        {
          url: blog.imageUrl,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [blog.imageUrl],
    },
  };
}

// Fetch data for a specific blog post
async function getBlogData(slug) {
  console.log(`Fetching blog preview data for slug: ${slug}`);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/preview/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      // Log the response body for more context on the error
      const errorBody = await res.text();
      console.error(`Error response body: ${errorBody}`);
      throw new Error(`Failed to fetch blog data: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching blog data:', error.message);
    return { success: false, message: error.message };
  }
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blogPost = await getBlogData(slug);

  if (!blogPost.success) {
    return (
      <div className="container bg-white mx-auto px-8 sm:px-12 lg:px-16 py-8">
        <h1 className="text-2xl font-bold text-red-600">Blog Post Not Found</h1>
        <p className="text-gray-700">{blogPost.message}</p>
      </div>
    );
  }

  const { blog, blogData, faq } = blogPost.data;
  const blogImageUrl = `${imageBaseUrl}/${blog.imageUrl}`;
  let isFirstImage = true;
  let hasTitle = false; // track title rendering

  const highlights = blogData
    .filter((element) => element.elementType === 'sub-title')
    .map((element) => element.elementValue);

  return (
    <div className="relative min-h-screen bg-[var(--color-bg-dark)] text-white">
      <div className='mt-8'>
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
        >
          <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-[var(--color-clr1)] blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-[var(--color-clr2)] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-16">
          <article className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 p-6 sm:p-10">
            <nav aria-label="Breadcrumb" className="mb-6 mt-2">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 text-gray-300">
                <div>
                  <span className="text-gray-400">
                    <Link href="/" className="hover:underline text-[var(--color-clr1)] hover:text-white transition-colors">Home</Link> /{' '}
                    <Link href="/blogs" className="hover:underline text-[var(--color-clr1)] hover:text-white transition-colors">Blogs</Link> /{' '}
                    <span className="text-gray-200">{blog.seoTitle}</span>
                  </span>
                </div>
              </div>
            </nav>

            {highlights.length > 0 && (
              <section className="mt-4 mb-8 bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <h2 className="text-2xl font-bold text-white mb-3">Highlights</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="text-lg leading-relaxed">{highlight}</li>
                  ))}
                </ul>
              </section>
            )}

            <figure className="my-8 flex flex-col justify-center items-center">
              <Image
                src={blogImageUrl}
                alt={blog.seoTitle}
                width={1200}
                height={675}
                className="rounded-2xl shadow-xl shadow-black/40 ring-1 ring-white/10"
                priority
                fetchPriority="high"
              />
              <figcaption className="text-sm text-gray-400 mt-3 text-center max-w-3xl">
                {blog.seoDescription}
              </figcaption>
            </figure>

            <div className="prose prose-invert lg:prose-xl max-w-none leading-relaxed">
              {blogData.map((element) => {
                switch (element.elementType) {
                  case 'title':
                    if (hasTitle) return null; // skip extra titles
                    hasTitle = true;
                    return (
                      <div key={element.id} className="mb-4">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{element.elementValue}</h1>
                        <ArticleMeta
                          author={blog.author}
                          createdAt={blog.createdAt}
                          updatedAt={blog.updatedAt}
                        />
                      </div>
                    );
                  case 'sub-title':
                    return (
                      <h2 key={element.id} className="text-2xl font-semibold mb-3 text-white">
                        {element.elementValue}
                      </h2>
                    );
                  case 'paragraph':
                    return (
                      <p
                        key={element.id}
                        className="mb-4 text-gray-200 whitespace-pre-line"
                      >
                        {element.elementValue}
                      </p>
                    );
                  case 'link':
                    return (
                      <p key={element.id} className="mb-4">
                        <a
                          href={element.elementValue}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-clr1)] hover:text-white hover:underline transition-colors"
                        >
                          {element.altText}
                        </a>
                      </p>
                    );
                  case 'imageUrl':
                    const priority = isFirstImage;
                    if (isFirstImage) {
                      isFirstImage = false;
                    }
                    return (
                      <div key={element.id} className="my-6 w-full lg:w-[70%] mx-auto">
                        <Image
                          src={`${imageBaseUrl}/${element.elementValue}`}
                          alt={element.altText}
                          width={0}
                          height={0}
                          sizes="(max-width: 1023px) 100vw, 70vw"
                          style={{ width: '100%', height: 'auto' }}
                          className="rounded-xl shadow-lg shadow-black/30 ring-1 ring-white/10"
                          priority={priority}
                        />
                      </div>
                    );
                  case 'bullets':
                    return (
                      <div key={element.id} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 text-white">{element.bulletTitle}</h3>
                        <p className="text-gray-300 mb-2">{element.bulletDescription}</p>
                        <ul className="list-disc list-inside mb-4 pl-4 text-gray-200">
                          {element.elementValue.split(',, ').map((item, index) => (
                            <li key={index} className="mb-1">{item.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  case 'quote':
                    return (
                      <blockquote key={element.id} className="border-l-4 border-[var(--color-clr1)]/70 pl-4 italic text-gray-200 my-6 bg-white/5 rounded-lg py-3">
                        <p>{element.elementValue}</p>
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {faq && faq.length > 0 && (
              <section className="mt-12 bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faq.map((item, index) => (
                    <div key={item.id}>
                      <h3 className="text-lg font-semibold text-white">
                        {index + 1}. {item.ques}
                      </h3>
                      <p className="text-gray-300 mt-2">{item.ans}</p>
                    </div>
                  ))}
                </div>

                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": faq.map(item => ({
                        "@type": "Question",
                        "name": item.ques,
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": item.ans
                        }
                      }))
                    })
                  }}
                />
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
