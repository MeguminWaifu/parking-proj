import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';

const app = express();
app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

// app.get('/api/parking-a', async (req, res) => {
//   try {
//     const data = await sql`SELECT * FROM parkinga`; 
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// app.get('/api/parking-b', async (req, res) => {
//   try {
//     const data = await sql`SELECT * FROM parkingb`; 
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// Dynamic Fetch for Parking A
app.get('/api/parking-a', async (req, res) => {
  try {
    
    const activeCount = await sql`
      SELECT COUNT(*)::int FROM sessions 
      WHERE parking_place = 'A' AND status = 'ACTIVE'
    `;

   
    const capacityData = await sql`SELECT capacity FROM parkinga LIMIT 1`;
    const capacity = capacityData[0]?.capacity || 60; 

    
    res.json([{ 
      count: activeCount[0].count, 
      capacity: capacity 
    }]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/parking-b', async (req, res) => {
  try {
    const activeCount = await sql`
      SELECT COUNT(*)::int FROM sessions 
      WHERE parking_place = 'B' AND status = 'ACTIVE'
    `;

    const capacityData = await sql`SELECT capacity FROM parkingb LIMIT 1`;
    const capacity = capacityData[0]?.capacity || 60;

    res.json([{ 
      count: activeCount[0].count, 
      capacity: capacity 
    }]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/logintest', async (req, res) => {
  try {
    const data = await sql`SELECT * FROM "users"`; 
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/login', async (req, res) => {
  const { userid, password } = req.body;
  try {
    const user = await sql`
      SELECT userid, username, role FROM "users" 
      WHERE userid = ${userid} AND password = ${password}
    `;
    
    if (user.length > 0) {
      res.json({ 
        success: true, 
        username: user[0].username, 
        userid: user[0].userid,
        role: user[0].role // <--- Critical change: send the role (admin or student)
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid ID or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/sessions', async (req, res) => {
  try {
    const data = await sql`
      SELECT 
        s.session_id,
        s.student_id, 
        u.username, 
        s.time_in, 
        s.time_out, 
        s.status, 
        s.duration, 
        s.parking_place
      FROM sessions s 
      JOIN "users" u ON s.student_id = u.userid 
      ORDER BY s.time_in DESC
    `; 
    res.json(data);
  } catch (err) {
    console.error("SQL Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/queue-count', async (req, res) => {
    try {
        
        const result = await sql`SELECT COUNT(*)::integer FROM queue`;
        res.json({ count: result[0].count });
    } catch (err) {
        console.error("Queue count error:", err);
        res.status(500).send("Database error");
    }
});
app.post('/api/join-queue', async (req, res) => {
    const { username } = req.body; 

    try {
        const result = await sql`
            INSERT INTO queue (userid) 
            SELECT userid FROM users 
            WHERE username = ${username}
            RETURNING userid;
        `;

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Joined queue!" });
    } catch (err) {
        console.error("Join Queue Error:", err);
       
        res.status(500).json({ message: "Already in queue or database error" });
    }
});
// app.listen(3001, () => console.log('🚀 Backend running on http://localhost:3001'));

const PORT = 3001; // Change this to your desired port
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Backend running on Server on ${PORT}`));
