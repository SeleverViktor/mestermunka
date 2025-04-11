import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // Importáljuk a format függvényt
import { hu } from 'date-fns/locale'; // Magyar lokalizáció
import '../../App.css';
import '../../assets/Navbar';

export default function Services() {
  const [events, setEvents] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rendezvenyek');
        if (!response.ok) {
          throw new Error('Hiba történt az adatok lekérése során');
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (event) => {
    setSelectedService(event);
  };

  // Dátum formázó függvény date-fns használatával
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy. MMMM d.', { locale: hu }); // Pl. 2025. április 5.
  };

  if (loading) {
    return <div className="services-container">Betöltés...</div>;
  }

  if (error) {
    return <div className="services-container">Hiba: {error}</div>;
  }

  return (
    <div className="services-container">
      <h1 className="services-title">Rendezvényeink</h1>
      <div className="cards-container">
        {events.map((event) => (
          <div
            key={event.RendezvenyID}
            className="service-card"
            onClick={() => handleCardClick(event)}
          >
            <img
              src={event.pictures || 'https://via.placeholder.com/150'}
              alt={event.RNeve}
              className="service-image"
            />
            <h3>{event.RNeve}</h3>
            <p><strong>Dátum:</strong> {formatDate(event.Datum)}</p>
            <p><strong>Kezdet:</strong> {event.Start}</p>
            <p><strong>Helyszín:</strong> {event.Helyszin}</p>
            <p>
              <strong>Zene Stílus:</strong>{' '}
              {event.Zene ? event.Zene : 'Nincs megadva'}
            </p>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="service-details">
          <h2>{selectedService.RNeve}</h2>
          <p>{selectedService.Leiras}</p>
          <p><strong>Dátum:</strong> {formatDate(selectedService.Datum)}</p>
          <p><strong>Kezdet:</strong> {selectedService.Start}</p>
          <p><strong>Helyszín:</strong> {selectedService.Helyszin}</p>
          <p>
            <strong>Zene Stílus:</strong>{' '}
            {selectedService.Zene ? selectedService.Zene : 'Nincs megadva'}
          </p>
          <img
            src={selectedService.pictures || 'https://via.placeholder.com/150'}
            alt={selectedService.RNeve}
            className="service-detail-image"
          />
        </div>
      )}
    </div>
  );
}