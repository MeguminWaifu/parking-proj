
import './Home.css'
import Header from '../Header';
import { useLocation } from 'react-router-dom';
function Home() {
  const location = useLocation();
  const username=location.state?.user || "that dude";
  const password=location.state?.pass || "";
  const correctPassword = "1234"; // Password to verify against
  const isPasswordValid = password === correctPassword;

  return (
    <>
    <Header user={username}/>
    <div className="Welcome-message">
      <h1>Parking Project</h1>
      <h2>Malayan Laguna</h2>
      <p>Password Valid: {isPasswordValid ? "Yes" : "No"}</p>
      </div>
    </>
  )
}

export default Home