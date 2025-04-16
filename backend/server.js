const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Statikus fájlok kiszolgálása a public mappából
app.use('/public', express.static(path.join(__dirname, '../public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (filePath.endsWith('.jpg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  },
}));

// Adatbázis konfiguráció környezeti változókból
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'partyez',
  port: process.env.DB_PORT || 3306,
};

// Adatbázis kapcsolat inicializálása
let db;

const initializeDatabase = async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
};

// Regisztrációs endpoint
app.post('/register', async (req, res) => {
  const { email, username, birthDate, password } = req.body;

  if (!email || !username || !birthDate || !password) {
    return res.status(400).json({ message: 'Minden mező kitöltése kötelező!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    const isAdult = age >= 18 ? 1 : 0;

    const query = `
      INSERT INTO users (Email, Name, BirthDate, IsAdult, Consent, password, ProfilePicture)
      VALUES (?, ?, ?, ?, ?, ?, NULL)
    `;
    const [result] = await db.execute(query, [email, username, birthDate, isAdult, 1, hashedPassword]);

    res.json({ message: 'Sikeres regisztráció!', userId: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Ez az email már regisztrálva van!' });
    }
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Szerver hiba történt!' });
  }
});

// Bejelentkezési endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email és jelszó megadása kötelező!' });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE Email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Hibás email vagy jelszó!' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Hibás email vagy jelszó!' });
    }

    res.json({ message: 'Sikeres bejelentkezés!', userId: user.UserID });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Szerver hiba történt!' });
  }
});

// Profil adatok lekérdezése endpoint
app.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.execute('SELECT UserID, Email, Name, BirthDate, ProfilePicture FROM users WHERE UserID = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található!' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Szerver hiba történt a profil lekérdezésekor!' });
  }
});

// Profilkép frissítése endpoint
app.post('/profile/:userId/update', async (req, res) => {
  const { userId } = req.params;
  const { profilePicture } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE users SET ProfilePicture = ? WHERE UserID = ?',
      [profilePicture || null, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található!' });
    }

    res.json({ message: 'Profilkép sikeresen frissítve!' });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Szerver hiba történt a profilkép frissítésekor!' });
  }
});

// Kijelentkezési endpoint
app.post('/logout', (req, res) => {
  try {
    res.json({ message: 'Sikeres kijelentkezés!' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Szerver hiba történt a kijelentkezéskor!' });
  }
});

// Rendezvények lekérdezése endpoint
app.get('/api/rendezvenyek', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        r.RendezvenyID,
        r.RNeve,
        r.Leiras,
        r.Datum,
        r.Helyszin,
        r.pictures,
        r.Start,
        z.StilusNev AS Zene
      FROM 
        rendezveny r
      LEFT JOIN 
        zenestilus z
      ON 
        r.ZeneId = z.ZeneStilusID
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Szerver hiba történt az események lekérdezésekor!' });
  }
});

// Felhasználó jelentkezése egy rendezvényre
app.post('/api/reszvetel', async (req, res) => {
  const { userId, rendezvenyId } = req.body;

  if (!userId || !rendezvenyId) {
    return res.status(400).json({ message: 'UserID és RendezvenyID megadása kötelező!' });
  }

  try {
    const parsedUserId = parseInt(userId);
    const parsedRendezvenyId = parseInt(rendezvenyId);

    if (isNaN(parsedUserId) || isNaN(parsedRendezvenyId)) {
      return res.status(400).json({ message: 'UserID és RendezvenyID szám típusú kell legyen!' });
    }

    const [userRows] = await db.execute('SELECT UserID FROM users WHERE UserID = ?', [parsedUserId]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található!' });
    }

    const [eventRows] = await db.execute('SELECT RendezvenyID FROM rendezveny WHERE RendezvenyID = ?', [parsedRendezvenyId]);
    if (eventRows.length === 0) {
      return res.status(404).json({ message: 'Rendezvény nem található!' });
    }

    const [existingRegistration] = await db.execute(
      'SELECT UserID FROM reszvevok WHERE UserID = ? AND RendezvenyID = ?',
      [parsedUserId, parsedRendezvenyId]
    );
    if (existingRegistration.length > 0) {
      return res.status(400).json({ message: 'Már jelentkezett erre a rendezvényre!' });
    }

    const [result] = await db.execute(
      'INSERT INTO reszvevok (UserID, RendezvenyID) VALUES (?, ?)',
      [parsedUserId, parsedRendezvenyId]
    );

    res.json({ message: 'Sikeres jelentkezés a rendezvényre!' });
  } catch (error) {
    console.error('Error during event registration:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Már jelentkezett erre a rendezvényre!' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: 'Érvénytelen UserID vagy RendezvenyID: a hivatkozott rekord nem létezik!' });
    }
    res.status(500).json({ message: 'Szerver hiba történt a jelentkezés során!', error: error.message });
  }
});

// Új endpoint: Felhasználó jelentkezéseinek lekérdezése
app.get('/api/reszvetel/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ message: 'UserID szám típusú kell legyen!' });
    }

    const [rows] = await db.execute(`
      SELECT 
        r.RendezvenyID,
        r.RNeve,
        r.Leiras,
        r.Datum,
        r.Helyszin,
        r.pictures,
        r.Start,
        z.StilusNev AS Zene
      FROM 
        reszvevok rs
      JOIN 
        rendezveny r ON rs.RendezvenyID = r.RendezvenyID
      LEFT JOIN 
        zenestilus z ON r.ZeneId = z.ZeneStilusID
      WHERE 
        rs.UserID = ?
    `, [parsedUserId]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    res.status(500).json({ message: 'Szerver hiba történt a jelentkezések lekérdezésekor!' });
  }
});

// Új endpoint: Jelentkezés törlése
app.delete('/api/reszvetel/:userId/:rendezvenyId', async (req, res) => {
  const { userId, rendezvenyId } = req.params;

  try {
    const parsedUserId = parseInt(userId);
    const parsedRendezvenyId = parseInt(rendezvenyId);

    if (isNaN(parsedUserId) || isNaN(parsedRendezvenyId)) {
      return res.status(400).json({ message: 'UserID és RendezvenyID szám típusú kell legyen!' });
    }

    const [result] = await db.execute(
      'DELETE FROM reszvevok WHERE UserID = ? AND RendezvenyID = ?',
      [parsedUserId, parsedRendezvenyId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Jelentkezés nem található!' });
    }

    res.json({ message: 'Jelentkezés sikeresen törölve!' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ message: 'Szerver hiba történt a jelentkezés törlésekor!' });
  }
});

// Szerver indítása
const startServer = async () => {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer();