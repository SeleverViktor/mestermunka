import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Let's make things faster
        </p>
        <p className='footer-subscription-text'>
          You can find parties anytime
        </p>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              PARTYEZ
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>PARTYEZ © 2025</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='https://www.bing.com/search?q=facebook&qs=n&form=QBRE&sp=-1&ghc=1&lq=0&pq=facebook&sc=16-8&sk=&cvid=B85E3964110D44229815F93855B917C9'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='https://www.bing.com/search?pglt=43&q=instagram&cvid=e174657abfd44a8780e18a23f8b322c0&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBAAGEAyCAgJEOkHGPxV0gEIMjEyMmowajGoAgCwAgA&FORM=ANNAB1&ucpdpc=UCPD&PC=U531'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='https://www.google.com/search?q=youtube&oq=youtube&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIGCAQQRRg8MgYIBRAuGEDSAQgyOTc4ajBqNKgCALACAA&sourceid=chrome&ie=UTF-8'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='https://www.bing.com/search?qs=AS&pq=twitter&sk=CSYN1AS1&sc=16-7&pglt=43&q=twitter+login&cvid=131aa02507154b0691b8e4855dc26485&gs_lcrp=EgRlZGdlKgYIAhAAGEAyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBAAGEAyCAgJEOkHGPIHMggIChDpBxj8VdIBCDQwOTNqMGoxqAIAsAIA&FORM=ANNAB1&ucpdpc=UCPD&PC=U531'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
           
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
