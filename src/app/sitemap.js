const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

if (!siteUrl) {
    console.warn('Warning: SITE_URL environment variable is not set. Sitemap may not work correctly.');
}

async function fetchBlogs() {
    if (!siteUrl) {
        return [];
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiBaseUrl || !apiKey) {
        console.warn('Warning: API_BASE_URL or API_KEY environment variables are not set. Blog URLs will not be included in sitemap.');
        return [];
    }

    try {
        const response = await fetch(`${apiBaseUrl}/api/blogs/sitemap`, {
            headers: {
                Authorization: apiKey,
            },
            next: {
                // revalidate: 600, // 10 minutes
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch blogs sitemap data: ${response.statusText}`);
        }
        const { data } = await response.json();
        return data.map(({ slug, updatedAt }) => ({
            url: `${siteUrl}/blogs/${slug}`,
            lastModified: updatedAt ? new Date(updatedAt) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Error fetching blogs sitemap:', error);
        return [];
    }
}

export default async function sitemap() {
    if (!siteUrl) {
        // Return empty sitemap if siteUrl is not configured
        return [];
    }

    const staticPages = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${siteUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        }
    ];

    const blogs = await fetchBlogs();

    return [...staticPages, ...blogs];
}
