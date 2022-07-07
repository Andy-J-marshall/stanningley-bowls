import React from 'react';
import TeamInfo from './teamInfo';

function Membership() {
    return (
        <div id="members">
            <h1>MEMBERSHIP</h1>
            <div>
                <p>New members welcome.</p>
                <p>
                    Please visit the Contact page to get in touch, or just turn
                    up to one of the days listed below.
                </p>
                <p>
                    The green is open between April and September for all
                    members. Prices:
                </p>
                <div className="tabs">
                    <ul>
                        <li>Social membership: £10</li>
                        <li>Bowling membership: £45</li>
                    </ul>
                </div>
                <p>
                    All members are given the keycode to the gate and can play
                    whenever the green is free and equipment can be provided.
                </p>
                <p>
                    Teams currently play in the Leeds Park leagues on a Monday
                    evening and on Tuesday, Thursday and Saturday afternoons.
                </p>
            </div>
            <TeamInfo />
        </div>
    );
}

export default Membership;
