import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ParkA from './pages/ParkA';
import ParkB from './pages/ParkB';

function App() {
  return (
    <Router>
      <Routes>
        {/* Setting path="/" makes this the first page users see */}
        <Route path="/" element={<Login />} />
        
        {/* You can move the main content to /dashboard or /home */}
        <Route path="/home" element={<Home />} />

        <Route path="/parka" element={<ParkA />} />
        <Route path="/parkb" element={<ParkB />} />
      </Routes>
    </Router>
  );
}

export default App;