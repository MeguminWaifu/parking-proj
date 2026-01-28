import './Home.css'
import Header from '../Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the UserID passed from the new Login logic
  const userid = location.state?.displayName || "User";


  const [parkingA, setParkingA] = useState({ count: 0, capacity: 1 });
  const [parkingB, setParkingB] = useState({ count: 0, capacity: 1 });


  useEffect(() => {
    const fetchParkingData = async () => {
     try {
      const responseA = await fetch('http://localhost:3001/api/parking-a');
      const dataA = await responseA.json();
      if (dataA.length > 0) {
        setParkingA({ count: dataA[0].count, capacity: dataA[0].capacity });
      }
    } catch (err) {
      console.error("Error fetching Parking A:", err);
    }


    try {
      const responseB = await fetch('http://localhost:3001/api/parking-b');
      const dataB = await responseB.json();
      if (dataB.length > 0) {
        setParkingB({ count: dataB[0].count, capacity: dataB[0].capacity });
      }
    } catch (err) {
      console.error("Error fetching Parking B:", err);
    }
    };

    fetchParkingData();
    // set an interval to refresh data every 10 seconds
    const interval = setInterval(fetchParkingData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleParkingAClick = () => {
    navigate('/parka', { state: { user: userid, currentCount: parkingA.count } });
  };

  const handleParkingBClick = () => {
    navigate('/parkb', { state: { user: userid, currentCount: parkingB.count } });
  };


  const progressPercentageA = (parkingA.count / parkingA.capacity) * 100;
  const progressPercentageB = (parkingB.count / parkingB.capacity) * 100;

  return (
    <>
      <Header user={userid}/>
      <div className="Welcome-message">
        <h1>Parking Project</h1>
        <h2>Malayan Laguna</h2>
        {/* <p>Welcome back, student {userid}</p> */}
      </div>

      <div className="containers-wrapper">
        {/* Parking A Container */}
        <div className="container left-container" onClick={handleParkingAClick} style={{cursor: 'pointer'}}>
          <h2>Parking A</h2>
          <div className="progress-info">
            <p>{parkingA.count} / {parkingA.capacity}</p>
          </div>
          <div className="progress-bar-wrapper">
            <div 
              className="progress-bar" 
              style={{
                width: `${progressPercentageA}%`,
                backgroundColor: progressPercentageA > 90 ? 'red' : '#4caf50' 
              }}
            ></div>
          </div>
          <p className="status-text">
            {parkingA.capacity - parkingA.count} spots available
          </p>
        </div>

        {/* Parking B Container */}
        <div className="container right-container" onClick={handleParkingBClick} style={{cursor: 'pointer'}}>
          <h2>Parking B</h2>
          <div className="progress-info">
            <p>{parkingB.count} / {parkingB.capacity}</p>
          </div>
          <div className="progress-bar-wrapper">
            <div 
              className="progress-bar" 
              style={{
                width: `${progressPercentageB}%`,
                backgroundColor: progressPercentageB > 90 ? 'red' : '#4caf50'
              }}
            ></div>
          </div>
          <p className="status-text">
            {parkingB.capacity - parkingB.count} spots available
          </p>
        </div>
      </div>
    </>
  )
}

export default Home;