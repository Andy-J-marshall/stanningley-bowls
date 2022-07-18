import React, { useEffect } from 'react';
import TeamInfo from './teamInfo';
import config from '../config';

const { socialPrice, bowlingPrice } = config.membership;

function Membership() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="members">
            <h1>MEMBERSHIP</h1>
            <div className="center" style={{ width: '95%' }}>
                <p>
                    Stanningley Park Bowling club welcomes new members of any
                    age. Fees apply to adults over 16, children are welcome but
                    must be accompanied by an adult member. Membership is valid
                    per season and runs from 1st April until 30th September.
                    Please{' '}
                    <a style={{ textDecoration: 'none' }} href="/#/contact">
                        contact
                    </a>{' '}
                    us or speak to us at one of the open sessions to apply.
                </p>
                <br />
                <h3>FULL MEMBERSHIP</h3>
                <p>
                    The current fee is £{bowlingPrice} which includes club
                    membership and the Leeds parks green fee*. You are permitted
                    access to the green any time it is available via a key code.
                    Full members who are registered with BCGBA are also eligible
                    to play in teams. Our teams currently play in the Leeds
                    Parks leagues.
                </p>
                <p>
                    *If you have already paid your green fee at another Leeds
                    Parks bowling club then you only need to pay £5, please
                    bring proof you have paid this at another club.
                </p>
                <br />
                <h3>SOCIAL MEMBERSHIP</h3>
                <p>
                    If you are a beginner or infrequent visitor wanting to join
                    our social bowling sessions then you may choose a social
                    membership which is just £{socialPrice} for the season. This
                    includes free bowls hire if required.
                </p>
            </div>
            <TeamInfo />
        </div>
    );
}

export default Membership;
