import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';
import mysql from 'mysql2/promise'; // MySQL kliensoldali kapcsolat
import bcrypt from 'bcryptjs'; // Jelszó hashelés kliensoldalon

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        birthDate: null,
    });
    const [ageError, setAgeError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();

    // Adatbázis konfiguráció (NEM BIZTONSÁGOS éles környezetben!)
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'partyez',
        port: 3306,
    };

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

        const formattedBirthDate = formData.birthDate
            ? formData.birthDate.toISOString().split('T')[0]
            : null;

        if (!formData.username || !formData.email || !formData.password || !formattedBirthDate) {
            setSubmitError('Minden mező kitöltése kötelező!');
            return;
        }

        let connection;
        try {
            // Jelszó hashelés kliensoldalon
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            const isAdult = 1; // Fix érték
            const consent = 1; // Fix érték

            // Adatbázis kapcsolat létrehozása
            connection = await mysql.createConnection(dbConfig);

            // SQL lekérdezés a server.js-ből átvéve
            const query = `
                INSERT INTO users (Email, Name, BirthDate, IsAdult, Consent, password, RegistrationDate, ModifiedDate)
                VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;
            const [result] = await connection.execute(query, [
                formData.email,
                formData.username,
                formattedBirthDate,
                isAdult,
                consent,
                hashedPassword,
            ]);

            if (result.affectedRows === 1) {
                alert('Sikeres regisztráció!');
                navigate('/sign-in');
            } else {
                throw new Error('Hiba az adatbázisba írás során');
            }
        } catch (error) {
            console.error('Detailed error during registration:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                setSubmitError('Ez az email már regisztrálva van!');
            } else {
                setSubmitError('Hiba: ' + error.message);
            }
        } finally {
            if (connection) {
                await connection.end();
            }
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