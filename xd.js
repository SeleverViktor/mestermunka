document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const recommendedEvents = document.querySelector('.recommended-events');

    // Összes kártya 
    const allEvents = [
        { title: "Buli A", location: "Budapest", date: "2025-02-10" },
        { title: "Buli B", location: "Szeged", date: "2025-02-12" },
        { title: "Buli C", location: "Pécs", date: "2025-02-15" },
        { title: "Buli D", location: "Debrecen", date: "2025-02-17" },
        { title: "Buli E", location: "Miskolc", date: "2025-02-20" },
        { title: "Buli F", location: "Győr", date: "2025-02-25" },
        { title: "Buli G", location: "Veszprém", date: "2025-02-27" },
        { title: "Buli H", location: "Kecskemét", date: "2025-03-01" },
        { title: "Buli I", location: "Nyíregyháza", date: "2025-03-05" },
        { title: "Buli J", location: "Siófok", date: "2025-03-07" },
        { title: "Buli K", location: "Szombathely", date: "2025-03-10" },
        { title: "Buli L", location: "Békéscsaba", date: "2025-03-12" },
        { title: "Buli M", location: "Kaposvár", date: "2025-03-15" },
        { title: "Buli N", location: "Szolnok", date: "2025-03-18" },
        { title: "Buli O", location: "Zalaegerszeg", date: "2025-03-20" },
        { title: "Buli P", location: "Váci", date: "2025-03-22" },
        { title: "Buli Q", location: "Szeged", date: "2025-03-24" },
        { title: "Buli R", location: "Pécs", date: "2025-03-26" },
        { title: "Buli S", location: "Eger", date: "2025-03-28" },
        { title: "Buli T", location: "Nagykanizsa", date: "2025-03-30" },
        { title: "Buli U", location: "Baja", date: "2025-04-02" },
        { title: "Buli V", location: "Kőszeg", date: "2025-04-05" },
        { title: "Buli W", location: "Hódmezővásárhely", date: "2025-04-07" },
        { title: "Buli X", location: "Jászberény", date: "2025-04-10" },
        { title: "Buli Y", location: "Salgótarján", date: "2025-04-12" },
        { title: "Buli Z", location: "Szentendre", date: "2025-04-15" },
        { title: "Buli AA", location: "Mór", date: "2025-04-18" },
        { title: "Buli AB", location: "Budaörs", date: "2025-04-20" },
        { title: "Buli AC", location: "Várpalota", date: "2025-04-22" },
        { title: "Buli AD", location: "Komárom", date: "2025-04-25" },
        { title: "Buli AE", location: "Várda", date: "2025-04-28" },
    ];

    // Kezdetben csak 6 kártya látszik
    let displayedEvents = 6;

    // Kártyák hozzáadása a DOM-hoz
    function loadEvents(eventsCount) {
        recommendedEvents.innerHTML = ''; // Ürítjük a div-et, hogy ne legyen duplikáció
        for (let i = 0; i < eventsCount; i++) {
            const event = allEvents[i];
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <p>Helyszín: ${event.location}</p>
                <p>Dátum: ${event.date}</p>
                <a href="event_detail.html">Tovább a buli részleteihez</a>
            `;
            recommendedEvents.appendChild(eventCard);
        }
    }

    // Kezdeti 6 kártya betöltése
    loadEvents(displayedEvents);

    // További kártyák betöltése a gomb megnyomására
    loadMoreBtn.addEventListener('click', function () {
        displayedEvents = Math.min(displayedEvents + 6, allEvents.length); // Csak addig töltsön, amíg vannak események
        loadEvents(displayedEvents);
        if (displayedEvents === allEvents.length) {
            loadMoreBtn.style.display = 'none'; // Ha nincs több esemény, eltüntetjük a gombot
        }
    });
});
