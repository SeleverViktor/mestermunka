import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import '../../assets/Navbar';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    birthDate: '',
    password: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          birthDate: formData.birthDate,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitMessage('Sikeres regisztráció!');
        setFormData({ email: '', username: '', birthDate: '', password: '' });
        // 2 másodperc múlva átirányít a /sign-in oldalra
        setTimeout(() => {
          navigate('/sign-in');
        }, 2000);
      } else {
        setSubmitMessage(`Hiba: ${result.message}`);
      }
    } catch (error) {
      setSubmitMessage('Hiba történt. Kérlek, próbáld újra!');
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-box">
        <h1>Sign Up!</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
          <label htmlFor="username">Fullname</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Type in your username"
              required
            />
          </div>
          <div className="input-group">
          <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Type in your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Type in your password"
              required
            />
          </div>
          <p className="signin-link-container">
            Already registered?{' '}
            <Link to="/sign-in" className="signin-link">
              Sign In Here!
            </Link>
          </p>
          <button type="submit">Sign Up</button>
          {submitMessage && (
            <p style={{ color: submitMessage.includes('Hiba') ? 'red' : 'green' }}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}