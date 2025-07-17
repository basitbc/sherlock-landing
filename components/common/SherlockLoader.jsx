import React from 'react';

const SherlockLoader = ({ isLoading = true }) => {
  if (!isLoading) return null;

  const mainText = "SHERLOCK TRAVELS";
  const letters = mainText.split('');

  return (
    <div className="sherlock-loader">
      <div className="sherlock-loader__overlay">
        <div className="sherlock-loader__container">
          
          {/* Main Brand Text with Jumping Letters */}
          <div className="sherlock-loader__brand">
            {letters.map((letter, index) => (
              <span 
                key={index} 
                className={`letter ${letter === ' ' ? 'space' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--letter-index': index
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <div className="sherlock-loader__subtitle">
            Your Adventure Awaits
          </div>

          <div className="sherlock-loader__progress">
            <div className="progress-wave"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SherlockLoader;