
// [tripDetail]/page.jsx - Updated with dynamic metadata

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import tripData from '../../data/tripsData.json';
import BreadCrumb from '@/components/layout/BreadCrumb';
import SectionHeader from '@/components/layout/SectionHeader';
import ItineraryAccordion from '@/components/common/ItineraryAccordain';
import ImageCarousel from '@/components/common/ImageCarousel';
import SherlockLoader from '@/components/common/SherlockLoader';
import StickyBookingFooter from '@/components/common/StickyBookingFooter';
import LeadsModal from '@/components/common/LeadsModal';
import MetaTags from '@/utilis/seo/MetaTags';
import { generateTripDetailMetadata } from '@/utilis/seo/generateMetadata';

const TripDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  // Get parameters from URL
  const tripSlug = params?.tripDetail;
  const tripId = searchParams.get('id');

  // Generate metadata based on trip data
  const pageMetadata = generateTripDetailMetadata(trip);

  // Define sections for SectionHeader
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'itinerary', title: 'Itinerary' },
    { id: 'inclusions', title: 'Inclusions' },
    { id: 'exclusions', title: 'Exclusions' },
    { id: 'policies', title: 'Policies' }
  ];

  const handleBookNow = () => {
    setOpenForm(true);
  };

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (tripId) {
          // Find trip by ID
          const foundTrip = tripData.find(trip => trip.id === tripId);
          if (foundTrip) {
            setTrip(foundTrip);
          } else {
            setError('Trip not found');
          }
        } else if (tripSlug) {
          // Fallback: try to find by slug if no ID provided
          const slugifiedTrips = tripData.map(trip => ({
            ...trip,
            slug: trip.packageName?.replace(/\s+/g, "-").toLowerCase()
          }));
          const foundTrip = slugifiedTrips.find(trip => trip.slug === tripSlug);
          if (foundTrip) {
            setTrip(foundTrip);
          } else {
            setError('Trip not found');
          }
        } else {
          setError('Trip identifier not provided');
        }
      } catch (err) {
        setError('Failed to load trip data');
        console.error('Error fetching trip:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId, tripSlug]);

  // SVG Icon Component
  const SvgIcon = ({ svgUrl, className = "" }) => {
    return (
      <div 
        className={`svg-icon ${className}`}
        dangerouslySetInnerHTML={{ __html: atob(svgUrl.split(',')[1]) }}
      />
    );
  };

  // Generate carousel images
  const carouselImages = trip?.images ? trip.images : [];

  // Loading state
  if (loading) {
    return <SherlockLoader isLoading={loading} />;
  }

  // Error state
  if (error || !trip) {
    return (
      <>
        {/* Error page metadata */}
        <MetaTags metadata={generateTripDetailMetadata(null)} />
        
        <div className="trip-detail-page trip-detail-page--error">
          <div className="error-message">
            <h1>Trip Not Found</h1>
            <p>{error || 'The requested trip could not be found.'}</p>
            <button 
              onClick={() => router.push('/kashmir')}
              className="btn btn--primary"
            >
              Back to Kashmir
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <MetaTags metadata={pageMetadata} />
      
      <div className="trip-detail-page">
        
        {/* Package Hero Section with Breadcrumb */}
        <section className="trip-detail-container">
          <div className='mt-5'>
            <BreadCrumb className="about-section__breadcrumb" />
          </div>
          <div className="container">
            {/* Hero Info */}
            <div className="package-hero__info">
              <div className="package-hero__category_location">
                {trip.destination || trip.location}
              </div>
              
              <h1 className="package-hero__title">
                {trip.packageName}
              </h1>
              
              {/* Package Details - Dynamic from JSON */}
              <div className="package-hero__details">
                <div className="package-hero__detail-group">
                  <span className="package-hero__detail-label package-hero__detail-label--price">
                    Price
                  </span>
                  <span className="package-hero__detail-value">
                    From {trip.currency || '₹'}{trip.price} {trip.priceNote || 'per person'}
                  </span>
                  <span className="package-hero__detail-note">
                    (based on 2 ppl sharing)
                  </span>
                </div>
                
                <div className="package-hero__detail-group">
                  <span className="package-hero__detail-label package-hero__detail-label--duration">
                    How Long
                  </span>
                  <span className="package-hero__detail-value">
                    {trip.duration}
                  </span>
                  <span className="package-hero__detail-note">
                    ideal length
                  </span>
                </div>
                
                <div className="package-hero__detail-group">
                  <span className="package-hero__detail-label package-hero__detail-label--when">
                    Meal Plan
                  </span>
                  <span className="package-hero__detail-value">
                    {trip.mealsPlan}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Header */}
        <SectionHeader sections={sections} />
        
        {/* Main Content */}
        <div className="trip-detail-content">
          <ImageCarousel images={carouselImages}/>
          <div className="">
            
            {/* Overview Section */}
            <section id="overview" className="trip-section trip-section--overview">
              <div className="trip-section__container">
                <h2 className="trip-section__title">Package Overview</h2>
                <div className="trip-overview">
                  <div className="trip-overview__content">
                    <p className="trip-overview__description">{trip.description}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Itinerary Section */}
            <section id="itinerary" className="trip-section trip-section--itinerary">
              <div className="container trip-section__container">
                <h2 className="trip-section__title">Detailed Itinerary</h2>
                <ItineraryAccordion itinerary={trip.tourPlan} />
              </div>
            </section>
            
            <LeadsModal 
              handleClose={() => setOpenForm(false)} 
              show={openForm} 
              packageDetails={trip}
            />
            
            {/* Inclusions & Exclusions */}
            <section className="trip-section">
              <div className="container trip-section__container">
                <div className="inclusions-exclusions-wrapper">
                  
                  {/* Inclusions Section */}
                  <div id="inclusions" className="trip-section--inclusions">
                    <h2 className="trip-section__title">What's Included</h2>
                    <div className="inclusions-grid">
                      {trip.inclusions && trip.inclusions.map((inclusion, index) => (
                        <div key={index} className="inclusion-item">
                          <div className="inclusion-icon">
                            {inclusion.svgUrl ? (
                              <SvgIcon svgUrl={inclusion.svgUrl} />
                            ) : (
                              <i className={`icon-${inclusion.icon}`}></i>
                            )}
                          </div>
                          <div className="inclusion-content">
                            <h4>{inclusion.title}</h4>
                            <p>{inclusion.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exclusions Section */}
                  <div id="exclusions" className="trip-section--exclusions">
                    <h2 className="trip-section__title">What's Not Included</h2>
                    <div className="exclusions-list">
                      <ul>
                        {trip.exclusions && trip.exclusions.map((exclusion, index) => (
                          <li key={index}>{exclusion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Policies Section */}
            <section id="policies" className="trip-section trip-section--policies">
              <div className="container trip-section__container">
                <h2 className="trip-section__title">Booking Policies</h2>
                <div className="policies-content">
                  <div className="policy-group">
                    <h3>Cancellation Policy</h3>
                    <ul>
                      <li>45 days or more before departure: 25% of total cost</li>
                      <li>30-44 days before departure: 50% of total cost</li>
                      <li>15-29 days before departure: 75% of total cost</li>
                      <li>Less than 15 days: 100% of total cost</li>
                    </ul>
                  </div>
                  
                  <div className="policy-group">
                    <h3>Payment Policy</h3>
                    <ul>
                      <li>50% advance payment required at the time of booking</li>
                      <li>Remaining 50% to be paid 15 days before departure</li>
                      <li>Payment can be made via bank transfer, UPI, or online payment</li>
                    </ul>
                  </div>
                  
                  <div className="policy-group">
                    <h3>Important Notes</h3>
                    <ul>
                      <li>Prices are subject to change without prior notice</li>
                      <li>All bookings are subject to availability</li>
                      <li>Valid photo ID proof required for all travelers</li>
                      <li>Check weather conditions before travel</li>
                      <li>Follow local guidelines and regulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        {trip && (
          <StickyBookingFooter
            price={trip.price}
            originalPrice={trip.originalPrice}
            currency={trip.currency || '₹'}
            priceNote={trip.priceNote || 'per person'}
            packageName={trip.packageName}
            onBookNow={handleBookNow}
            discount={trip.discount} 
          />
        )}
      </div>
    </>
  );
};

export default TripDetailPage;