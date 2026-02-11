import { useEffect, useState } from 'react';
import AdminTableLayout from './AdminTableLayout';

function AdminA() {
  const [data, setData] = useState([]);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetch('http://localhost:3001/api/sessions')
      .then(res => res.json())
      .then(allSessions => {
        
        const filtered = allSessions.filter(s => s.parking_place === 'A');
        setData(filtered);
      });
  }, []);

  return <AdminTableLayout title="Parking A Logs" data={data} user={userName} />;
}
export default AdminA;