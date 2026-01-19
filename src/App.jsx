import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Setting path="/" makes this the first page users see */}
        <Route path="/" element={<Login />} />
        
        {/* You can move the main content to /dashboard or /home */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;