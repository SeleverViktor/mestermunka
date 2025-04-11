import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../assets/Navbar';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); // userId lekérése
      if (!userId) {
        setError('Kérlek, jelentkezz be a profil megtekintéséhez!');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Hiba történt a profil lekérdezésekor!');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <div className="profile-container">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <p>Betöltés...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://via.placeholder.com/150"
          alt="Profilkép"
          className="profile-image"
        />
        <h2 className="profile-name">{userData.Name}</h2>
        <p className="profile-email">Email: {userData.Email}</p>
        <p className="profile-birthdate">Születési dátum: {userData.BirthDate}</p>
      </div>
    </div>
  );
}