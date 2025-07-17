'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const HeaderContext = createContext();

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};

export const HeaderProvider = ({ children }) => {
  const [hasSectionHeader, setHasSectionHeader] = useState(false);
  const [sectionHeaderSticky, setSectionHeaderSticky] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  const registerSectionTitle = useCallback((height) => {
    setHasSectionHeader(true);
    setHeroHeight(height);
  }, []);

  const unregisterSectionTitle = useCallback(() => {
    setHasSectionHeader(false);
    setSectionHeaderSticky(false);
    setHeroHeight(0);
    setScrollDirection('down');
    setLastScrollY(0);
  }, []);

  const setSectionTitleSticky = useCallback((isSticky) => {
    setSectionHeaderSticky(isSticky);
  }, []);

  const updateScrollDirection = useCallback((currentScrollY) => {
    // Add a small threshold to prevent rapid direction changes
    const threshold = 5;
    
    if (Math.abs(currentScrollY - lastScrollY) > threshold) {
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  const value = {
    hasSectionHeader,
    sectionHeaderSticky,
    heroHeight,
    scrollDirection,
    registerSectionTitle,
    unregisterSectionTitle,
    setSectionTitleSticky,
    updateScrollDirection,
  };

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
};