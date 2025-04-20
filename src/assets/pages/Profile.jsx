import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import '../../assets/Navbar';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [registrations, setRegistrations] = useState([]); // Jelentkezések állapota
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showRegistrations, setShowRegistrations] = useState(false); // Jelentkezések láthatóságának állapota
  const [selectedImage, setSelectedImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Statikus képlista a public/images mappából
  const availableImages = [
    '/public/images/blue.jpg',
    '/public/images/gray.jpg',
    '/public/images/green.jpg',
    '/public/images/yellow.jpg',
    '/public/images/red.jpg',
    '/public/images/purple.jpg',
  ];
  const defaultImage = '/public/images/green.jpg';
  const fallbackImage = '/public/images/green.jpg';

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('You have to log in first!');
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        // Felhasználói adatok lekérése
        const profileResponse = await fetch(`http://localhost:5000/profile/${userId}`);
        if (!profileResponse.ok) {
          throw new Error('Error while making your profile');
        }
        const profileData = await profileResponse.json();
        setUserData(profileData);
        setSelectedImage(profileData.ProfilePicture || defaultImage);

        // Jelentkezések lekérése
        const registrationsResponse = await fetch(`http://localhost:5000/api/reszvetel/${userId}`);
        if (!registrationsResponse.ok) {
          throw new Error('Error while loading the logins');
        }
        const registrationsData = await registrationsResponse.json();
        setRegistrations(registrationsData);

        setError('');
      } catch (err) {
        setError(err.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Kijelentkezés kezelése
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.removeItem('userId');
      navigate('/sign-in');
    } catch (error) {
      console.error('Error during logout:', error);
      localStorage.removeItem('userId');
      navigate('/sign-in');
    }
  };

  // Profilkép szerkesztés modal megnyitása
  const handleEditImage = () => {
    setShowImageModal(true);
    setSuccessMessage('');
  };

  // Modal bezárása
  const handleCloseModal = () => {
    setShowImageModal(false);
    setSuccessMessage('');
    setSelectedImage(userData?.ProfilePicture || defaultImage);
  };

  // Kép kiválasztása a modalban
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  // Profilkép mentése
  const handleSaveImage = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5000/profile/${userId}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilePicture: selectedImage === defaultImage ? null : selectedImage,
        }),
      });

      if (!response.ok) {
        throw new Error('Error while changing profile picture');
      }

      const result = await response.json();
      setSuccessMessage(result.message);
      setUserData({ ...userData, ProfilePicture: selectedImage === defaultImage ? null : selectedImage });

      setTimeout(() => {
        setSuccessMessage('');
        setShowImageModal(false);
      }, 1500);
    } catch (error) {
      setSuccessMessage(error.message);
      setTimeout(() => {
        setSuccessMessage('');
      }, 1500);
    }
  };

  // Jelentkezés törlése
  const handleDeleteRegistration = async (rendezvenyId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5000/api/reszvetel/${userId}/${rendezvenyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error while entering to a party');
      }

      const result = await response.json();
      setSuccessMessage(result.message);

      // Frissítjük a jelentkezések listáját a törlés után
      setRegistrations(registrations.filter(reg => reg.RendezvenyID !== rendezvenyId));

      setTimeout(() => {
        setSuccessMessage('');
      }, 1500);
    } catch (error) {
      setSuccessMessage(error.message);
      setTimeout(() => {
        setSuccessMessage('');
      }, 1500);
    }
  };

  // Jelentkezések szekció toggler
  const toggleRegistrations = () => {
    setShowRegistrations(!showRegistrations);
  };

  // Kép betöltési hiba kezelése
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  // Dátum formázása
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'invalid date';
      }
      return format(date, 'yyyy. MMMM d.', { locale: hu });
    } catch {
      return 'invalid date';
    }
  };

  // Betöltés állapot
  if (loading) {
    return (
      <div className="profile-container">
        <p className="loading-message">Loading...</p>
      </div>
    );
  }

  // Hibaüzenet megjelenítése
  if (error) {
    return (
      <div className="profile-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <Link to="/sign-in" className="sign-in-link">
            Sign in HERE!
          </Link>
        </div>
      </div>
    );
  }

  // Ha nincs felhasználói adat
  if (!userData) {
    return (
      <div className="profile-container">
        <p className="error-message">Cannot find valid user data</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={userData.ProfilePicture || defaultImage}
          alt="Profilepicture"
          className="profile-image"
          onError={handleImageError}
        />
        <h2 className="profile-name">Hi, {userData.Name || 'Felhasználó'}</h2>
        <p className="profile-email">Email: {userData.Email || 'Nincs email'}</p>
        <p className="profile-birthdate">
          Birth Date: {formatDate(userData.BirthDate)}
        </p>
        <button className="sign-in-link" onClick={handleEditImage}>
          Change profile picture
        </button>

        {showImageModal && (
          <div className="image-modal-overlay">
            <div className="image-modal">
              <h3>Choose a profile picture</h3>
              <div className="image-grid">
                {availableImages.map((image) => (
                  <div
                    key={image}
                    className={`thumbnail-container ${selectedImage === image ? 'selected' : ''}`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <img
                      src={image}
                      alt={image.split('/').pop()}
                      className="thumbnail"
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              <div className="modal-buttons">
                <button className="sign-in-link" onClick={handleCloseModal}>
                  Close
                </button>
                <button className="sign-in-link" onClick={handleSaveImage}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gomb a jelentkezések megjelenítéséhez */}
        <button className="sign-in-link" onClick={toggleRegistrations}>
          {showRegistrations ? 'Unshow me my parties' : 'Show me my parties'}
        </button>

        {/* Jelentkezések szekció */}
        {showRegistrations && (
          <div className="registrations-section">
            <h3>My parties</h3>
            {registrations.length === 0 ? (
              <p className="no-registrations">You did not enter any parties yet</p>
            ) : (
              <ul className="registrations-list">
                {registrations.map((registration) => (
                  <li key={registration.RendezvenyID} className="registration-item">
                    <div className="registration-details">
                      <h4>{registration.RNeve}</h4>
                      <p>Date: {formatDate(registration.Datum)}</p>
                      <p>Location: {registration.Helyszin}</p>
                      <p>Music: {registration.Zene || 'not given'}</p>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteRegistration(registration.RendezvenyID)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}

        <button className="sign-in-link" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}