import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../assets/Navbar';

export default function Services() {
  const [events, setEvents] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API-ból adatok lekérése useEffect-tel
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Feltételezett API endpoint, amely a rendezvényeket adja vissza
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
  }, []); // Üres dependency array, csak egyszer fut le komponens betöltésekor

  const handleCardClick = (event) => {
    setSelectedService(event);
  };

  // Betöltés és hiba kezelése
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
            <p><strong>Dátum:</strong> {event.Datum}</p>
            <p><strong>Kezdet:</strong> {event.Start}</p>
            <p><strong>Helyszín:</strong> {event.Helyszin}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="service-details">
          <h2>{selectedService.RNeve}</h2>
          <p>{selectedService.Leiras}</p>
          <p><strong>Dátum:</strong> {selectedService.Datum}</p>
          <p><strong>Kezdet:</strong> {selectedService.Start}</p>
          <p><strong>Helyszín:</strong> {selectedService.Helyszin}</p>
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