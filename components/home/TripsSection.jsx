import React from 'react';
import TripCard from './TripCard';
import SecondaryButton from '../layout/button/secondaryButton';
import { tripCards } from '@/data/tripsCards';
import tripData from '../../data/tripsData.json';

const TripsSection = () => {
  return (
    <div className='trips-section'>
      <div className='container'>
        <div className='trips-main'>
          <div className='trips-left'>
            <h1 className='trips-title'>EXPLORE OUR TRIPS</h1>
            <p className='trips-subtitle'>Remarkable experiences to inspire the mind</p>
          </div>

          <div className='trips-right'>
            <SecondaryButton variant="primary">
              VIEW ALL
            </SecondaryButton>
          </div>
        </div>

        {/* Horizontal Scrolling Trip Cards */}
        <div className='trips-card-section'>
          {tripData?.map((trip, index) => (
            <TripCard showBookNow key={trip.id} trip={trip} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripsSection;