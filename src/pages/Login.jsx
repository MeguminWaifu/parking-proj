import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home', { state: { user: username } });
  };

 return (
  <div className="login-container">
    
    <div className="login-box">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <button type="submit">Enter Parking System</button>
      </form>
    </div>
  </div>
);
}

export default Login;