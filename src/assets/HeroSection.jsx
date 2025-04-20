import React from 'react';
import '../App.css';
import { Button } from "../assets/Button"; 
import { Link } from 'react-router-dom'; // Ne felejtsd el importálni a Link komponenst!
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src="/videos/video-2.mp4" autoPlay loop muted />
      <h1>Your Party begins here</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        {/* Link komponenst használunk, hogy átirányítsa a Services szekcióhoz */}
        <Link to="#services">
          <Button 
            className='btns' 
            buttonStyle='btn--outline' 
            buttonSize='btn--large'
            to='/services'
            >
            I'M READY
          </Button>
        </Link>
        <Button 
          className='btns' 
          buttonStyle='btn--primary' 
          buttonSize='btn--large'
          to='https://www.google.com/search?q=youtube&oq=youtube&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIGCAQQRRg8MgYIBRAuGEDSAQgyOTc4ajBqNKgCALACAA&sourceid=chrome&ie=UTF-8'
         
          >
          WATCH TRAILER <i className='far fa-play-circle' />

        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
