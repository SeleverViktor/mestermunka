/* import React, { useState } from 'react';
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
                    <button type="submit">SignUp</button>
                </form>
            </div>
        </div>
    );
} */
    import React, { useState } from 'react';
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
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };
    
        // Életkor kiszámítása
        const calculateAge = (birthDate) => {
            if (!birthDate) return 0; // Ha nincs születési dátum, 0-t adunk vissza
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
    
            // Életkor ellenőrzése
            const age = calculateAge(date);
            if (age < 18) {
                setAgeError('You must be at least 18 years old to register.');
            } else {
                setAgeError(''); // Ha 18 vagy idősebb, nincs hiba
            }
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Regisztrációs adatok:', formData);
        };
    
        // A gomb disabled állapotának meghatározása
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
                                maxDate={new Date()} // Nem lehet jövőbeli dátum
                                required
                            />
                            {ageError && <p style={{ color: 'red' }}>{ageError}</p>} {/* Hibaüzenet megjelenítése */}
                        </div>
                        <button type="submit" disabled={isUnderAge}>
                            SignUp
                        </button>
                    </form>
                </div>
            </div>
        );
    }