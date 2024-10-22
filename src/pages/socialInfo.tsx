// TODO improve image size
import socialBowlingImg from '../images/websiteImages/social-bowling2.png';
import groupBowlingImg from '../images/websiteImages/group-bowling.png';

function SocialInfo() {
    return (
        <div id="social-membership" className="center page-component">
            <div id="social-info">
                <h1>SOCIAL BOWLING</h1>
                <p>
                    Come along to one of our open social bowling sessions,
                    complete beginner's are welcome and the first session is
                    free. These sessions currently run Saturday morning 10.30am
                    - 12.30pm and Thursday evening 6pm - 8pm. Booking is not
                    required but please be aware that sessions will not run in
                    extreme weather conditions so you may want to contact us in
                    advance to confirm the session is running.
                </p>
                <img style={{ width: '95%' }} src={socialBowlingImg}></img>
            </div>
            <div id="group-info">
                <br />
                <h1>GROUP SESSIONS</h1>
                <p>
                    We are happy to accommodate groups of up to 15 with
                    exclusive use of the green as a one off session or a regular
                    meeting. Crown green bowling is the ideal activity for
                    corporate team building, youth clubs or charity groups as it
                    is suitable for a wide range of ages and abilities.
                </p>
                <p>
                    Children and teenagers must be supervised by an adult in the
                    group. All equipment and beginner tuition will be provided.
                    Please{' '}
                    <a style={{ textDecoration: 'none' }} href="/#/contact">
                        contact
                    </a>{' '}
                    us to discuss availability.
                </p>
                <img style={{ width: '95%' }} src={groupBowlingImg}></img>
            </div>
        </div>
    );
}

export default SocialInfo;
