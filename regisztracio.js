document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Megakadályozza az űrlap tényleges elküldését

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const birthdate = document.getElementById('birthdate').value;

        // Jelszó ellenőrzése
        if (password !== confirmPassword) {
            alert('A két jelszó nem egyezik meg!');
            return;
        }

        // Születési dátum validálása: 18 éves korhatár
        const birthDate = new Date(birthdate);
        const age = calculateAge(birthDate);

        if (age < 18) {
            alert('Legalább 18 évesnek kell lenned a regisztrációhoz.');
            return;
        }

        // Egyszerű érvényesítés
        if (name && email && password && birthdate) {
            alert('Sikeres regisztráció! Üdvözlünk!');
            // Itt később egy API hívást is végezhetsz, hogy eltárold az adatokat
            form.reset(); // Törli az űrlapot
        } else {
            alert('Minden mezőt ki kell tölteni!');
        }
    });

    // Kor kiszámítása
    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth();
        if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
});
