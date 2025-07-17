"use client";

import { useHeader } from '@/utilis/HeaderContext';
import React, { useState, useEffect, useRef } from 'react';

const SectionHeader = ({ sections = [], className = "" }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const listRef = useRef(null);
  const { registerSectionTitle, unregisterSectionTitle, setSectionTitleSticky, updateScrollDirection, scrollDirection } = useHeader();

  useEffect(() => {
    // Register this component when it mounts
    const heroElement = document.querySelector('.custom-hero');
    const heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight * 0.6;
    registerSectionTitle(heroHeight);

    // Unregister when it unmounts
    return () => {
      unregisterSectionTitle();
    };
  }, [registerSectionTitle, unregisterSectionTitle]);

  // Auto-scroll active section to center on mobile
  const scrollActiveToCenter = (activeIndex) => {
    if (listRef.current && window.innerWidth <= 768) {
      const activeButton = listRef.current.children[activeIndex]?.querySelector('.section-title__link');
      if (activeButton) {
        const listContainer = listRef.current;
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = listContainer.getBoundingClientRect();
        
        const scrollLeft = listContainer.scrollLeft;
        const buttonCenter = buttonRect.left + buttonRect.width / 2 - containerRect.left + scrollLeft;
        const containerCenter = containerRect.width / 2;
        
        listContainer.scrollTo({
          left: buttonCenter - containerCenter,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroElement = document.querySelector('.custom-hero');
      const heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight * 0.6;
      const headerHeight = 80; // Standard header height
      
      // Update scroll direction for header visibility logic
      updateScrollDirection(scrollPosition);
      
      // Check if should be sticky (after hero section)
      const shouldBeSticky = scrollPosition > heroHeight - headerHeight + 20; // Small buffer
      setIsSticky(shouldBeSticky);
      
      // Notify header context about sticky state
      setSectionTitleSticky(shouldBeSticky);

      // Find active section based on scroll position
      let currentSection = 0;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollPosition;
          const sectionHeight = rect.height;
          
          // Adjust for sticky header offset
          const offset = shouldBeSticky ? headerHeight + 20 : 200;
          
          if (scrollPosition >= sectionTop - offset && scrollPosition < sectionTop + sectionHeight - offset) {
            currentSection = index;
          }
        }
      });
      
      // Update active section and auto-scroll to center if changed
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        scrollActiveToCenter(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, setSectionTitleSticky, updateScrollDirection, activeSection]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const sectionTitleHeight = 80; // SectionTitle component height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - sectionTitleHeight - 20; // Extra offset for spacing

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Section header should be visible when:
  // 1. It's sticky (past hero section)
  // 2. User is scrolling DOWN (not up)
  const shouldShowSectionHeader = isSticky && scrollDirection === 'down';

  return (
    <nav 
      className={`section-title ${isSticky ? 'section-title--sticky' : ''} ${shouldShowSectionHeader ? '' : 'section-title--hidden'} ${className}`} 
      style={{
        display: isSticky ? 'flex' : 'none',
        zIndex: shouldShowSectionHeader ? 999 : 900
      }}
    >
      <div className="section-title__container">
        <ul className="section-title__list" ref={listRef}>
          {sections.map((section, index) => (
            <li key={section.id} className="section-title__item">
              <button
                className={`section-title__link ${activeSection === index ? 'section-title__link--active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SectionHeader;