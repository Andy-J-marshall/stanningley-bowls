import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import mondayTeamImg from '../images/websiteImages/stan-mond-team.webp';
import tuesdayTeamImg from '../images/websiteImages/stan-tues-team.webp';
import thursdayTeamImg from '../images/websiteImages/stan-thur-team.webp';
import saturdayTeamImg from '../images/websiteImages/stan-sat-team.webp';
import socialBowlingImg from '../images/websiteImages/stan-social-bowling2.webp';
import groupBowlingImg from '../images/websiteImages/stan-group-bowling.webp';
import config from '../config';

const { teams } = config;

teams.forEach((team) => {
    const teamName = team.name.toLowerCase();
    if (teamName.includes('monday')) {
        team.img = mondayTeamImg;
    }
    if (teamName.includes('tuesday vets')) {
        team.img = tuesdayTeamImg;
    }
    if (teamName.includes('thursday')) {
        team.img = thursdayTeamImg;
    }
    if (teamName.includes('saturday')) {
        team.img = saturdayTeamImg;
    }
});

function TeamInfo() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

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
                    Feel free to come along to one of our open social bowling
                    sessions, complete beginner’s welcome. These sessions
                    currently run Saturday morning 10.30am - 12.30pm, Wednesday
                    afternoon 2pm - 4pm and Wednesday evening 6pm - 8pm. Booking
                    is not required but please be aware that sessions will not
                    run in extreme weather conditions so you may want to contact
                    us in advance to confirm the session is running. The first
                    session is free and then you can choose a full or social
                    membership for the remainder of the season.
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
