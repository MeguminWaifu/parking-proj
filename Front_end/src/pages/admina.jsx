import { useEffect, useState } from 'react';
import AdminTableLayout from './AdminTableLayout';
import { API_BASE } from '../config';

function AdminA() {
  const [data, setData] = useState([]);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    // fetch('http://localhost:3001/api/sessions')
    // fetch('http://10.121.59.243:3001/api/sessions')
    fetch(`${API_BASE}/sessions`)
      .then(res => res.json())
      .then(allSessions => {
        
        const filtered = allSessions.filter(s => s.parking_place === 'A');
        setData(filtered);
      });
  }, []);

  return <AdminTableLayout title="Parking A Logs" data={data} user={userName} />;
}
export default AdminA;