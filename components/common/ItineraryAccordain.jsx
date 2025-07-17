'use client';

import React, { useState, useEffect } from 'react';

const ItineraryAccordion = ({ itinerary = [] }) => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default
  const [allExpanded, setAllExpanded] = useState(false);

  // Update allExpanded state when openItems changes
  useEffect(() => {
    setAllExpanded(openItems.size === itinerary.length && itinerary.length > 0);
  }, [openItems, itinerary.length]);

  const toggleItem = (index) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
      return newOpenItems;
    });
  };

  const expandAll = () => {
    if (itinerary.length > 0) {
      const allIndices = new Set(itinerary.map((_, index) => index));
      setOpenItems(allIndices);
    }
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="itinerary-accordion itinerary-accordion--empty">
        <p>No itinerary available</p>
      </div>
    );
  }

  return (
    <div className="itinerary-accordion">
      
      {/* Control Buttons */}
      <div className="itinerary-accordion__controls">
        <button
          className="itinerary-accordion__control-btn"
          onClick={expandAll}
          disabled={allExpanded}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 12L12 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Expand All
        </button>
        
        <button
          className="itinerary-accordion__control-btn"
          onClick={collapseAll}
          disabled={openItems.size === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Collapse All
        </button>
      </div>

      {/* Accordion Items */}
      <div className="itinerary-accordion__list">
        {itinerary.map((day, index) => {
          const isOpen = openItems.has(index);
          
          return (
            <div 
              key={day.day || index} 
              className={`itinerary-accordion__item ${isOpen ? 'itinerary-accordion__item--open' : ''}`}
            >
              
              {/* Accordion Header */}
              <button
                className="itinerary-accordion__header"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`itinerary-content-${index}`}
              >
                <div className="itinerary-accordion__header-content">
                  <div className="itinerary-accordion__day-number">
                    <span>Day {day.day}</span>
                  </div>
                  <div className="itinerary-accordion__day-title">
                    <h3>{day.title}</h3>
                  </div>
                </div>
                
                <div className="itinerary-accordion__toggle">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className={`itinerary-accordion__icon ${isOpen ? 'itinerary-accordion__icon--open' : ''}`}
                  >
                    <path 
                      d="M6 9L12 15L18 9" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              <div 
                id={`itinerary-content-${index}`}
                className={`itinerary-accordion__content ${isOpen ? 'itinerary-accordion__content--open' : ''}`}
                style={{
                  maxHeight: isOpen ? '1000px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out'
                }}
              >
                <div className="itinerary-accordion__content-inner">
                  <div className="itinerary-accordion__description">
                    <p>{day.description}</p>
                  </div>
                  
                  {day.note && (
                    <div className="itinerary-accordion__note">
                      <div className="itinerary-accordion__note-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                          <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="itinerary-accordion__note-content">
                        <p>{day.note}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItineraryAccordion;