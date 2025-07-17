"use client";

import React, { useState, useRef } from 'react';
import SecondaryButton from '../layout/button/secondaryButton';
import { useRouter } from 'next/navigation';
import LeadsModal from '../common/LeadsModal';

const ReviewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const router = useRouter();
    const [open, setOpen] = useState(false);
  
  const handleNavigate = () => {
    setOpen(true)
  };
  
  const testimonials = [
    {
      id: 1,
      quote: "Sherlock Travels' hospitality, service and communication was top class. Lot of clarity in everyday briefing of the trip and extra activities that was requested last minute was organised smoothly.",
      author: "Sushma Nair, Bangulru",
      image: "/assets/images/testimonial-section/sushma-nair.webp"
    },
    {
      id: 3,
      quote: "Thank you Tauseen from Sherlock Travels for arranging an amazing trip. The whole trip went very smoothly and we all had our best holiday ever. We had best guides and the staff at all hotels were great.",
      author: "Teepireddy Swathi, Delhi",
      image: "/assets/images/testimonial-section/reddy.webp"
    },
    {
      id: 2,
      quote: "We traveled to different beautiful and mesmerizing sites of Kashmir which will last forever in our memories. Really grateful to Bilal Sir for guiding and caring us throughout our journey.",
      author: "Chunia Tajum, Sikkim",
      image: "/assets/images/testimonial-section/taku-yaku.webp"
    },
    {
      id: 4,
      quote: "For the first time, we booked a package from Sherlock Travel. It was a very nice experience. Farhana Ma'am had given us a bonfire at Pehalgam, which we enjoyed very much.",
      author: "Shubham Gaikwad, India",
      image: "/assets/images/testimonial-section/Shubham-gaikwad.webp"
    },
    {
      id: 5,
      quote: "Thank you Sherlock Travels for arranging our Kashmir tour. It was a lovely exploration. Special thanks to our tour guide Tawseen who made all arrangements so well, leaving us amazed and full of satisfaction.",
      author: "Simran Taneja, Mumbai",
      image: "/assets/images/testimonial-section/simran.webp"
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].offsetWidth;
      const gap = 24; // 2.4rem gap
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].offsetWidth;
      const gap = 24; // 2.4rem gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].offsetWidth;
      const gap = 24;
      const scrollLeft = container.scrollLeft;
      const newSlide = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentSlide(newSlide);
    }
  };

  return (
    <section className="luxury-experts">
      <div className="luxury-experts__container">
        {/* Header Section */}
        <div className="luxury-experts__header">
<h2 className="luxury-experts__title">THE SHERLOCK FAMILY - WHERE EVERY JOURNEY BECOMES PART OF YOUR STORY</h2>          <div className="luxury-experts__description">
            <p>
              What if travel wasn't about following someone else's itinerary? What if, instead of being told where to go, someone asked where your heart wants to wander? At Sherlock Travels, we believe every journey should be as unique as the person taking it. We're not tour operators—we're dream architects, crafting adventures that match your rhythm, your passions, your definition of magic.
            </p>
            
            <p className="luxury-experts__cta-text">
              So let's begin. Let's do something remarkable.
            </p>
            
            <SecondaryButton onClick={handleNavigate} variant="pink">
              GET IN TOUCH
            </SecondaryButton>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="luxury-experts__testimonials">
          {/* Desktop Navigation Arrows */}
          <button 
            className="testimonials__nav testimonials__nav--left"
            onClick={scrollLeft}
            aria-label="Previous testimonials"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>

          <button 
            className="testimonials__nav testimonials__nav--right"
            onClick={scrollRight}
            aria-label="Next testimonials"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>

          <div 
            className="testimonials__container"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial__card">
                <div className="testimonial__image">
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.author} enjoying their luxury travel experience`}
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't load
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNMTAwIDEzMEMxMDAgMTEwLjExIDExNi4xOSA5NCAxMzYuMDggOTRIMTYzLjkyQzE4My44MSA5NCwyMDAgMTEwLjExIDIwMCAxMzBWMTQwSDE2MEgxNDBIMTAwVjEzMFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPHN2ZyB4PSI3MCIgeT0iMTYwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjIwIj4KPFRLEHT+Cjx0ZXh0IHg9IjAiIHk9IjE1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTk5OTkiPkx1eHVyeSBUcmF2ZWxlcjwvdGV4dD4KPHN2Zz4KPC9zdmc+';
                    }}
                  />
                  <div className="testimonial__image-overlay">
                    <div className="testimonial__quote-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="testimonial__content">
                  <p className="testimonial__quote">{testimonial.quote}</p>
                  <span className="testimonial__author">{testimonial.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
<LeadsModal show={open} handleClose={()=>{setOpen(false)}}/>
        {/* Google Rating */}
        <div className="luxury-experts__google-rating">
          <div className="google-rating__stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#FFD700">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="google-rating__logo">5 Star Google</span>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;