import React, { useState } from 'react';
import '../../App.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Regisztrációs adatok:', formData);
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-box">
                <h1>Regisztráció</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Felhasználónév</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Add meg a felhasználóneved"
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
                            placeholder="Add meg az email címed"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Jelszó</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Add meg a jelszavad"
                            required
                        />
                    </div>
                    <button type="submit">Regisztrálok</button>
                </form>
            </div>
        </div>
    );
}
