import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../../assets/Navbar'; // Importing Navbar.css for consistent styling

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [submitMessage, setSubmitMessage] = useState(''); // Üzenet a bejelentkezés eredményéről

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
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setSubmitMessage('Sikeres bejelentkezés!');
                setFormData({ email: '', password: '' }); // Űrlap ürítése
            } else {
                setSubmitMessage(`Hiba: ${result.message}`);
            }
        } catch (error) {
            setSubmitMessage('Hiba történt. Kérlek, próbáld újra!');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-box">
                <h1>Sign In!</h1>
                <form onSubmit={handleSubmit}>
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
                        Haven't registered yet?{' '}
                        <Link to="/sign-up" className="signin-link">
                            Sign Up Here!
                        </Link>
                    </p>
                    <button type="submit">Sign In</button>
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