'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useHeader } from '@/utilis/HeaderContext';
import SecondaryButton from './button/secondaryButton';
import Image from 'next/image';
import CompanyLogoWhite from '../../public/assets/images/logo/company-logo-white.png';
import CompanyLogo from '../../public/assets/images/logo/company-logo.png';
import CompanyLogoBlack from '../../public/assets/images/logo/company-logo-black.png';

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { hasSectionHeader, sectionHeaderSticky, scrollDirection } = useHeader();
  const router = useRouter();
  
  // Define transparent routes and check if current route is transparent
  const transparentRoutes = [ '/destinations', '/destinations/kashmir'];
  const isTransparentRoute = transparentRoutes.includes(pathname);
  
  // Check if it's a trip detail page (non-transparent)
  const isTripDetailPage = pathname.match(/^\/destinations\/[^\/]+\/[^\/]+/);
  
  // Final determination of transparency
  const shouldBeTransparent = isTransparentRoute && !isTripDetailPage;

  const handlePhoneClick = () => {
    window.location.href = 'tel:+919797009339';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine header visibility and styling
  const shouldShowHeader = !hasSectionHeader || !sectionHeaderSticky || (sectionHeaderSticky && scrollDirection === 'up');
  
  // Header classes based on transparency and scroll state
  const getHeaderClasses = () => {
    let classes = 'header';
    
    if (!shouldBeTransparent) {
      classes += ' header--with-background';
    }
    
    if (isScrolled) {
      classes += ' header--scrolled';
    }
    
    if (!shouldShowHeader) {
      classes += ' header--hidden';
    }
    
    return classes;
  };

  return (
    <header 
      className={getHeaderClasses()} 
      style={{
        display: shouldShowHeader ? 'flex' : 'none',
        zIndex: shouldShowHeader ? 1000 : 900
      }}
    >
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <span onClick={() => {router.push('/')}} className="header__logo-text">
            <Image 
              width={120} 
              height={0}
              src={shouldBeTransparent ? CompanyLogo : CompanyLogo} 
              alt='Company Logo'
              style={{
                width: '120px',
                height: 'auto'
              }}
            />
          </span>
        </div>

        {/* Right Section - Phone and CTA */}
        <div className="header__right">
          {/* Phone Number - Clickable */}
          <div className="header__phone" onClick={handlePhoneClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="header__phone-icon">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span>+91-9797009339</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;