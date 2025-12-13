// src/app/robots.js
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

export default function robots() {
    // Ensure siteUrl is available and properly formatted
    if (!siteUrl) {
        console.warn('Warning: SITE_URL environment variable is not set. robots.txt may not work correctly.');
    }

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/preview', '/dashboard'],
        },
        sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
    };
}
