import { Metadata } from 'next';

export const metadata = {
    title: 'Sherlock Travels: Premier Kashmir Travel Experience | Tailor-Made Tours',
    description: 'Sherlock Travels specializes in customized travel plans through Kashmir\'s picturesque valleys. From luxurious hotels to cozy homestays, we provide world-class amenities and unparalleled hospitality for extraordinary journeys.',
    icons: { icon: '/assets/images/logo/company-logo.png' }, 
    openGraph: {
        title: 'Sherlock Travels: Premier Kashmir Travel Experience | Tailor-Made Tours',
        description: 'Sherlock Travels specializes in customized travel plans through Kashmir\'s picturesque valleys. From luxurious hotels to cozy homestays, we provide world-class amenities and unparalleled hospitality for extraordinary journeys.',
        images: [{ url: '/assets/images/logo/company-logo.png', width: 1200, height: 630 }], // Update with your actual image path
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sherlock Travels: Premier Kashmir Travel Experience | Tailor-Made Tours',
        description: 'Sherlock Travels specializes in customized travel plans through Kashmir\'s picturesque valleys. From luxurious hotels to cozy homestays, we provide world-class amenities and unparalleled hospitality for extraordinary journeys.',
        images: ['/assets/images/logo/company-logo.png'],
    },
};