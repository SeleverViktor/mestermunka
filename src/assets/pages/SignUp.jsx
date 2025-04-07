import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        birthDate: null,
    });
    const [ageError, setAgeError] = useState(''); // Hibaüzenet tárolására
    const [serverMessage, setServerMessage] = useState(''); // Szerver üzenet tárolására

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Életkor kiszámítása
    const calculateAge = (birthDate) => {
        if (!birthDate) return 0;
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            birthDate: date,
        }));

        const age = calculateAge(date);
        if (age < 18) {
            setAgeError('You must be at least 18 years old to register.');
        } else {
            setAgeError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Regisztrációs adatok:', formData);

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`Request failed with status code ${response.status}`);
            }
            const data = await response.json();
            setServerMessage(data.message);
        } catch (error) {
            console.error('Error during registration:', error);
            setServerMessage('Szerver hiba történt!');
        }
    };

    // Gomb disabled állapotának meghatározása
    const isUnderAge = formData.birthDate ? calculateAge(formData.birthDate) < 18 : true;

    return (
        <div className="sign-up-container">
            <div className="sign-up-box">
                <h1>Sign Up!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
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
                    <div className="input-group">
                        <label htmlFor="birthDate">Birth Date</label>
                        <DatePicker
                            id="birthDate"
                            selected={formData.birthDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="Select your birth date"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            maxDate={new Date()}
                            required
                        />
                        {ageError && <p style={{ color: 'red' }}>{ageError}</p>}
                    </div>
                    {/* Itt helyezzük el a "Already have an account?" linket */}
                    <p className="signin-link-container">
                        Already have an account?{' '}
                        <Link to="/sign-in" className="signin-link">
                            Sign In Here!
                        </Link>
                    </p>
                    <button type="submit" disabled={isUnderAge}>
                        SignUp
                    </button>
                </form>
                {serverMessage && <p>{serverMessage}</p>}
            </div>
        </div>
    );
}