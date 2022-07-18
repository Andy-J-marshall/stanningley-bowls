import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import mondayTeamImg from '../images/websiteImages/stan-mond-team.webp';
import tuesdayTeamImg from '../images/websiteImages/stan-tues-team.webp';
import thursdayTeamImg from '../images/websiteImages/stan-thur-team.webp';
import saturdayTeamImg from '../images/websiteImages/stan-sat-team.webp';
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
            <div id="social-info" className="page-component center">
                <h1>SOCIAL BOWLING</h1>
                <p>
                    We currently hold open social bowling days on Saturday
                    mornings (10:30am - 12:30pm) and Wednesday afternoons
                    (2-4pm).
                </p>
            </div>
        </div>
    );
}

export default TeamInfo;
