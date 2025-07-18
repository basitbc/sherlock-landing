// page.jsx (Kashmir page) - Updated with metadata

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/home/HeroSection';
import SectionHeader from '@/components/layout/SectionHeader';
import AboutSection from '@/components/common/About';
import Hero from '@/components/common/Hero';
import TripsListSection from '@/components/destinations/TripsList';
import { destinationData } from '@/data/destinationData';
import tripData from '../data/tripsData.json';
import SherlockLoader from '@/components/common/SherlockLoader';
import ReviewsSection from '@/components/home/reviews';
import LeadsModal from '@/components/common/LeadsModal';
import MetaTags from '@/utilis/seo/MetaTags';
import { generateKashmirPageMetadata } from '@/utilis/seo/generateMetadata';

const Page = () => {
  const router = useRouter();
  const [kashmirTrips, setKashmirTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Generate metadata for this page
  const pageMetadata = generateKashmirPageMetadata();

  // Section navigation configuration
  const sections = [
    { id: 'overview', title: 'OVERVIEW' },
    { id: 'packages', title: 'PACKAGES' },
    { id: 'reviews', title: 'REVIEWS' },
  ];

  // Get Kashmir destination data
  const kashmirDestination = destinationData.kashmir;

  // Load Kashmir trips on component mount
  useEffect(() => {
    const loadKashmirTrips = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay (optional - you can remove this)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Filter trips for Kashmir location
        const filtered = tripData.filter(trip => 
          trip.location.toLowerCase() === 'kashmir'
        );
        setKashmirTrips(filtered);
      } catch (err) {
        console.error('Error loading Kashmir trips:', err);
      } finally {
        setLoading(false);
      }
    };

    loadKashmirTrips();
  }, []);

  const handleStartPlanning = () => {
    setOpen(true)
  };

  const handleReadMore = () => {
    const detailsSection = document.getElementById('packages');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroCTA = () => {
    console.log('Hero CTA clicked for Kashmir');
    const overviewSection = document.getElementById('overview');
    if (overviewSection) {
      overviewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Loading state
  if (loading) {
    return <SherlockLoader isLoading={loading} />;
  }

  // Error state - if Kashmir data is not found
  if (!kashmirDestination) {
    return (
      <div className="destination-page destination-page--error">
        <div className="error-message">
          <h1>Kashmir Data Not Found</h1>
          <p>Kashmir destination information could not be loaded.</p>
          <button 
            onClick={() => router.push('/destinations')}
            className="btn btn--primary"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <MetaTags metadata={pageMetadata} />
      
      <div className="destination-page">
        {/* Hero Section */}
        <Hero
          title={kashmirDestination.title}
          subtitle={kashmirDestination.subtitle}
          backgroundImage={kashmirDestination.heroImage}
          ctaText="EXPLORE NOW"
          onCTAClick={handleHeroCTA}
          className="hero-section--destination"
        />

        {/* Section Navigation */}
        <SectionHeader sections={sections} />

        <LeadsModal show={open} handleClose={()=>{setOpen(false)}}/>
        
        {/* Overview Section */}
        <AboutSection 
          id="overview"
          title={kashmirDestination.overview.title}
          description={kashmirDestination.overview.description}
          ctaText="START PLANNING..."
          readMoreText="READ MORE +"
          onCTAClick={handleStartPlanning}
          onReadMoreClick={handleReadMore}
          showBreadcrumb={true}
          className="about-section--fade-in page-section"
        />

        {/* Packages Section */}
        <section id="packages" className="packages-section page-section">
          <TripsListSection
            title="FEATURED KASHMIR PACKAGES"
            description="Discover handpicked travel experiences in Kashmir. Our expertly crafted packages offer the perfect blend of adventure, comfort, and authentic local experiences."
            tripData={kashmirTrips}
            location="Kashmir"
            className="trips-list-section--compact"
            showBookNow={true}
          />
        </section>

        {/* Reviews Section */}
        <section id="reviews">
          <ReviewsSection />
        </section>
      </div>
    </>
  );
};

export default Page;
