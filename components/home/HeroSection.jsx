'use client';

import React, { useEffect, useState } from 'react';
import SecondaryButton from '../layout/button/secondaryButton';

const HeroSection = () => {
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
    <section className="hero">
      <div className="hero__background"></div>
      
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">
            REDEFINING WHAT LUXURY TRAVEL CAN BE
            <br />
           FOR THE EXTRAORDINARY FEW
          </h1>
          
          <SecondaryButton variant="primary">
            GET IN TOUCH
          </SecondaryButton>
        </div>
      </div>

      <div className="hero__scroll" onClick={scrollToContent}>
        <span className="hero__scroll-text">SCROLL</span>
        <div className="hero__scroll-line">
          <div className="hero__scroll-dot hero__scroll-dot--1"></div>
          <div className="hero__scroll-dot hero__scroll-dot--2"></div>
          <div className="hero__scroll-dot hero__scroll-dot--3"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;