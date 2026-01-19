
import './Home.css'
import Header from '../Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const username=location.state?.user || "that dude";
  const password=location.state?.pass || "";
  const correctPassword = "1234"; // Password to verify against
  const isPasswordValid = password === correctPassword;

  const [parkingA, setParkingA] = useState(0);
  const [parkingB, setParkingB] = useState(0);
  const maxCapacity = 60;

  const handleParkingAClick = () => {
    navigate('/parka', { state: { user: username, parkingCount: parkingA } });
  };

  const handleParkingBClick = () => {
    navigate('/parkb', { state: { user: username, parkingCount: parkingB } });
  };

  const incrementParkingA = () => {
    setParkingA(prev => (prev < maxCapacity ? prev + 1 : prev));
  };

  const decrementParkingA = () => {
    setParkingA(prev => (prev > 0 ? prev - 1 : prev));
  };

  const incrementParkingB = () => {
    setParkingB(prev => (prev < maxCapacity ? prev + 1 : prev));
  };

  const decrementParkingB = () => {
    setParkingB(prev => (prev > 0 ? prev - 1 : prev));
  };

  const progressPercentageA = (parkingA / maxCapacity) * 100;
  const progressPercentageB = (parkingB / maxCapacity) * 100;

  return (
    <>
    <Header user={username}/>
    <div className="Welcome-message">
      <h1>Parking Project</h1>
      <h2>Malayan Laguna</h2>
      <p>Password Valid: {isPasswordValid ? "Yes" : "No"}</p>
    </div>
    <div className="containers-wrapper">
      <div className="container left-container" onClick={handleParkingAClick} style={{cursor: 'pointer'}}>
        <h2>Parking A</h2>
        <div className="progress-info">
          <p>{parkingA} / {maxCapacity}</p>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar" style={{width: `${progressPercentageA}%`}}></div>
        </div>
        <div className="button-group" onClick={(e) => e.stopPropagation()}>
          <button onClick={incrementParkingA} className="increment-btn">+</button>
          <button onClick={decrementParkingA} className="decrement-btn">-</button>
        </div>
      </div>
      <div className="container right-container" onClick={handleParkingBClick} style={{cursor: 'pointer'}}>
        <h2>Parking B</h2>
        <div className="progress-info">
          <p>{parkingB} / {maxCapacity}</p>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar" style={{width: `${progressPercentageB}%`}}></div>
        </div>
        <div className="button-group" onClick={(e) => e.stopPropagation()}>
          <button onClick={incrementParkingB} className="increment-btn">+</button>
          <button onClick={decrementParkingB} className="decrement-btn">-</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home