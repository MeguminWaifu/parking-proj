import React, { useEffect, useState } from 'react';
import Header from '../Header';
import './Parking.css';
import { useLocation } from 'react-router-dom';

function ParkA() {
  const location = useLocation();
  const username = location.state?.user || "that dude";
  

  const [dbData, setDbData] = useState({ count: 0, capacity: 60 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:3001/api/parking-a');
        const response = await fetch('http://10.121.59.243:3001/api/parking-a');
        const data = await response.json();
        if (data.length > 0) {
          
          setDbData({ count: data[0].count, capacity: data[0].capacity });
        }
      } catch (err) {
        console.error("Database connection error:", err);
      }
    };

    fetchData();
  }, []);

 
  const slots = Array.from({ length: dbData.capacity }, (_, i) => ({
    id: i + 1,
    status: i < dbData.count ? 'Occupied' : 'Vacant'
  }));

  return (
    <>
      <div className="fixed-header">
        <Header user={username} />
      </div>
      <div className="map-page">
        <h2 className="lot-title">Parking Lot A</h2>
        
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

export default ParkA;
