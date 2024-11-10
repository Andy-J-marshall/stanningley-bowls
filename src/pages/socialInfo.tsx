import { useEffect } from 'react';
import socialBowlingImg from '../images/websiteImages/social-bowling2.png';
import groupBowlingImg from '../images/websiteImages/group-bowling.png';
import { config } from '../config';

const { facebookUrl } = config.socialLinks;

function SocialInfo() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="social-membership" className="center page-component">
            <div id="social-info">
                <h1>social bowling</h1>
                <p>
                    Come along to one of our open social bowling sessions,
                    complete beginners are welcome and the first session is
                    free.
                </p>
                <p>
                    See the{' '}
                    <a className="link" target="_blank" href={facebookUrl}>
                        Facebook
                    </a>{' '}
                    page for the latest dates and times.
                </p>
                <img style={{ width: '98%' }} src={socialBowlingImg}></img>
            </div>
            <div id="group-info">
                <br />
                <h1>group sessions</h1>
                <p>
                    We can offer private use of the green for groups up to 15
                    people. Crown green bowling is suitable for a wide range of
                    ages and abilities so is the ideal activity for corporate
                    team building, youth clubs or social events.
                </p>
                <p>
                    Under 18s must be supervised by an adult in the group. All
                    equipment and beginner tuition will be provided.
                </p>
                <p>
                    Please{' '}
                    <a className="link" href="/#/contact">
                        contact
                    </a>{' '}
                    us to discuss availability.
                </p>
                <img style={{ width: '98%' }} src={groupBowlingImg}></img>
            </div>
        </div>
    );
}

export default SocialInfo;
