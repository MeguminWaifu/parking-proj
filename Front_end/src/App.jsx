import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ParkA from './pages/ParkA';
import ParkB from './pages/ParkB';
import AdminA from './pages/admina';
import AdminB from './pages/adminb';
import AdminDash from './pages/AdminDash';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        
        {/* Shared Route */}
        <Route path="/home" element={<Home />} />

        {/* Student-Specific Routes */}
        <Route path="/parka" element={<ParkA />} />
        <Route path="/parkb" element={<ParkB />} />

        {/* Admin-Specific Routes */}
        <Route path="/admina" element={<AdminA />} />
        <Route path="/adminb" element={<AdminB />} />
        <Route path="/admindash" element={<AdminDash />} />
      </Routes>
    </Router>
  );
}

export default App;