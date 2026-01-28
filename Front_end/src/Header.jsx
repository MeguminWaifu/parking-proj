
import './Header.css'
import { useNavigate } from 'react-router-dom';

// name="that dude"
function Header(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="main-header">
      <button className="logout-btn" onClick={handleLogout} title="Logout">
        ← Logout
      </button>
      <h1>Welcome {props.user}</h1>
      <button className="logout-btn back-btn" onClick={handleBack} title="Back">
        Back
      </button>
    </header>
  );
}
export default Header;
