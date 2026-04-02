// frontend/src/components/Spinner.jsx

import React from 'react';
import { FaHome } from 'react-icons/fa';

const Spinner = ({ size = 'md' }) => {
  // Define sizes for icon and text
  const iconSizeClasses = {
    sm: 'text-4xl',
    md: 'text-5xl',
    lg: 'text-6xl',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex flex-col justify-center items-center py-10">
      {/* The container with the pulse animation */}
      <div className="flex flex-col items-center justify-center animate-pulse">
        <FaHome className={`${iconSizeClasses[size]} text-primary mb-2`} />
        <span className={`${textSizeClasses[size]} font-bold text-primary`}>EstateHub</span>
      </div>
      
      {/* Optional loading text */}
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  );
};

export default Spinner;