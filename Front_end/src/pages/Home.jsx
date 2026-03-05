
import './Home.css';
import Header from '../Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QueueModal from '../Modal/QueueModal';
import { API_BASE } from '../config';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  
 
  const userid = String(location.state?.displayName || localStorage.getItem('userName') || "User");
  const userRole = localStorage.getItem('userRole') || "student"; 

  const [parkingA, setParkingA] = useState({ count: 0, capacity: 1 });
  const [parkingB, setParkingB] = useState({ count: 0, capacity: 1 });


    useEffect(() => {
    const fetchParkingData = async () => {
        // const API_BASE = 'http://10.121.59.243:3001/api/parking';
        // const API_BASE = 'http://localhost:3001/api/parking';
        // const API_BASE = "https://mcl-parking-app.loca.lt/api/parking";
        try {
            const [resA, resB] = await Promise.all([
                fetch(`${API_BASE}/parking/A`),
                fetch(`${API_BASE}/parking/B`)
            ]);

            const dataA = await resA.json();
            const dataB = await resB.json();

            if (dataA && !dataA.error) setParkingA({ count: dataA.count, capacity: dataA.capacity });
            if (dataB && !dataB.error) setParkingB({ count: dataB.count, capacity: dataB.capacity });
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    fetchParkingData();
    const interval = setInterval(fetchParkingData, 5000);
    return () => clearInterval(interval);
}, []);
//role based navigation handlers
  const handleParkingAClick = () => {
    const path = userRole === 'admin' ? '/admina' : '/parka';
    navigate(path, { state: { user: userid, currentCount: parkingA.count } });
  };

  const handleParkingBClick = () => {
    const path = userRole === 'admin' ? '/adminb' : '/parkb';
    navigate(path, { state: { user: userid, currentCount: parkingB.count } });
  };

  const progressPercentageA = (parkingA.count / parkingA.capacity) * 100;
  const progressPercentageB = (parkingB.count / parkingB.capacity) * 100;

  return (
    <>
      {/*Conditional Header Stat for Admin*/}
      <Header 
        user={userid} 
        adminStats={userRole === 'admin' ? `Total Occupied: ${parkingA.count + parkingB.count}` : null} 
      />

      <div className="Welcome-message">
        <h1>Parking Project</h1>
        <h2>Malayan Laguna</h2>
      </div>

      <div className="containers-wrapper">
        {/* Parking A */}
        <div className="container" onClick={handleParkingAClick} style={{cursor: 'pointer'}}>
          <h2>Parking A</h2>
          <div className="progress-info"><p>{parkingA.count} / {parkingA.capacity}</p></div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${progressPercentageA}%`, backgroundColor: progressPercentageA > 55 && progressPercentageA <= 85 ? 'yellow' : progressPercentageA > 85 ? 'red' : '#4caf50' }}></div>
          </div>
          <p className="status-text">{parkingA.capacity - parkingA.count} spots available</p>
        </div>

        {/* Parking B */}
        <div className="container" onClick={handleParkingBClick} style={{cursor: 'pointer'}}>
          <h2>Parking B</h2>
          <div className="progress-info"><p>{parkingB.count} / {parkingB.capacity}</p></div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${progressPercentageB}%`, backgroundColor: progressPercentageB > 55 && progressPercentageB <= 85 ? 'yellow' : progressPercentageB > 85 ? 'red' : '#4caf50' }}></div>
          </div>
          <p className="status-text">{parkingB.capacity - parkingB.count} spots available</p>
        </div>
      </div>

      {/*Admin Dashboard Button*/}
      {userRole === 'admin' && (
        <div style={{ marginTop: '20px', paddingBottom: '40px' }}>
          <button 
            className="container" 
            style={{ 
                height: 'auto', 
                width: '600px', 
                margin: '0 auto', 
                padding: '20px', 
                cursor: 'pointer',
                display: 'block'
            }}
            onClick={() => navigate('/admindash')}
          >
            <h2>View Overall Session State</h2>
            <p>Full Log Analytics & History</p>
          </button>
        </div>
      )}
      {/* Student Queue Button */}
      {userRole === 'student' && (
        <div style={{ marginTop: '20px', paddingBottom: '40px' }}>
          <button 
            className="container" 
            style={{ 
                height: 'auto', 
                width: '600px', 
                margin: '0 auto', 
                padding: '20px', 
                cursor: 'pointer',
                display: 'block',
                // border: 'none', 
                // textAlign: 'center'
            }}
          onClick={() => setIsQueueModalOpen(true)}
    >
      <h2>I Want to Queue</h2>
      <p>View How many more are on the way</p>
    </button>
    <QueueModal 
      isOpen={isQueueModalOpen} 
      onClose={() => setIsQueueModalOpen(false)} 
      user={userid}
    />
  </div>
)}
    </>
  );
}

export default Home;