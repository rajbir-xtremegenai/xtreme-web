// src/app/preview/blog/[slug]/page.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArticleMeta from '../../../components/ArticleMeta';


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
  let isFirstImage = true;
  let hasTitle = false; // track title rendering

  return (
    <div className="main-container mx-auto py-10 px-8 sm:px-12 lg:px-16">
      <nav aria-label="Breadcrumb" className="mb-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <span className="text-gray-500">
              <Link href="/" className="hover:underline text-blue-500">Home</Link> /{' '}
              <Link href="/blogs" className="hover:underline text-blue-500">Blogs</Link> /{' '}
              <span className="text-gray-700">{blog.seoTitle}</span>
            </span>
          </div>
        </div>
      </nav>

      <article className="prose lg:prose-xl max-w-none">
        {blogData.map((element) => {
          switch (element.elementType) {
            case 'title':
              if (hasTitle) return null; // skip extra titles
              hasTitle = true;
              return (
                <div key={element.id}>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{element.elementValue}</h1>
                  <ArticleMeta
                    author={blog.author}
                    createdAt={blog.createdAt}
                    updatedAt={blog.updatedAt}
                  />
                </div>
              );
            case 'sub-title':
              return <h2 key={element.id} className="text-2xl font-semibold mb-3 text-gray-800">{element.elementValue}</h2>;
            case 'paragraph':
              return (
                <p
                  key={element.id}
                  className="mb-4 text-gray-800 whitespace-pre-line"
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
                      className="text-blue-600 hover:underline"
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
                // MODIFIED: This div now controls responsive width and centering
                <div key={element.id} className="my-6 w-full lg:w-[70%] mx-auto">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${element.elementValue}`}
                    alt={element.altText}
                    // MODIFIED: Props for responsive auto-height image
                    width={0}
                    height={0}
                    sizes="(max-width: 1023px) 100vw, 70vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="rounded-lg shadow-md"
                    priority={priority}
                  />
                </div>
              );
            case 'bullets':
              return (
                <div key={element.id}>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{element.bulletTitle}</h3>
                  <p className="text-gray-600">{element.bulletDescription}</p>
                  <ul className="list-disc list-inside mb-4 pl-4 text-gray-800">
                    {element.elementValue.split(',, ').map((item, index) => (
                      <li key={index} className="mb-1">{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              );
            case 'quote':
              return (
                <blockquote key={element.id} className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-6">
                  <p>{element.elementValue}</p>
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </article>

      {/* FAQs Section */}
      {faq && faq.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faq.map((item) => (
              <div key={item.id}>
                <h3 className="text-lg font-semibold text-gray-800">{item.ques}</h3>
                <p className="text-gray-600 mt-2">{item.ans}</p>
              </div>
            ))}
          </div>

          {/* FAQPage Schema */}
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
    </div>
  );
}
