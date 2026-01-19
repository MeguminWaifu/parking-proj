import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';
import mclLogo from '../assets/image\ asset/mcl\ sign.jpg';

function Login() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home', { state: { user: username, pass: password } });
  };

 return (
  <div className="login-container">
    
    <div className="login-box">
      <img src={mclLogo} alt="MCL Logo" className="login-logo" />
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
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