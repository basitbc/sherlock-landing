"use client";

import React, { useState, useEffect } from "react";
import TripCard from "../home/TripCard";
import SecondaryButton from "../layout/button/secondaryButton";

const TripsListSection = ({
  title = "FEATURED KASHMIR PACKAGES",
  description = "Discover the paradise on earth with our carefully curated Kashmir travel packages. From romantic honeymoons to family adventures, we have something for every traveler.",
  location = "", // Filter by location
  className = "",
  id = "trips",
  showBookNow = false,
  initialVisibleCount = 6, // Number of trips to show initially
  loadMoreCount = 6, // Number of trips to load when "View More" is clicked
  tripData = [] // Pass the JSON data as prop
}) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [filteredTrips, setFilteredTrips] = useState([]);
  
  // Filter trips by location if specified
  useEffect(() => {
    if (location) {
      const filtered = tripData.filter(trip => 
        trip.location.toLowerCase() === location.toLowerCase()
      );
      setFilteredTrips(filtered);
    } else {
      setFilteredTrips(tripData);
    }
  }, [tripData, location]);
  
  const visibleTrips = filteredTrips.slice(0, visibleCount);
  const hasMoreTrips = visibleCount < filteredTrips.length;
  
  const handleViewMore = () => {
    setVisibleCount(prevCount => 
      Math.min(prevCount + loadMoreCount, filteredTrips.length)
    );
  };

  return (
    <section id={id} className={`trips-list-section ${className}`}>
      <div className="trips-list-section__container">
        {/* Main Content Grid - Title/Description on Left, Trips on Right */}
        <div className="trips-list-section__main">
          {/* Header Content - Left Side */}
          <div className="trips-list-section__content">
            <h2 className="trips-list-section__title">
              {title}
            </h2>
            <p className="trips-list-section__description">
              {description}
            </p>
          </div>

          {/* Trips Grid - Right Side */}
          <div className="trips-list-section__grid">
            {visibleTrips.map((trip, index) => (
              <TripCard
                key={trip.id || index}
                trip={trip}
                index={index}
                showBookNow={showBookNow}
              />
            ))}
          </div>
        </div>
        
        {/* View More Button - Only show if there are more trips */}
        {hasMoreTrips && (
          <div className="trips-list-section__view-more">
            <SecondaryButton              
              variant="secondary-transparent"
              onClick={handleViewMore}                   
            >             
              View More
            </SecondaryButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default TripsListSection;