import React from 'react';

const DestinationSection = ({ 
  title = "DESTINATIONS",
  countries = [],
  onCountryClick,
className = "",
  id = "destinations"
}) => {
  // Default countries data for Africa

  const countriesToDisplay =  countries ;

  const handleCountryClick = (country) => {
    if (onCountryClick) {
      onCountryClick(country);
    } else {
      // Default navigation
      window.location.href = `/destinations/${country.id}`;
    }
  };

  return (
    <section id={id} className={`countries-section ${className}`}>
      <div className="countries-section__container">
        <div className="countries-section__header">
          <h2 className="countries-section__title">
            {title}
          </h2>
        </div>

        <div className="countries-section__grid">
          {countriesToDisplay.map((country, index) => (
            <div 
              key={country.id}
              className="country-card"
              onClick={() => handleCountryClick(country)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="country-card__image">
                <img 
                  src={country.image} 
                  alt={`${country.name} landscape`}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzAgMTIwSDE2MFYxMDBIMTcwVjEyMFpNMjEwIDEyMEgyMDBWMTAwSDIxMFYxMjBaTTI1MCAxMjBIMjQwVjEwMEgyNTBWMTIwWk0yMzAgMTQwSDIyMFYxMjBIMjMwVjE0MFpNMTkwIDE0MEgxODBWMTIwSDE5MFYxNDBaTTE5MCA5MEgxODBWNzBIMTkwVjkwWk0yMzAgOTBIMjIwVjcwSDIzMFY5MFpNMjEwIDc0VjY0SDE5MFY3NEgyMTBaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNvdW50cnkgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
                <div className="country-card__overlay">
                  <h3 className="country-card__name">
                    {country.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;