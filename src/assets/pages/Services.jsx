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
  const [musicStyles, setMusicStyles] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(6); // Initial number of events to show
  const eventsPerPage = 6; // Number of events to load each time

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
        
        // Extract unique music styles from events
        const styles = [...new Set(data.map(event => event.Zene).filter(style => style))];
        setMusicStyles(styles);
        
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

  const handleStyleChange = (style) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
    setVisibleEvents(eventsPerPage); // Reset visible events when filter changes
  };

  const handleLoadMore = () => {
    setVisibleEvents(prev => prev + eventsPerPage);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy. MMMM d.', { locale: hu });
  };

  // Filter events based on selected music styles
  const filteredEvents = selectedStyles.length === 0 
    ? events 
    : events.filter(event => selectedStyles.includes(event.Zene));

  if (loading) {
    return <div className="services-container">Loading...</div>;
  }

  if (error) {
    return <div className="services-container">ERROR: {error}</div>;
  }

  return (
    <div className="services-container">
      <h1 className="services-title">Parties</h1>
      
      <div className="filter-container">
        <h3>Filter by Music Style</h3>
        <div className="checkbox-group">
          {musicStyles.map(style => (
            <label key={style} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => handleStyleChange(style)}
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <div className="cards-container">
        {filteredEvents.slice(0, visibleEvents).map((event) => (
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
          </div>
        ))}
      </div>

      {visibleEvents < filteredEvents.length && (
        <button
          onClick={handleLoadMore}
          className="load-more-button"
        >
          View More Parties
        </button>
      )}

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