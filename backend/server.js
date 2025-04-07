const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

<<<<<<< HEAD
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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
=======
app.post('/register', (req, res) => {
    const { email, username, birthDate, password } = req.body;
    // Itt helyezd el a PHP kódot, amely az adatokat az adatbázisba tölti
    // Például: callPHPFunctionToRegisterUser(email, username, birthDate, password);
    res.json({ message: 'Sikeres regisztráció!' });
>>>>>>> parent of 3ad2e0f (regisztracio(le kello tölteni a szajrekat npm)))
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
