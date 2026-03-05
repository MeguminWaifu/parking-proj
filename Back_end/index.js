import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// app.use(cors());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST']
}));
app.use(express.json());


app.use(express.static(path.resolve(__dirname, 'dist')));


const sql = neon(process.env.DATABASE_URL);

async function testDb() {
  try {
    await sql`SELECT 1`;
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}
testDb();

app.get('/api/parking/:place', async (req, res) => {
    const { place } = req.params;
    const upperPlace = place.toUpperCase();

    try {
        const lotInfo = await sql`
            SELECT capacity, count FROM parking_lots 
            WHERE parking_place = ${upperPlace} LIMIT 1
        `;

        if (lotInfo.length === 0) {
            return res.status(404).json({ error: "Parking lot not found" });
        }

        res.json({ 
            count: lotInfo[0].count, 
            capacity: lotInfo[0].capacity 
        });
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
//MOBILE APP SCANNER ENDPOINT
app.post('/api/verify', async (req, res) => {
    const { token, location } = req.body;

    try {
        const user = await sql`SELECT userid, username FROM "users" WHERE qr_code = ${token}`;
        if (user.length === 0) return res.json({ status: "denied", message: "User not found" });

        const { userid, username } = user[0];
        const activeSession = await sql`SELECT session_id FROM sessions WHERE student_id = ${userid} AND status = 'ACTIVE'`;

        if (activeSession.length > 0) {
            // EXIT PROCESS
            await sql`UPDATE sessions SET time_out = CURRENT_TIMESTAMP, status = 'COMPLETED', duration = (CURRENT_TIMESTAMP - time_in) WHERE session_id = ${activeSession[0].session_id}`;
            
            await sql`UPDATE parking_lots SET count = count - 1 WHERE parking_place = ${location}`;
            
            return res.json({ status: "success", username, action: "EXITED" });
        } else {
            const lot = await sql`SELECT capacity, count FROM parking_lots WHERE parking_place = ${location}`;
            if (lot[0].count >= lot[0].capacity) {
                return res.json({ status: "denied", message: "Parking is Full!", action: "FULL" });
            }
            // ENTRY PROCESS
            await sql`INSERT INTO sessions (student_id, time_in, status, parking_place) VALUES (${userid}, CURRENT_TIMESTAMP, 'ACTIVE', ${location})`;
            await sql`DELETE FROM queue WHERE userid = ${userid}`;
            
            await sql`UPDATE parking_lots SET count = count + 1 WHERE parking_place = ${location}`;
            
            return res.json({ status: "success", username, action: "ENTERED" });
        }
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});
app.get('/*splat', (req, res) => {
  const indexPath = path.resolve(__dirname, 'dist', 'index.html');
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Failed to send index.html:", err.message);
      res.status(500).send("The server couldn't find the frontend files. Check the 'dist' folder inside Back_end.");
    }
  });
});
// app.listen(3001, () => console.log('🚀 Backend running on http://localhost:3001'));

// const PORT = 3001; // Change this to your desired port
const PORT =3001;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Backend running on Server on ${PORT}`));
