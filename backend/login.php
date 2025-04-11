const jwt = require('jsonwebtoken');

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

    // JWT token generálása
    const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.json({ message: 'Sikeres bejelentkezés!', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Szerver hiba történt!' });
  }
});