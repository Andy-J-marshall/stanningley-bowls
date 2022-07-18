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
            <p>
                Get in contact using the email address below or via social media
            </p>
            <img className="logos" src={email} alt="Email icon" />
            <a style={{ textDecoration: 'none' }} href={emailUrl}>
                {emailAddress}
            </a>
            <br />
            <a
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={instagramUrl}
            >
                <img className="logos" src={instagram} alt="Instagram link" />
                @StanningleyParkBowls
            </a>
            <a
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={facebookUrl}
            >
                <img className="logos" src={facebook} alt="Facebook link" />
                @StanningleyBowlsClub
            </a>
            <h1>LOCATION</h1>
            <p>
                Stanningley Park is located near the number 16 and 72 bus routes
                and 1 mile away from Bramley train station.
            </p>
            <p>
                The car park is located next to the changing rooms just off Half
                Mile Lane. Please do not park in the actual park.
            </p>
            <p>
                The entrance to the green is between the rose garden and the
                rugby pitch.
            </p>
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
