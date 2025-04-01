import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../../assets/Navbar'; // Importing Navbar.css for consistent styling

export default function SignIn() {
    const [formData, setFormData] = useState({
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
        console.log('Bejelentkezési adatok:', formData);
    };

    return (
        <div className="sign-up-container"> {/* Reusing the same container class as SignUp */}
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
                    {/* Link to SignUp page for users without an account */}
                    <p className="signin-link-container">
                        Don’t have an account?{' '}
                        <Link to="/sign-up" className="signin-link">
                            Sign Up Here!
                        </Link>
                    </p>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}