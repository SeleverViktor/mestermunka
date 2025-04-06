import React from 'react';
import '../../App.css';
import '../../assets/Navbar';

export default function Products() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://via.placeholder.com/150"
          alt="Profilkép"
          className="profile-image"
        />
        <h2 className="profile-name">John Doe</h2>
        <p className="profile-bio">
          Webfejlesztő, aki imádja a Reactet és a szobanövényeket. 🌿
        </p>
      </div>
    </div>
  );
}