'use client';

import React, { useState, useEffect } from 'react';
import callIcon from '../../public/assets/images/footer-section/phone.svg'; // Import your SVG icon
import Image from 'next/image';

const StickyBookingFooter = ({ 
  price, 
  originalPrice, 
  currency = '₹', 
  priceNote = 'per person',
  packageName,
  onBookNow,
  discount = null,
  phoneNumber = '+919797009339'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section
      const heroSection = document.querySelector('.trip-detail-container');
      const footerSection = document.querySelector('.footer-section');
      
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate if footer is visible
        let footerVisible = false;
        if (footerSection) {
          const footerTop = footerSection.offsetTop;
          const scrollBottom = scrollPosition + windowHeight;
          footerVisible = scrollBottom >= footerTop;
        }
        
        // Show sticky footer when:
        // 1. User scrolled past hero section
        // 2. AND footer is not visible
        setIsVisible(scrollPosition > heroBottom && !footerVisible);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      // Default action - you can customize this
      console.log('Book Now clicked');
      // Example: window.open('tel:+1234567890') or navigate to booking form
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className={`sticky-booking-footer ${isVisible ? 'sticky-booking-footer--visible' : ''}`}>
      <div className="sticky-booking-footer__container">
        
        {/* Left side - Package info and pricing */}
        <div className="sticky-booking-footer__info">
          <div className="sticky-booking-footer__package-name">
            {packageName}
          </div>
          
          <div className="sticky-booking-footer__pricing">
            <div className="sticky-booking-footer__price-group">
              {/* Show discount badge if available */}
              {discount && (
                <div className="sticky-booking-footer__discount-badge">
                  {discount}% OFF
                </div>
              )}
              
              <div className="sticky-booking-footer__price-container">
                {/* Original price (crossed out if there's a discount) */}
                {originalPrice && originalPrice !== price && (
                  <span className="sticky-booking-footer__original-price">
                    {currency}{originalPrice}
                  </span>
                )}
                
                {/* Current price */}
                <span className="sticky-booking-footer__current-price">
                  {currency}{price}
                </span>
              </div>
              
              <span className="sticky-booking-footer__price-note">
                {priceNote}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Actions (Call and Book Now buttons) */}
        <div className="sticky-booking-footer__actions">
          {/* Call Button */}
          <button 
            className="sticky-booking-footer__call-btn"
            onClick={handleCall}
            aria-label={`Call ${phoneNumber}`}
          >
            <Image 
  src={callIcon}
  alt="Call"
  width={20}
  height={20}
  className="sticky-booking-footer__call-icon"
/>
          </button>

          {/* Book Now Button */}
          <button 
            className="sticky-booking-footer__book-btn"
            onClick={handleBookNow}
            aria-label={`Book ${packageName} now for ${currency}${price}`}
          >
            <span className="sticky-booking-footer__book-text">Book Now</span>
            <span className="sticky-booking-footer__book-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyBookingFooter;