import { useEffect, useState } from 'react';
import AdminTableLayout from './AdminTableLayout';

function AdminDash() {
  const [data, setData] = useState([]);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    // fetch('http://localhost:3001/api/sessions')
    fetch('http://10.121.59.243:3001/api/sessions')
      .then(res => res.json())
      .then(allSessions => setData(allSessions)); // No filter needed
  }, []);

  return <AdminTableLayout title="Overall Session State" data={data} user={userName} />;
}
export default AdminDash;