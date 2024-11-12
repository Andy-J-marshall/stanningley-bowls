import arnoldClarkLogo from '../../images/supporters/arnold_clark_grant.png';
import asdaLogo from '../../images/supporters/asda_foundation.png';
import joeyLogo from '../../images/supporters/joey.png';
import beaLogo from '../../images/supporters/bramley_elderly_action.png';
import heyNeighbourLogo from '../../images/supporters/hey_neighbour_grant.png';
import squeakerLogo from '../../images/supporters/squeaker.png';
import wldLogo from '../../images/supporters/west_leeds_dispatch.png';

function Supporters() {
    return (
        <div id="socials">
            <h1>supporters</h1>
            <a target="_blank" href="https://www.joeysportsmassage.co.uk">
                <img
                    className="supporters-logos"
                    src={joeyLogo}
                    alt="support-logo0"
                />
            </a>
            <a target="_blank" href="https://www.asdafoundation.org">
                <img
                    className="supporters-logos"
                    src={asdaLogo}
                    alt="support-logo1"
                />
            </a>
            <a target="_blank" href="https://bramleyea.org.uk">
                <img
                    className="supporters-logos"
                    src={beaLogo}
                    alt="support-logo2"
                />
            </a>
            <a
                target="_blank"
                href="https://www.arnoldclark.com/community-fund"
            >
                <img
                    className="supporters-logos"
                    src={arnoldClarkLogo}
                    alt="support-logo3"
                />
            </a>
            <a target="_blank" href="https://www.heyneighbour.org.uk">
                <img
                    className="supporters-logos"
                    src={heyNeighbourLogo}
                    alt="support-logo4"
                />
            </a>
            <a target="_blank" href="http://www.thesqueaker.co.uk">
                <img
                    className="supporters-logos"
                    src={squeakerLogo}
                    alt="support-logo5"
                />
            </a>
            <a target="_blank" href="https://westleedsdispatch.com">
                <img
                    className="supporters-logos"
                    src={wldLogo}
                    alt="support-logo6"
                />
            </a>
        </div>
    );
}

export default Supporters;
