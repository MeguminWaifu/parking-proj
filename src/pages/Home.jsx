
import './Home.css'
import Header from '../Header';
import { useLocation } from 'react-router-dom';
function Home() {
  const location = useLocation();
  const username=location.state?.user || "that dude";

  return (
    <>
    <Header user={username}/>
      <h1>Parking Project</h1>
      <h2>Malayan Laguna</h2>
    </>
  )
}

export default Home