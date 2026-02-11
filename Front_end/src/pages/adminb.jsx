import { useEffect, useState } from 'react';
import AdminTableLayout from './AdminTableLayout';

function AdminB() {
  const [data, setData] = useState([]);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetch('http://localhost:3001/api/sessions')
      .then(res => res.json())
      .then(allSessions => {
        
        const filtered = allSessions.filter(s => s.parking_place === 'B');
        setData(filtered);
      });
  }, []);

  return <AdminTableLayout title="Parking B Logs" data={data} user={userName} />;
}
export default AdminB;