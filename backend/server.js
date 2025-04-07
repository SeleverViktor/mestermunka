const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Adatbázis kapcsolat konfigurálása
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Éles környezetben adj meg jelszót!
    database: 'partyez',
};

// Regisztrációs végpont
app.post('/register', async (req, res) => {
    const { email, username, birthDate, password } = req.body;

    if (!email || !username || !birthDate || !password) {
        return res.status(400).json({ message: 'Minden mező kitöltése kötelező!' });
    }

    let connection;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const birth = new Date(birthDate);
        const birthDateFormatted = birth.toISOString().split('T')[0]; // YYYY-MM-DD formátum
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        const isAdult = age >= 18 ? 1 : 0;

        console.log('Adatok az adatbázisba írás előtt:', { email, username, birthDateFormatted, isAdult, hashedPassword });

        const query = `
            INSERT INTO users (Email, Name, BirthDate, IsAdult, Consent, password, RegistrationDate, ModifiedDate)
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        connection = await mysql.createConnection(dbConfig);
        await connection.beginTransaction();
        const [result] = await connection.execute(query, [email, username, birthDateFormatted, isAdult, 1, hashedPassword]);
        console.log('Beszúrt sorok száma:', result.affectedRows);

        if (result.affectedRows !== 1) {
            throw new Error('Nem sikerült a rekord beszúrása az adatbázisba');
        }

        await connection.commit();
        res.json({ message: 'Sikeres regisztráció!' });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Ez az email már regisztrálva van!' });
        }
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Szerver hiba történt!' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// Szerver indítása adatbázis kapcsolat ellenőrzésével
async function startServer() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database');
        await connection.end();

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
}

startServer();