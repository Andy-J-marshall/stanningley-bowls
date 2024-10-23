import { config } from '../config';
import socialBowlingImg from '../images/websiteImages/social-bowling.png';

const { leedsCouncilFee, bowlingPriceOnly, bowlingPrice, socialPrice } = config.membership;

function Membership() {
    return (
        <div id="members" className="center page-component">
            <h1>MEMBERSHIP</h1>
            <p>{config.teamNames.fullName} welcomes new members of any age or experience level.</p>
            <p>
                Fees apply to anyone over 16; children are welcome but must be
                accompanied by an adult member.
            </p>
            <p>
                Membership is valid per season and runs from 1st April until
                30th September.
            </p>
            <p>
                Please{' '}
                <a style={{ textDecoration: 'none' }} href="/#/contact">
                    contact us
                </a>{' '}
                or speak to a member if you are interested in joining.
            </p>
            <br />
            <h3>FULL BOWLING MEMBERSHIP - £{bowlingPrice}</h3>
            <p>
                For members who want to play in one of our teams and have full
                green access.
            </p>
            <p>
                This includes the £{bowlingPriceOnly} membership fee plus the £{leedsCouncilFee}{' '}
                Leeds Council season fee.
            </p>
            <p>
                If you have already paid your annual green fee at another Leeds
                Parks bowling club then you only need to pay the £
                {bowlingPriceOnly} membership fee.
            </p>
            <br />
            <h3>SOCIAL MEMBERSHIP - £{socialPrice}</h3>
            <p>
                For new or infrequent bowlers who want to attend social sessions
                and club tournaments.
            </p>
            <p>Free equipment hire is available.</p>
            <img style={{ width: '98%' }} src={socialBowlingImg}></img>
        </div>
    );
}

export default Membership;
