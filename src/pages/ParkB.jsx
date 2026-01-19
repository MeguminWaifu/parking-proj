import React from 'react';
import Header from '../Header';
import './Parking.css';
import { useLocation } from 'react-router-dom';

function ParkB() {
  const location = useLocation();
  const username = location.state?.user || "that dude";
  const parkingCount = location.state?.parkingCount || 0;

  const slots = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    status: i < parkingCount ? 'Occupied' : 'Vacant'
  }));

  return (
    <>
      <div className="fixed-header">
      <Header user={username} />
      </div>
      <div className="map-page">
        
        <h2 className="lot-title">Parking Lot B</h2>
        
        <div className="grid-container">
          {slots.map(slot => (
            <div key={slot.id} className="slot-item">
             
              <div className={`car-icon ${slot.status.toLowerCase()}`}>
                🚗
              </div>
              <span className={`status-text ${slot.status.toLowerCase()}`}>
                {slot.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ParkB;