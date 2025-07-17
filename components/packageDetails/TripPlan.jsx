import React, { useState } from 'react';

const TripPlan = ({ itinerary = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // default to first heading

  const selectedItem = itinerary[selectedIndex];

  return (
    <div className="container trip-plan-section">
      <h2 className="brandson-bold fs-32-16 black mb-5">Trip Plans</h2>
      <div className="trip-package d-flex">
        {/* Left Section - Headings */}
        <div className="col-4 pe-4 ">
          {itinerary.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`trip-heading-item p-3 mb-5 cursor-pointer ${index === selectedIndex ? 'active' : ''}`}
              style={{ border: index === selectedIndex ? '1px solid black' : '1px solid black', background: index === selectedIndex ? '#00000' : 'transparent' }}
            >
              <p className="brandson-medium fs-24-12">{item.heading}</p>
            </div>
          ))}
        </div>

        {/* Middle Section - Image */}
        <div className="col-4 text-center px-4">
          <img
            src={selectedItem?.image}
            alt={selectedItem?.heading}
            className="img-fluid rounded"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>

        {/* Right Section - Day & Body */}
        <div className="col-4 ps-4">
          <p className="day-label fw-bold mb-2">{selectedItem?.day}</p>
          <p className="day-body" style={{ whiteSpace: 'pre-line' }}>
            {selectedItem?.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripPlan;
