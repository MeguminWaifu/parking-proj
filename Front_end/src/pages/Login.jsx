import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';
import mclLogo from '../assets/image asset/mcl sign.jpg';

function Login() {
 
  const [userid, setUserid] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    // const response = await fetch('http://localhost:3001/api/login', {
    const response = await fetch('http://10.121.59.243:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid, password }), 
    });

    const data = await response.json();

    if (data.success) {
      // Save user info to local storage
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.username);

      // Route based on role
      if (data.role === 'admin') {
        navigate('/home', { state: { displayName: data.username } });
      } else {
        navigate('/home', { state: { displayName: data.username } });
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={mclLogo} alt="MCL Logo" className="login-logo" />
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="User ID"
            value={userid} 
            onChange={(e) => setUserid(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Enter Parking System</button>
        </form>
      </div>
    </div>
  );
}

export default Login;