// Default SEO configuration for cvee.in
// This is used as fallback when pages don't define their own metadata

const baseUrl = 'https://www.cvee.in';

export const defaultSEO = {
    // Title Template (50-60 chars per page)
    title: {
        template: '%s | Cvee',
        default: 'Cvee - Free Resume Builder Online',
    },

    // Description (150-160 chars)
    description: 'Create professional resumes for free with Cvee. Choose from ATS-friendly templates, customize your CV, and download instantly. No sign-up required.',

    // Keywords for SEO
    keywords: 'free resume builder, resume builder online, CV builder, create resume online, professional resume maker, ATS-friendly resume, resume templates free, CV maker, resume generator',

    // Author & Publisher
    authors: [{ name: 'Cvee' }],
    creator: 'Cvee',
    publisher: 'Cvee',

    // Open Graph (Facebook, LinkedIn)
    openGraph: {
        type: 'website',
        siteName: 'Cvee',
        locale: 'en_US',
        url: baseUrl,
        title: 'Cvee - Free Resume Builder Online',
        description: 'Create professional resumes for free. ATS-friendly templates, instant customization, PDF download. No account needed.',
        images: [
            {
                url: `${baseUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Cvee Resume Builder',
            },
        ],
    },

    // Twitter Cards
    twitter: {
        card: 'summary_large_image',
        title: 'Cvee - Free Resume Builder',
        description: 'Create professional resumes for free. ATS-friendly templates, instant customization, PDF download.',
        images: [`${baseUrl}/og-image.png`],
    },

    // Robots
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Base URL
    metadataBase: new URL(baseUrl),

    // Default Canonical
    alternates: {
        canonical: "/",
    },

    // Category
    category: 'Technology',
};

// Structured Data (JSON-LD) for Organization
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cvee',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Free online resume builder helping professionals create ATS-friendly resumes instantly',
    sameAs: [
        // Add social media profiles here
        // 'https://twitter.com/cvee',
        // 'https://www.linkedin.com/company/cvee',
    ],
};

// Structured Data for WebApplication
export const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cvee Resume Builder',
    url: baseUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    description: 'Free online resume builder with professional ATS-friendly templates. Create, customize, and download your resume instantly without signing up.',
    featureList: [
        'Free resume builder with no sign-up required',
        'ATS-friendly professional templates',
        'Real-time resume preview',
        'Instant PDF download',
        'Multiple resume templates',
        'Mobile-friendly editor',
    ],
    screenshot: `${baseUrl}/app-screenshot.png`,
};

// Helper function to merge metadata
export function mergeSEO(pageMetadata) {
    return {
        ...defaultSEO,
        ...pageMetadata,
        openGraph: {
            ...defaultSEO.openGraph,
            ...pageMetadata.openGraph,
        },
        twitter: {
            ...defaultSEO.twitter,
            ...pageMetadata.twitter,
        },
    };
}
