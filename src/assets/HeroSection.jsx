import React from 'react';
import '../App.css';
import {Button} from '/Button';
import '/HeroSection.css';

function HeroSection(){
    return(
         <div className='hero-container'>
            <video src="/videos/video-2.mp4" autoPlay loop muted />
            <h1>Adventure awaits</h1>
            <p>what are u waiting for </p>
            <div classNmae="hero-btns">
                <Button className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large'>
                    GET STARTED 
                </Button>
                <Button className='btns' buttonStyle='btn--primary'
                buttonSize='btn--large'>
                  wach trailer <i className='far
                  a-play-circle'/>
                </Button>
            </div>
        </div>
    )
}
export default Herosection