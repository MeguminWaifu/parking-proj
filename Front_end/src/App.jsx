import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ParkA from './pages/ParkA';
import ParkB from './pages/ParkB';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        
        
        <Route path="/home" element={<Home />} />

        <Route path="/parka" element={<ParkA />} />
        <Route path="/parkb" element={<ParkB />} />
      </Routes>
    </Router>
  );
}

export default App;