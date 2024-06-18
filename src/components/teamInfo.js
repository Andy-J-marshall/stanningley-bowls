import { Card, Button, Row, Col } from 'react-bootstrap';
import monImg from '../images/websiteImages/mon-team.webp';
import tuesVetsImg from '../images/websiteImages/tuesVets-team.webp';
import thurVetsImg from '../images/websiteImages/thursVets-team.webp';
import satImg from '../images/websiteImages/sat-team.webp';
import tuesImg from '../images/websiteImages/tues-team.webp';
import wedImg from '../images/websiteImages/wed-team.webp';
import wedPairsImg from '../images/websiteImages/wedPairs-team.webp';
import socialBowlingImg from '../images/websiteImages/social-bowling2.webp';
import groupBowlingImg from '../images/websiteImages/group-bowling.webp';
import config from '../config';

const { teams } = config;

teams.forEach((team) => {
    const teamName = team.name.toLowerCase();
    if (teamName.includes('monday')) {
        team.img = monImg;
    }
    if (teamName.includes('tuesday vets')) {
        team.img = tuesVetsImg;
    }
    if (teamName === 'tuesday') {
        team.img = tuesImg;
    }
    if (teamName.includes('wednesday half holiday')) {
        team.img = wedImg;
    }
    if (teamName.includes('wednesday pairs')) {
        team.img = wedPairsImg;
    }
    if (teamName.includes('thursday vets')) {
        team.img = thurVetsImg;
    }
    if (teamName.includes('saturday')) {
        team.img = satImg;
    }
});

function TeamInfo() {
    return (
        <div id="team-and-socials">
            <div id="team-info" className="page-component center">
                <h1>TEAMS</h1>
                <Row sm={1} md={2} lg={3} xl={4} className="g-4 tabs">
                    {teams.map((team, idx) => (
                        <Col key={idx}>
                            <Card bg="light" style={{ width: '18rem' }}>
                                <Card.Img
                                    alt="team-photo"
                                    variant="top"
                                    src={team.img}
                                />
                                <Card.Body>
                                    <Card.Title>
                                        {team.name.toUpperCase()}
                                    </Card.Title>
                                    <Card.Text>
                                        {team.age}
                                        <br /> {team.desc}
                                        <br /> Start Time: {team.startTime}
                                    </Card.Text>
                                    <Button
                                        style={{ backgroundColor: '#0081a4' }}
                                        href={team.link}
                                        target="_blank"
                                        variant="secondary"
                                    >
                                        View on Bowlsnet
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <div id="social-info" className="center page-component">
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
            <div id="group-info" className="center page-component">
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

export default TeamInfo;
