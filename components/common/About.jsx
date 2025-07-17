'use client';

import React from 'react';
import SecondaryButton from '../layout/button/secondaryButton';
import BreadCrumb from '../layout/BreadCrumb';

const AboutSection = ({ 
  title = "",
  description,
  ctaText = "START PLANNING...",
  readMoreText = "READ MORE +",
  onCTAClick,
  onReadMoreClick,
  className = "",
  id = "about",
  showBreadcrumb = true
}) => {
  return (
    <section id={id} className={`about-section ${className}`}>
      {showBreadcrumb && (
        <BreadCrumb className="about-section__breadcrumb" />
      )}
      
      <div className="about-section__container">
        <div className="about-section__content">
          <h2 className="about-section__title">
            {title}
          </h2>
          
          <div className="about-section__description">
            <p>
              {description}
            </p>
          </div>
          
          <div className="about-section__actions">
            <SecondaryButton 
              variant="pink"
              onClick={onCTAClick}
            >
              {ctaText}
            </SecondaryButton>
            
            <button 
              className="about-section__read-more"
              onClick={onReadMoreClick}
            >
              {readMoreText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;