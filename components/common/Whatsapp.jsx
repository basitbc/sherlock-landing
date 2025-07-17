'use client';

import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import whatsappIcon from '../../public/assets/images/contact-us/whatsapp-color-svgrepo-com.svg';

const WhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Your WhatsApp number (country code without + symbol)
  const phoneNumber = "919797009339";
  
  // Default message
  const defaultMessage = "Hi! I'm interested in your travel packages. Can you help me plan my trip?";

  useEffect(() => {
    // Show the WhatsApp icon after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const shouldHideWhatsApp = 
    pathname.match(/^\/[^\/]+$/) || // Trip detail pages with ID param
    pathname === '/contact' ||       // Contact page
    pathname === '/about';           // About page

  if (shouldHideWhatsApp) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div 
      className={`whatsapp-float ${isVisible ? 'whatsapp-float--visible' : ''}`}
      onClick={handleWhatsAppClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Contact us on WhatsApp"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleWhatsAppClick();
        }
      }}
    >
      {/* Pulse rings */}
      <div className="whatsapp-float__pulse-ring"></div>
      <div className="whatsapp-float__pulse-ring whatsapp-float__pulse-ring--delayed"></div>
      
      {/* Main icon container */}
      <div className="whatsapp-float__icon">
       <Image src={whatsappIcon} height={60} width={60}/>
      </div>

      {/* Tooltip */}
      <div className={`whatsapp-float__tooltip ${isHovered ? 'whatsapp-float__tooltip--visible' : ''}`}>
        <span>Chat with us on WhatsApp!</span>
        <div className="whatsapp-float__tooltip-arrow"></div>
      </div>
    </div>
  );
};

export default WhatsApp;