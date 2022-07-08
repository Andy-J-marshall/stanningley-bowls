import React from 'react';
import google from '../images/google.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import email from '../images/email.png';
// TODO add the real logos here

function Supporters() {
    return (
        <div id="socials">
            {/* TODO update this */}
            <img className="logos" src={facebook} alt="" />
            <img className="logos" src={instagram} alt="" />
            <img className="logos" src={google} alt="" />
            <img className="logos" src={email} alt="" />
        </div>
    );
}

export default Supporters;
