<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
=======
/* import React, { useState } from 'react';
>>>>>>> parent of 3ad2e0f (regisztracio(le kello tölteni a szajrekat npm)))
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
                <h1>Sign Up Window</h1>
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
                    <button type="submit">SignUp</button>
                </form>
            </div>
        </div>
    );
}
 */
/* import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Importáljuk a DatePicker-t
import 'react-datepicker/dist/react-datepicker.css'; // A DatePicker alapértelmezett CSS-ének importálása
import '../../App.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        birthDate: null, // Új mező a születési dátum tárolására
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            birthDate: date,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD

        const age = calculateAge(formData.birthDate);
        const isAdult = age >= 18;

        const dataToSend = {
            email: formData.email,
            username: formData.username,
            birthDate: formData.birthDate.toISOString().split('T')[0],
            password: formData.password,
        };

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();
            if (response.ok) {
                setSubmitMessage('Sikeres regisztráció!');
                setFormData({ username: '', email: '', password: '', birthDate: null });
            } else {
                setSubmitMessage(`Hiba: ${result.message}`);
            }
        } catch (error) {
            setSubmitMessage('Hiba történt. Kérlek, próbáld újra!');
            console.error('Error submitting form:', error);
        }
=======
        console.log('Regisztrációs adatok:', formData);
>>>>>>> parent of 3ad2e0f (regisztracio(le kello tölteni a szajrekat npm)))
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-box">
                <h1>Sign Up Window</h1>
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
                            maxDate={new Date()} // Nem lehet jövőbeli dátum
                            required
                        />
                    </div>
<<<<<<< HEAD
                    <button type="submit" disabled={isUnderAge}>
                        SignUp
                    </button>
                    {submitMessage && (
                        <p style={{ color: submitMessage.includes('Hiba') ? 'red' : 'green' }}>
                            {submitMessage}
                        </p>
                    )}
                    <p className="signin-link-container">
                        Already have an account?{' '}
                        <Link to="/sign-in" className="signin-link">
                            Sign In Here!
                        </Link>
                    </p>
=======
                    <button type="submit">SignUp</button>
>>>>>>> parent of 3ad2e0f (regisztracio(le kello tölteni a szajrekat npm)))
                </form>
            </div>
        </div>
    );
<<<<<<< HEAD
}
=======
} */
    import React, { useState } from 'react';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import { Link } from 'react-router-dom'; // Link importálása
    import '../../App.css';
    
    export default function SignUp() {
        const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: '',
            birthDate: null,
        });
        const [ageError, setAgeError] = useState(''); // Hibaüzenet tárolására
        
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
    
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Regisztrációs adatok:', formData);
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
                </div>
            </div>
        );
    }
    
>>>>>>> parent of 3ad2e0f (regisztracio(le kello tölteni a szajrekat npm)))
