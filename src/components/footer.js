import React from 'react';
import google from '../images/socials/google.png';
import facebook from '../images/socials/facebook.png';
import instagram from '../images/socials/instagram.png';
import email from '../images/socials/email.png';
import config from '../config';

const { instagramUrl, facebookUrl, emailUrl, googleMapsUrl } =
    config.socialLinks;
const currentYear = new Date().getFullYear();

function Footer() {
    return (
        <div id="footer">
            <div id="socials">
                <a target="_blank" href={facebookUrl}>
                    <img className="logos" src={facebook} alt="Facebook link" />
                </a>
                <a target="_blank" href={instagramUrl}>
                    <img
                        className="logos"
                        src={instagram}
                        alt="Instagram link"
                    />
                </a>
                <a target="_blank" href={googleMapsUrl}>
                    <img className="logos" src={google} alt="Maps link" />
                </a>
                <a href={emailUrl}>
                    <img className="logos" src={email} alt="Email link" />
                </a>
            </div>
            <p className="footnote">Copyright ©{currentYear} AJM</p>
        </div>
    );
}

export default Footer;
