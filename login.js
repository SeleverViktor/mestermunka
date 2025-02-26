document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Megakadályozza az űrlap tényleges elküldését

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Egyszerű érvényesítés
        if (email && password) {
            alert('Sikeres bejelentkezés!');
            // Itt egy API hívást végezhetsz, hogy ellenőrizd a felhasználó adatait
            form.reset(); // Törli az űrlapot
        } else {
            alert('Minden mezőt ki kell tölteni!');
        }
    });
});
