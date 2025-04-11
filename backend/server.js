const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Promise-alapú MySQL
const bcrypt = require('bcrypt');
require('dotenv').config(); // Környezeti változók betöltése

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

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
    process.exit(1); // Kilépés, ha nem sikerül a csatlakozás
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
      INSERT INTO users (Email, Name, BirthDate, IsAdult, Consent, password)
      VALUES (?, ?, ?, ?, ?, ?)
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
    // Felhasználó keresése email alapján
    const [rows] = await db.execute('SELECT * FROM users WHERE Email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Hibás email vagy jelszó!' });
    }

    const user = rows[0];

    // Jelszó ellenőrzése
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Hibás email vagy jelszó!' });
    }

    // Sikeres bejelentkezés
    res.json({ message: 'Sikeres bejelentkezés!', userId: user.UserID });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Szerver hiba történt!' });
  }
});

// Rendezvények lekérdezése endpoint
app.get('/api/rendezvenyek', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM rendezveny');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Szerver hiba történt az események lekérdezésekor!' });
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