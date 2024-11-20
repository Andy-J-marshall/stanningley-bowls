import googleImg from '../../images/socials/maps_white.png';
import facebookImg from '../../images/socials/facebook_white.png';
import instagramImg from '../../images/socials/insta_white.png';
import emailImg from '../../images/socials/email_white.png';
import { config } from '../../config';

const { instagramUrl, facebookUrl, emailUrl, googleMapsUrl } =
    config.socialLinks;
const currentYear = new Date().getFullYear();

function Footer() {
    return (
        <div id="footer">
            <div id="socials">
                <a target="_blank" href={facebookUrl}>
                    <img
                        className="logos"
                        src={facebookImg}
                        alt="Facebook link"
                    />
                </a>
                <a target="_blank" href={instagramUrl}>
                    <img
                        className="logos"
                        src={instagramImg}
                        alt="Instagram link"
                    />
                </a>
                <a target="_blank" href={googleMapsUrl}>
                    <img className="logos" src={googleImg} alt="Maps link" />
                </a>
                <a href={emailUrl}>
                    <img className="logos" src={emailImg} alt="Email link" />
                </a>
            </div>
            <p className="footnote">Copyright ©{currentYear} AJM</p>
        </div>
    );
}

export default Footer;
