import React from 'react';
import google from '../images/socials/google.png';
import facebook from '../images/socials/facebook.png';
import instagram from '../images/socials/instagram.png';
import email from '../images/socials/email.png';

function Footer() {
    return (
        <div id="footer">
            <div id="socials">
                <a href="https://www.facebook.com/StanningleyBowlsClub">
                    <img
                        className="logos"
                        src={facebook}
                        alt="Facebook link"
                    />
                </a>
                <a href="https://www.instagram.com/StanningleyParkBowls">
                    <img
                        className="logos"
                        src={instagram}
                        alt="Instagram link"
                    />
                </a>
                <a href="https://goo.gl/maps/DtesTxChC5x9Jz3i9">
                    <img
                        className="logos"
                        src={google}
                        alt="Maps link"
                    />
                </a>
                <a href="mailto:stanningleybowlsclub@gmail.com">
                    <img
                        className="logos"
                        src={email}
                        alt="Email link"
                    />
                </a>
            </div>
            <p className="footnote">Copyright ©2022 AJM</p>
        </div>
    );
}

export default Footer;
