import React, { useState } from 'react';
import '../../App.css';
import './Services.css';  // külön CSS a stílushoz

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      name: 'Futás a parkban',
      description: 'Friss levegőn, a természetben való futás minden korosztálynak ideális.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Online Jóga',
      description: 'Online jógaórák a stressz csökkentésére és a test rugalmasságának növelésére.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Főzőtanfolyam',
      description: 'Tanulj meg finom ételeket készíteni a legjobb séfek segítségével!',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="services-container">
      <h1 className="services-title">Szolgáltatásaink</h1>
      <div className="cards-container">
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => handleCardClick(service)}
          >
            <img
              src={service.image}
              alt={service.name}
              className="service-image"
            />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="service-details">
          <h2>{selectedService.name}</h2>
          <p>{selectedService.description}</p>
          <img
            src={selectedService.image}
            alt={selectedService.name}
            className="service-detail-image"
          />
        </div>
      )}
    </div>
  );
}
