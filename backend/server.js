const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Adatbázis kapcsolat beállítása
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // A phpMyAdmin felhasználóneved (általában root helyi környezetben)
  password: '', // A phpMyAdmin jelszavad (ha nincs, hagyd üresen)
  database: 'partyez' // Az adatbázis neve, amit phpMyAdminban létrehoztál
});

// Kapcsolódás az adatbázishoz
db.connect((err) => {
  if (err) {
    console.error('Hiba az adatbázis csatlakozás során:', err);
    return;
  }
  console.log('Sikeresen csatlakoztál az adatbázishoz!');
});

// Példa API végpont: Összes felhasználó lekérdezése (feltételezem, hogy van egy "users" táblád)
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users'; // Cseréld ki a tábla nevét, ha más
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Szerver indítása
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`A szerver fut a http://localhost:${PORT} címen`);
});

  