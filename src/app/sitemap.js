export default function sitemap() {
    const baseUrl = 'https://www.cvee.in';
    const currentDate = new Date().toISOString();

    // Blog post slugs
    const blogPosts = [
        'resume-ats-systems',
        'resume-formatting',
        'career-change-resume',
        'resume-length',
        'skills-section'
    ];

    // Static routes
    const routes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/templates`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/builder`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms-and-conditions`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Add blog post routes
    const blogRoutes = blogPosts.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}
