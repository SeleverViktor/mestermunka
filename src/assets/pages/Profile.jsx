import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import '../../assets/Navbar';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
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
        const response = await fetch(`http://localhost:5000/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Hiba történt a profil lekérdezésekor!');
        }
        const data = await response.json();
        setUserData(data);
        setSelectedImage(data.ProfilePicture || defaultImage);
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

  const handleEditImage = () => {
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    // Ha bezárjuk a modalt mentés nélkül, visszaállítjuk a kiválasztott képet az eredetire
    setSelectedImage(userData.ProfilePicture || defaultImage);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

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
        throw new Error('Hiba történt a profilkép mentésekor!');
      }

      const result = await response.json();
      alert(result.message);
      setUserData({ ...userData, ProfilePicture: selectedImage === defaultImage ? null : selectedImage });
      setShowImageModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy. MMMM d.', { locale: hu });
  };

  if (loading) {
    return (
      <div className="profile-container">
        <p className="loading-message">Loading...</p>
      </div>
    );
  }

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

  if (!userData) {
    return (
      <div className="profile-container">
        <p className="error-message">Nincs elérhető felhasználói adat.</p>
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
        />
        <h2 className="profile-name">Hi, {userData.Name}</h2>
        <p className="profile-email">Email: {userData.Email}</p>
        <p className="profile-birthdate">
          Birth Date: {formatDate(userData.BirthDate)}
        </p>
        <button className="sign-in-link" onClick={handleEditImage}>
          Change profile picture
        </button>

        {showImageModal && (
          <div className="image-modal-overlay">
            <div className="image-modal">
              <h3>Válassz profilkép</h3>
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
                    />
                  </div>
                ))}
              </div>
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

        <button className="sign-in-link" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}