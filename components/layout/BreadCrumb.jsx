'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const BreadCrumb = ({ className = "" }) => {
  const pathname = usePathname();

  // Function to generate breadcrumb items from URL
  const generateBreadcrumbs = () => {
    // Remove leading slash and split by '/'
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    
    if (pathSegments.length === 0) {
      return [{ text: 'Home', url: '/', isClickable: false }];
    }

    const breadcrumbs = [];
    
    // Add Home as first item (always clickable except if we're on home page)
    if (pathname !== '/') {
      breadcrumbs.push({ text: 'Home', url: '/', isClickable: true });
    }

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format segment name (capitalize and replace hyphens with spaces)
      const formattedSegment = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Last item is not clickable (current page)
      const isClickable = index < pathSegments.length - 1;
      
      breadcrumbs.push({
        text: formattedSegment,
        url: currentPath,
        isClickable
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  return (
    <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
      <div className="breadcrumb__container">
        <ol className="breadcrumb__list">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="breadcrumb__item">
              {item.isClickable ? (
                <Link href={item.url} className="breadcrumb__link">
                  {item.text}
                </Link>
              ) : (
                <span className="breadcrumb__current" aria-current="page">
                  {item.text}
                </span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default BreadCrumb;