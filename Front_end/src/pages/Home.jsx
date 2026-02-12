
import './Home.css';
import Header from '../Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QueueModal from '../Modal/QueueModal';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  
  // Retrieve the User Data stored during login
  // const userid = location.state?.displayName || "User";
  const userid = String(location.state?.displayName || localStorage.getItem('userName') || "User");
  const userRole = localStorage.getItem('userRole') || "student"; // Use localStorage for persistence

  const [parkingA, setParkingA] = useState({ count: 0, capacity: 1 });
  const [parkingB, setParkingB] = useState({ count: 0, capacity: 1 });

  useEffect(() => {
  const fetchParkingData = async () => {
    try {
      // Fetch Parking A
      // const resA = await fetch('http://localhost:3001/api/parking-a');
      const resA = await fetch('http://10.121.59.243:3001/api/parking-a');
      const dataA = await resA.json();
      if (dataA && dataA.length > 0) {
        setParkingA({ count: dataA[0].count, capacity: dataA[0].capacity });
      }

      // Fetch Parking B
      // const resB = await fetch('http://localhost:3001/api/parking-b');
      const resB = await fetch('http://10.121.59.243:3001/api/parking-b');
      const dataB = await resB.json();
      if (dataB && dataB.length > 0) {
        setParkingB({ count: dataB[0].count, capacity: dataB[0].capacity });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchParkingData();
  const interval = setInterval(fetchParkingData, 5000); // 5 seconds
  return () => clearInterval(interval);
}, []);

  // Navigation Logic based on Role
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
            <div className="progress-bar" style={{ width: `${progressPercentageA}%`, backgroundColor: progressPercentageA > 90 ? 'red' : '#4caf50' }}></div>
          </div>
          <p className="status-text">{parkingA.capacity - parkingA.count} spots available</p>
        </div>

        {/* Parking B */}
        <div className="container" onClick={handleParkingBClick} style={{cursor: 'pointer'}}>
          <h2>Parking B</h2>
          <div className="progress-info"><p>{parkingB.count} / {parkingB.capacity}</p></div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${progressPercentageB}%`, backgroundColor: progressPercentageB > 90 ? 'red' : '#4caf50' }}></div>
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
                // border: 'none', // Optional: removes default button border
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