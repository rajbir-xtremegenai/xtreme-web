import NewBlogCard from '../components/NewBlogCard';
import Link from 'next/link';
// import BlogSortSelect from '../../components/BlogSortSelect';
import BlogSortSelect from '../components/BlogSortSelect';


export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const title = "Car News, Reviews, and Guides - Xtreme Gen AI Blog";
  const description = "Stay up-to-date with the latest car news, expert reviews, and helpful guides on the Xtreme Gen AI blog. Your source for all things automotive.";
  const keywords = "car blog, automotive news, car reviews, car guides, car maintenance tips, Xtreme Gen AI blog";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/blogs`,
      siteName: "Xtreme Gen AI",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.jpg`],
      creator: "@carsinusa",
    },
    alternates: {
      canonical: `${baseUrl}/blogs`,
    },
    authors: [{ name: "Xtreme Gen AI Team", url: baseUrl }],
    creator: "Xtreme Gen AI Team",
    publisher: "Xtreme Gen AI",
    category: "Automobile",
  };
}

const listingsPerPage = 24;

async function getBlogs(page = 1, sortBy = 'new') {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error('Missing API environment variable: NEXT_PUBLIC_API_BASE_URL is not set.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      page: page,
      itemsPerPage: listingsPerPage,
      sortBy: sortBy
    }),
    next: { revalidate: 600 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function BlogsPage({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise;
  const page = parseInt(searchParams.page) || 1;
  const sortBy = searchParams.sortBy || 'new';

  const { data, pagination } = await getBlogs(page, sortBy);
  const { blogs } = data;
  const { currentPage, totalPages, totalResults } = pagination;

  const startIndex = (currentPage - 1) * listingsPerPage;
  const endIndex = startIndex + blogs.length;

  return (
    <main className="min-h-screen bg-[var(--color-bg-dark)] text-white selection:bg-[var(--color-clr1)] selection:text-white">
      <div className="max-w-5xl mx-auto pt-28">
        <article className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 p-6 sm:p-10">
          <div className="flex flex-row justify-between items-center mb-4">
            <nav aria-label="Breadcrumb">
              <span className="text-white/70">
                <Link href="/" className="hover:underline text-[var(--color-clr1)] transition-colors duration-300">Home</Link> / Blogs
              </span>
            </nav>
            <BlogSortSelect page={page} sortBy={sortBy} />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-4">Latest Blogs</h1>

          <div className="text-white/60 mb-6">
            Showing {blogs.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalResults)} of <span className="font-semibold text-white">{totalResults}</span> results
          </div>

          <div className="flex flex-col gap-10 max-w-5xl mx-auto">
            {blogs.map((blog, index) => (
              <NewBlogCard key={blog.id} blog={blog} priority={index === 0} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav>
                <ul className="flex space-x-2">
                  <li>
                    <Link href={`/blogs?page=${currentPage - 1}&sortBy=${sortBy}`}>
                      <button
                        disabled={currentPage === 1}
                        className={`px-3 py-2 border border-white/20 rounded-md text-white bg-black/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-clr1)] transition-all duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        &larr;
                      </button>
                    </Link>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <li key={pageNumber}>
                      <Link href={`/blogs?page=${pageNumber}&sortBy=${sortBy}`}>
                        <button
                          className={`px-3 py-2 border border-white/20 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-clr1)] ${currentPage === pageNumber
                            ? 'bg-[var(--color-clr1)] text-white border-[var(--color-clr1)]'
                            : 'text-white bg-black/20 hover:bg-white/10'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={`/blogs?page=${currentPage + 1}&sortBy=${sortBy}`}>
                      <button
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 border border-white/20 rounded-md text-white bg-black/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-clr1)] transition-all duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        &rarr;
                      </button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
