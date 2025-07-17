'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    if (isTransitioning || images.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning || images.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const getPrevIndex = () => {
    return currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  };

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel image-carousel--empty">
        <div className="image-carousel__placeholder">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="image-carousel">
      <div className="image-carousel__container">
        
        {/* Left Side Image */}
        {images.length > 1 && (
          <div className="image-carousel__side image-carousel__side--left">
            <div className="image-carousel__image">
              <Image
                src={typeof images[getPrevIndex()] === 'string' ? images[getPrevIndex()] : images[getPrevIndex()].src}
                alt={`image-${getPrevIndex()}`}
                fill
                sizes="15vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        )}
        
        {/* Main Center Image */}
        <div className="image-carousel__main">
          <div className="image-carousel__image">
            <Image
              src={typeof images[currentIndex] === 'string' ? images[currentIndex] : images[currentIndex].src}
              alt={`image-${currentIndex}`}
              fill
              sizes="(max-width: 480px) 100vw, 60vw"
              style={{ objectFit: 'cover' }}
              priority={true}
            />
          </div>
        </div>

        {/* Right Side Image */}
        {images.length > 1 && (
          <div className="image-carousel__side image-carousel__side--right">
            <div className="image-carousel__image">
              <Image
                src={typeof images[getNextIndex()] === 'string' ? images[getNextIndex()] : images[getNextIndex()].src}
                alt={`image-${getNextIndex()}`}
                fill
                sizes="15vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              className="image-carousel__arrow image-carousel__arrow--prev"
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="image-carousel__arrow image-carousel__arrow--next"
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Content Below Carousel */}
      <div className="image-carousel__bottom-content">
        {/* Caption */}
        {images[currentIndex] && (typeof images[currentIndex] === 'object' && images[currentIndex].caption) && (
          <div className="image-carousel__caption">
            <p>{images[currentIndex].caption}</p>
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="image-carousel__counter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{currentIndex + 1} / {images.length}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;