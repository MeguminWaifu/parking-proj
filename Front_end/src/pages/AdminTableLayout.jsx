import Header from '../Header';
import './AdminTableLayout.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AdminTableLayout({ title, data, user }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!userRole || userRole !== 'admin') {
      navigate('/home');
    }
  }, [userRole, navigate]);

  if (!userRole || userRole !== 'admin') return null;

  const formatTime = (timeString) => {
    if (!timeString) return "--";
    try {
      return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "--";
    }
  };

  return (
    <div className="admin-page-wrapper">
      <Header user={user} adminStats="" /> 
      
      <div className="Welcome-message">
        <h1 style={{ color: 'rgb(230, 29, 39)' }}>{title}</h1>
      </div>

      <div className="table-container-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Duration</th>
              <th>Parking Lot</th>
            </tr>
          </thead>
          <tbody>
            {/* Check if data exists AND has items */}
            {data && data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  <td>{row.username || "Unknown"}</td>
                  <td>{row.student_id}</td>
                  <td>{formatTime(row.time_in)}</td>
                  <td>{row.status === 'ACTIVE' ? "INSIDE" : formatTime(row.time_out)}</td>
                  <td>
                    {row.duration 
                      ? (typeof row.duration === 'object' 
                          ? `${row.duration.minutes || 0}m ${row.duration.seconds || 0}s` 
                          : String(row.duration).split('.')[0]) 
                      : "--"}
                  </td>
                  <td>{row.parking_place || "--"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  <strong>No active or past sessions found.</strong><br/>
                  New scans will appear here automatically.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTableLayout;