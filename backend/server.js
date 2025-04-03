/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { email, username, birthDate, password } = req.body;
    // Itt helyezd el a PHP kódot, amely az adatokat az adatbázisba tölti
    // Például: callPHPFunctionToRegisterUser(email, username, birthDate, password);
    res.json({ message: 'Sikeres regisztráció!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// MySQL kapcsolat beállítása
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // Cseréld ki a saját MySQL felhasználónevedre
    password: '', // Cseréld ki a saját MySQL jelszavadra
    database: 'partyez',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/register', async (req, res) => {
    const { email, username, birthDate, password } = req.body;

    try {
        // Jelszó hash-elése
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ellenőrizzük, hogy a felhasználó felnőtt-e
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        const isAdult = age >= 18 ? 1 : 0;

        // Adatok beszúrása a users táblába
        const query = `
            INSERT INTO users (Email, Name, BirthDate, IsAdult, Consent, password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [email, username, birthDate, isAdult, 1, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Ez az email már regisztrálva van!' });
                }
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Szerver hiba történt!' });
            }
            res.json({ message: 'Sikeres regisztráció!' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Szerver hiba történt!' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});