import React from 'react';
import '../App.css';
import { Button } from "../assets/Button";
import './HeroSection.css';

function HeroSection(){
    return(
         <div className='hero-container'>
            <video src="/videos/video-2.mp4" autoPlay loop muted />
            <h1>Your Party begins here</h1>
            <p>what are u waiting for </p>
            <div className="hero-btns">
                <Button className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large'>
                    IM READY
                </Button>
                <Button className='btns' buttonStyle='btn--primary'
                buttonSize='btn--large'>
                  WATCH TRAILER  <i className='far
                  a-play-circle'/>
                </Button>
            </div>
        </div>
    )
}
export default HeroSection