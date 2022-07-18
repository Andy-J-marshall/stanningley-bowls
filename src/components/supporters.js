import React from 'react';
import arnoldClarkLogo from '../images/supporters/arnold_clark_grant.png';
import asdaLogo from '../images/supporters/asda_foundation.png';
import beaLogo from '../images/supporters/bramley_elderly_action.png';
import heyNeighbourLogo from '../images/supporters/hey_neighbour_grant.png';
import squeakerLogo from '../images/supporters/squeaker.png';
import wldLogo from '../images/supporters/west_leeds_dispatch.png';

function Supporters() {
    return (
        <div id="socials" className="page-component center">
            <h1>SUPPORTERS</h1>
            <img
                className="supporters-logos"
                src={asdaLogo}
                alt="support-logo1"
            />
            <img
                className="supporters-logos"
                src={beaLogo}
                alt="support-logo2"
            />
            <img
                className="supporters-logos"
                src={arnoldClarkLogo}
                alt="support-logo3"
            />
            <img
                className="supporters-logos"
                src={heyNeighbourLogo}
                alt="support-logo4"
            />
            <img
                className="supporters-logos"
                src={squeakerLogo}
                alt="support-logo5"
            />
            <img
                className="supporters-logos"
                src={wldLogo}
                alt="support-logo6"
            />
        </div>
    );
}

export default Supporters;
