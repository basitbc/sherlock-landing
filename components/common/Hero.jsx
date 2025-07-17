import React, { useEffect, useState } from 'react';

const Hero = ({ 
  backgroundImage, 
  title,
  subtitle,
  showCTA = false, 
  ctaText = "GET IN TOUCH", 
  ctaAction,
  height = "100vh",
  overlay = true,
  overlayOpacity = 0.4,
  textColor = "white",
  className = "",
  showScroll = true,
  scrollText = "SCROLL"
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      className={`custom-hero ${className}`}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        height: height
      }}
    >
      {overlay && (
        <div 
          className="custom-hero__overlay"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        ></div>
      )}
      
      <div className="custom-hero__content">
        <div className="custom-hero__text">
          {title && (
            <h1 
              className="custom-hero__title"
              style={{ color: textColor }}
            >
              {title}
            </h1>
          )}
          
          {subtitle && (
            <p 
              className="custom-hero__subtitle"
              style={{ color: textColor }}
            >
              {subtitle}
            </p>
          )}
          
          {showCTA && ctaAction && (
            <button 
              className="custom-hero__cta"
              onClick={ctaAction}
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>

      {showScroll && (
        <div className="custom-hero__scroll" onClick={scrollToContent}>
          <span 
            className="custom-hero__scroll-text"
            style={{ color: textColor }}
          >
            {scrollText}
          </span>
          <div 
            className="custom-hero__scroll-line"
            style={{ backgroundColor: textColor }}
          >
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;