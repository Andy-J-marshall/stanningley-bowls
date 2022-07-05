import React from 'react';
import google from '../images/google.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import email from '../images/email.png';

function Links() {
    return (
        <div id="contact">
            <hr />
            <a href="https://www.facebook.com/StanningleyBowlsClub">
                <img
                    className="footer-logos"
                    src={facebook}
                    alt="Facebook link"
                />
            </a>
            <a href="https://www.instagram.com/StanningleyParkBowls">
                <img
                    className="footer-logos"
                    src={instagram}
                    alt="Instagram link"
                />
            </a>
            <a href="https://goo.gl/maps/DtesTxChC5x9Jz3i9">
                <img className="footer-logos" src={google} alt="Maps link" />
            </a>
            <a href="mailto:stanningleybowlsclub@gmail.com">
                <img className="footer-logos" src={email} alt="Email link" />
            </a>
        </div>
    );
}

export default Links;
