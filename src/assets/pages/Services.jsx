import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import '../../App.css';

export default function Services() {
  const [events, setEvents] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rendezvenyek');
        if (!response.ok) {
          throw new Error('ERROR: cant read your data');
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
    setRegistrationStatus(null);
  };

  const handleRegister = async () => {
    if (!userId) {
      setRegistrationStatus('Please log in to register for the event.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reszvetel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          rendezvenyId: selectedService.RendezvenyID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register for the event');
      }

      setRegistrationStatus('Successfully registered for the event!');
    } catch (err) {
      setRegistrationStatus(`Error: ${err.message}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy. MMMM d.', { locale: hu });
  };

  if (loading) {
    return <div className="services-container">Loading...</div>;
  }

  if (error) {
    return <div className="services-container">ERROR: {error}</div>;
  }

  return (
    <div className="services-container">
      <h1 className="services-title">Parties</h1>
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
            <p><strong>Date:</strong> {formatDate(event.Datum)}</p>
            <p><strong>Start:</strong> {event.Start}</p>
            <p><strong>Location:</strong> {event.Helyszin}</p>
            <p><strong>Music Style:</strong> {event.Zene ? event.Zene : 'not given'}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="service-details">
          <h2>{selectedService.RNeve}</h2>
          <p>{selectedService.Leiras}</p>
          <p><strong>Date:</strong> {formatDate(selectedService.Datum)}</p>
          <p><strong>Start:</strong> {selectedService.Start}</p>
          <p><strong>Location:</strong> {selectedService.Helyszin}</p>
          <p><strong>Music Style:</strong> {selectedService.Zene ? selectedService.Zene : 'not given'}</p>
          <img
            src={selectedService.pictures || 'https://via.placeholder.com/150'}
            alt={selectedService.RNeve}
            className="service-detail-image"
          />
          <button
            onClick={handleRegister}
            className="register-button"
            disabled={!userId}
          >
            ENTER
          </button>
          {registrationStatus && (
            <p className="registration-status">{registrationStatus}</p>
          )}
        </div>
      )}
    </div>
  );
}
