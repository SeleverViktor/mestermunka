import React from "react";
import {Button} from './Button';
import './Footer.css';

function Footer(){
    return(
        <div className='footer-container'>
            <section  className="footer-subscription">
                  
                    <p className="footer-subscription-heading">Join to vakanda</p>
                    <p className="footer-subsription-text">bármikor végetvethetsz ennek</p>
                    <div className="input-areas">
                         <form >
                            <input type="email" name="email" placeholder="your email" className="footer-input" />
                            <Button buttonStlyle='btn--outline'>Supscribe</Button>
                        </form>  
                    </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                       <h2>ABOUTS US</h2> 
                       <Link to='/sign-up'>How it works</Link>
                       <Link to='/'>Testimotials</Link>
                       <Link to='/'>Careers</Link>
                       <Link to='/'>Inventors</Link>
                       <Link to='/'>Terms of service</Link>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;