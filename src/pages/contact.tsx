import facebook from '../images/socials/facebook_blue.png';
import instagram from '../images/socials/insta_blue.png';
import email from '../images/socials/email_blue.png';
import { config } from '../config';

const { instagramUrl, facebookUrl, emailUrl, googleMapsIframeUrl } =
    config.socialLinks;

const facebookEventsUrl = `${facebookUrl}/events`;
const emailAddress = emailUrl.split('mailto:')[1];

function Contact() {
    return (
        <div id="contact-page" className="page-component center">
            <h1>CONTACT US</h1>
            <p style={{ margin: 0 }}>Get in touch via email:</p>
            <a style={{ textDecoration: 'none' }} href={emailUrl}>
                <img className="logos" src={email} alt="Email link" />
                {emailAddress}
            </a>
            <br />
            <br />
            <p style={{ margin: 0 }}>
                Keep up to date with the latest news via our social media pages:
            </p>
            <a
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={instagramUrl}
            >
                <img className="logos" src={instagram} alt="Instagram link" />
            </a>
            <a
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={facebookUrl}
            >
                <img className="logos" src={facebook} alt="Facebook link" />
            </a>
            <br />
            <br />
            <p>
                See our upcoming{' '}
                <a
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                    href={facebookEventsUrl}
                >
                    events
                </a>{' '}
                on Facebook.
            </p>
            <div>
                <h1>LOCATION</h1>
                <p>
                    {config.teamNames.fullName} is situated within Stanningley
                    Park. Follow the footpath round and the entrance is between
                    the rose garden and the rugby pitch. Access is on foot only.
                </p>
                <p>
                    The Park has a small, free car park which is located just
                    off Half Mile Lane. If you are coming via Stanningley Road
                    (B6157) then take the turning by Tesco Express; you'll find
                    the entrance on the right after you pass the park house.
                </p>
                <p>
                    The nearest bus stops are only a short walk away, with the
                    number 16 stopping on Intake Lane and the 72 on Stanningley
                    Road.
                </p>
            </div>
            <iframe
                src={googleMapsIframeUrl}
                width="90%"
                height="450"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}
export default Contact;
