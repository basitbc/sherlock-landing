// components/SEO/MetaTags.jsx

import React from 'react';
import { useMetadata } from './useMetadata';

const MetaTags = ({ metadata }) => {
  useMetadata(metadata);
  return null; // This component doesn't render anything
};

export default MetaTags;