import React from 'react';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import email from '../images/email.png';

function Contact() {
    return (
        <div id="contact-page" className="page-component">
            <h1>CONTACT US</h1>
            <img className="footer-logos" src={email} alt="Email icon" />
            <a href="mailto:stanningleybowlsclub@gmail.com">
                StanningleyBowlsClub@gmail.com
            </a>
            <br />
            <a href="https://www.instagram.com/StanningleyParkBowls">
                <img
                    className="footer-logos"
                    src={instagram}
                    alt="Instagram link"
                />
            </a>
            <a href="https://www.facebook.com/StanningleyBowlsClub">
                <img
                    className="footer-logos"
                    src={facebook}
                    alt="Facebook link"
                />
            </a>
            <h1>Find us on Google Maps</h1>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d739.5172794483534!2d-1.6554462674593056!3d53.81026923756449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795fb1c49a2601%3A0xe4eb67d3c4eeb88f!2sStanningley%20Park%20Crown%20Green%20Bowling%20Club!5e0!3m2!1sen!2suk!4v1657105300205!5m2!1sen!2suk"
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
