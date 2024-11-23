import arnoldClarkLogoImg from '../../images/supporters/arnold_clark_grant.png';
import asdaLogoImg from '../../images/supporters/asda_foundation.png';
import joeyLogoImg from '../../images/supporters/joey.png';
import beaLogoImg from '../../images/supporters/bramley_elderly_action.png';
import heyNeighbourLogoImg from '../../images/supporters/hey_neighbour_grant.png';
import squeakerLogoImg from '../../images/supporters/squeaker.png';
import wldLogoImg from '../../images/supporters/west_leeds_dispatch.png';

function Supporters() {
    return (
        <div id="supporters">
            <h1>supporters</h1>
            <a target="_blank" href="https://www.joeysportsmassage.co.uk">
                <img
                    className="supporters-logos"
                    src={joeyLogoImg}
                    alt="support-logo0"
                />
            </a>
            <a target="_blank" href="https://www.asdafoundation.org">
                <img
                    className="supporters-logos"
                    src={asdaLogoImg}
                    alt="support-logo1"
                />
            </a>
            <a target="_blank" href="https://bramleyea.org.uk">
                <img
                    className="supporters-logos"
                    src={beaLogoImg}
                    alt="support-logo2"
                />
            </a>
            <a
                target="_blank"
                href="https://www.arnoldclark.com/community-fund"
            >
                <img
                    className="supporters-logos"
                    src={arnoldClarkLogoImg}
                    alt="support-logo3"
                />
            </a>
            <a target="_blank" href="https://www.heyneighbour.org.uk">
                <img
                    className="supporters-logos"
                    src={heyNeighbourLogoImg}
                    alt="support-logo4"
                />
            </a>
            <a target="_blank" href="http://www.thesqueaker.co.uk">
                <img
                    className="supporters-logos"
                    src={squeakerLogoImg}
                    alt="support-logo5"
                />
            </a>
            <a target="_blank" href="https://westleedsdispatch.com">
                <img
                    className="supporters-logos"
                    src={wldLogoImg}
                    alt="support-logo6"
                />
            </a>
        </div>
    );
}

export default Supporters;
