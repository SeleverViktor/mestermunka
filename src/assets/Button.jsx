import React from "react";
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children,         // The content inside the button (e.g., "SIGN IN" or "SIGN UP")
    type,            // Button type (e.g., "button" or "submit")
    onClick,         // Click handler
    buttonStyle,     // Style class (e.g., "btn--outline")
    buttonSize,      // Size class (e.g., "btn--medium")
    to               // Dynamic route for the Link (e.g., "/sign-in" or "/sign-up")
}) => {
    // Ellenőrizzük, hogy a style és size helyesek-e, ha nem, akkor alapértelmezett értéket adunk nekik
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to={to} className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    );
};