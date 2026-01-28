import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';

const app = express();
app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

app.get('/api/parking-a', async (req, res) => {
  try {
    const data = await sql`SELECT * FROM parkinga`; 
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/parking-b', async (req, res) => {
  try {
    const data = await sql`SELECT * FROM parkingb`; 
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/logintest', async (req, res) => {
  try {
    const data = await sql`SELECT * FROM "user"`; 
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/login', async (req, res) => {
  const { userid, password } = req.body;
  try {
    const user = await sql`
      SELECT * FROM "user" 
      WHERE userid = ${userid} AND password = ${password}
    `;
    
    if (user.length > 0) {
      
      res.json({ 
        success: true, 
        username: user[0].username, 
        userid: user[0].userid 
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid ID or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('🚀 Backend running on http://localhost:3001'));