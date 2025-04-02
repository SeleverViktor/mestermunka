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
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
    const { email, username, birthDate, password } = req.body;
    // Itt helyezd el a PHP kódot, amely az adatokat az adatbázisba tölti
    // Például: callPHPFunctionToRegisterUser(email, username, birthDate, password);
    res.json({ message: 'Sikeres regisztráció!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});