import { config } from '../config';
import socialBowlingImg from '../images/websiteImages/social-bowling.webp';

const { leedsCouncilFee, bowlingPriceOnly } = config.membership;

function Membership() {
    return (
        <div id="members" className="center page-component">
            <h1>MEMBERSHIP</h1>
            <p>
                {config.teamNames.fullName} welcomes new members of any age.
                Fees apply to adults over 16, children are welcome but must be
                accompanied by an adult member. Membership is valid per season
                and runs from 1st April until 30th September. Please{' '}
                <a style={{ textDecoration: 'none' }} href="/#/contact">
                    contact
                </a>{' '}
                us or speak to us at one of the open sessions to apply.
            </p>
            <br />
            <h3>FULL BOWLING MEMBERSHIP</h3>
            <p>
                Team players and/ or anytime green access Leeds Council season
                fee - £{leedsCouncilFee}* + membership fee - £{bowlingPriceOnly}
                .
            </p>
            <p>
                *If you have already paid your green fee at another Leeds Parks
                bowling club then you only need to pay £{bowlingPriceOnly},
                please bring proof you have paid this at another club.
            </p>
            <br />
            <h3>SOCIAL MEMBERSHIP</h3>
            <p>For new/ infrequent bowlers</p>
            <p>
                Access to social bowling sessions and club tournaments only.
                Bowl hire included, no session fees. Under 16’s are free but
                must be accompanied by an adult member. Membership fee - £20 per
                person or £30 joint membership.
            </p>
            <p>~ Optional non-bowling membership - £10 ~</p>
            <img style={{ width: '95%' }} src={socialBowlingImg}></img>
        </div>
    );
}

export default Membership;
