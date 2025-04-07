const mysql = require('mysql2/promise'); // mysql2/promise használata

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'partyez',
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
        const connection = await db; // Kapcsolat létrehozása
        await connection.execute(query, [email, username, birthDate, isAdult, 1, hashedPassword]);
        res.json({ message: 'Sikeres regisztráció!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Ez az email már regisztrálva van!' });
        }
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Szerver hiba történt!' });
    }
});