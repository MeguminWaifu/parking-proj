import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header(props) {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      {/* LEFT: Logout */}
      <div className="header-left">
        <button className="logout-btn" onClick={() => navigate('/')}>
          ← Logout
        </button>
      </div>

      {/* CENTER: Title and Admin Stats */}
      <div className="header-center">
        <h1>Welcome {props.user}</h1>
        {props.adminStats && (
          <div className="admin-stat-badge">
            {props.adminStats}
          </div>
        )}
      </div>

      {/* RIGHT: Back Button */}
      <div className="header-right">
        <button className="logout-btn back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </header>
  );
}
export default Header;