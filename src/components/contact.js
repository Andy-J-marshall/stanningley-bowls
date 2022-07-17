import React, { useEffect } from 'react';
import facebook from '../images/socials/facebook.png';
import instagram from '../images/socials/instagram.png';
import email from '../images/socials/email.png';
import config from '../config';

const { instagramUrl, facebookUrl, emailUrl, googleMapsIframeUrl } =
    config.socialLinks;

const emailAddress = emailUrl.split('mailto:')[1];

function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="contact-page" className="page-component">
            <h1>CONTACT US</h1>
            <img className="logos" src={email} alt="Email icon" />
            <a href={emailUrl}>{emailAddress}</a>
            <br />
            <a target="_blank" href={instagramUrl}>
                <img className="logos" src={instagram} alt="Instagram link" />
            </a>
            <a target="_blank" href={facebookUrl}>
                <img className="logos" src={facebook} alt="Facebook link" />
            </a>
            <h1>Find us on Google Maps</h1>
            <iframe
                src={googleMapsIframeUrl}
                width="90%"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}
export default Contact;
