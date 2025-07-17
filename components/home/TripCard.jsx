"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SecondaryButton from "../layout/button/secondaryButton";
import LeadsModal from "../common/LeadsModal";

const slugify = (str) => str?.replace(/\s+/g, "-").toLowerCase();

const TripCard = ({ showBookNow = false, trip, index }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  
  const handleExploreClick = (item) => {
    const packageSlug = slugify(item?.packageName);
    
    // Redirect to /[tripDetail]?id={tripId}
    router.push(`/${packageSlug}?id=${item.id}`);
  };

  const handleBookClick = () => {
    setOpenForm(true);
  };

  // Construct image path
  const getImagePath = (imageName) => {
    return `/assets/images/trips/${imageName}`;
  };

  // Handle price display
  const formatPrice = (price) => {
    if (price === "Contact Us" || !price) {
      return "Contact Us for Pricing";
    }
    return `From ₹${price} pp`;
  };

  return (
    <div
      className="trip-card"
      style={{ backgroundImage: `url(${trip.bgImage})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Duration Badge */}
      <div className="trip-duration">
        {trip.duration}
      </div>

      {/* Trip Content */}
      <div className="trip-content">
        <h3 className="trip-title">
          {trip.packageName}
        </h3>
        
        {/* Show description and price only on hover */}
        {isHovered && (
          <div className="trip-hover-details">
            <p className="trip-description">
              {trip.description}
            </p>
            <p className="trip-price">
              {formatPrice(trip.price)}
            </p>
          </div>
        )}

        <div className="trip-buttons">
          <SecondaryButton 
            variant="primary"
            onClick={() => handleExploreClick(trip)}
          >
            EXPLORE
          </SecondaryButton>
          
          {(trip.showBookNow || showBookNow) && (
            <SecondaryButton 
              variant="pink"
              onClick={handleBookClick}
            >
              BOOK NOW
            </SecondaryButton>
          )}
        </div>
        
        {openForm && (
          <LeadsModal 
            handleClose={() => setOpenForm(false)} 
            show={openForm} 
            packageDetails={trip}
          />
        )}
      </div>
    </div>
  );
};

export default TripCard;