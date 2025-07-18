// layout.jsx - Updated with default metadata handling

'use client';

import "../public/assets/css/styles.css";
import "../public/assets/css/styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DM_Sans } from "next/font/google";
import Wrapper from "@/components/layout/Wrapper";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import PackageContext from "@/utilis/PackageContext";
import { HeaderProvider } from "@/utilis/HeaderContext";
import { useState, useEffect } from "react";
import LeadsModal from "@/components/common/LeadsModal";
import WhatsApp from "@/components/common/Whatsapp";
import MetaTags from "@/utilis/seo/MetaTags";

const dmsans = DM_Sans({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

if (typeof window !== "undefined") {
  import("bootstrap");
}

// Default metadata for the site
const defaultMetadata = {
  title: 'Sherlock Travels: Premier Kashmir Travel Experience | Tailor-Made Tours',
  description: 'Sherlock Travels specializes in customized travel plans through Kashmir\'s picturesque valleys. From luxurious hotels to cozy homestays, we provide world-class amenities and unparalleled hospitality for extraordinary journeys.',
  keywords: 'Kashmir travel, Kashmir tour packages, Kashmir tourism, travel agency Kashmir, Kashmir holidays, Srinagar tours, Gulmarg packages, Pahalgam trips, Dal Lake houseboats',
  openGraph: {
    title: 'Sherlock Travels: Premier Kashmir Travel Experience | Tailor-Made Tours',
    description: 'Sherlock Travels specializes in customized travel plans through Kashmir\'s picturesque valleys. From luxurious hotels to cozy homestays, we provide world-class amenities and unparalleled hospitality for extraordinary journeys.',
    image: '/assets/images/logo/company-logo.png',
    url: 'https://kashmir.thesherlocktravels.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sherlock Travels'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sherlock Travels: Premier Kashmir Travel Experience | Tailor-Made Tours',
    description: 'Sherlock Travels specializes in customized travel plans through Kashmir\'s picturesque valleys. From luxurious hotels to cozy homestays, we provide world-class amenities and unparalleled hospitality for extraordinary journeys.',
    image: '/assets/images/logo/company-logo.png'
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Sherlock Travels",
    "description": "Premier travel agency specializing in Kashmir tour packages and customized travel experiences.",
    "url": "https://kashmir.thesherlocktravels.com",
    "logo": "/assets/images/logo/company-logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Jammu and Kashmir"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "IN"
    }
  }
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [packageDetails, setPackageDetails] = useState([]);
  const [showLeadsModal, setShowLeadsModal] = useState(false);

  // Routes where header is transparent
  const transparentRoutes = ['/','/destinations','/destinations/kashmir'];
  const isTransparentRoute = transparentRoutes.includes(pathname);

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle LeadsModal timer - show after 10 seconds, only once per session
  useEffect(() => {
    // Check if modal has already been shown in this session
    const hasModalBeenShown = sessionStorage.getItem('leadsModalShown');
    
    if (!hasModalBeenShown) {
      const timer = setTimeout(() => {
        setShowLeadsModal(true);
        // Mark modal as shown in session storage
        sessionStorage.setItem('leadsModalShown', 'true');
      }, 10000); // 10 seconds

      // Cleanup timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle modal close
  const handleCloseModal = () => {
    setShowLeadsModal(false);
  };

  // Set default favicon and basic meta tags
  useEffect(() => {
    // Set favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = '/assets/images/logo/company-logo.png';
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(favicon);
    }

    // Set viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]') || document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    if (!document.querySelector('meta[name="viewport"]')) {
      document.head.appendChild(viewport);
    }

    // Set charset
    const charset = document.querySelector('meta[charset]') || document.createElement('meta');
    charset.setAttribute('charset', 'UTF-8');
    if (!document.querySelector('meta[charset]')) {
      document.head.appendChild(charset);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/images/logo/company-logo.png" />
      </head>
      <body className={dmsans.className}>
        {/* Default metadata - will be overridden by page-specific metadata */}
        <MetaTags metadata={defaultMetadata} />
        
        <PackageContext.Provider value={{ packageDetails, setPackageDetails }}>
          <HeaderProvider>
            <Header />
            <Wrapper>
              {/* Spacer only when header background is white */}
              {!isTransparentRoute && <div style={{ height: "5rem" }}></div>}
              {children}
            </Wrapper>
            <LeadsModal 
              handleClose={handleCloseModal}
              show={showLeadsModal} 
            />
            <WhatsApp />
          </HeaderProvider>
        </PackageContext.Provider>
      </body>
    </html>
  );
}