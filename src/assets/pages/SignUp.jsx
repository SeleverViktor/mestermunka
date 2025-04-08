import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Hozzáadjuk a useNavigate-et a navigációhoz
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
    const [ageError, setAgeError] = useState('');
    const [submitError, setSubmitError] = useState(''); // Hibaüzenet a regisztrációhoz
    const navigate = useNavigate(); // Navigáció a sikeres regisztráció után

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

        // Formátumozzuk a birthDate-et YYYY-MM-DD formátumba
        const formattedBirthDate = formData.birthDate
            ? formData.birthDate.toISOString().split('T')[0]
            : null;

        const dataToSend = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            birthDate: formattedBirthDate,
        };

        try {
            const response = await fetch('http://localhost/backend/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (response.ok) {
                // Sikeres regisztráció
                console.log('Regisztrációs adatok:', formData);
                alert('Registration successful!');
                navigate('/signin'); // Átirányítás a Sign In oldalra
            } else {
                // Hiba esetén
                setSubmitError(result.message || 'Registration failed.');
            }
        } catch (error) {
            setSubmitError('Error connecting to the server: ' + error.message);
        }
    };

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
                        {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
                        <p>
                            Already have an account?{' '}
                            <Link to="/signin">Sign In here!</Link>
                        </p>
                    </div>
                    <button type="submit" disabled={isUnderAge}>
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
}