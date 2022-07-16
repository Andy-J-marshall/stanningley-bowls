import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import mondayTeamImg from '../images/websiteImages/stan-mond-team.webp';
import tuesdayTeamImg from '../images/websiteImages/stan-tues-team.webp';
import thursdayTeamImg from '../images/websiteImages/stan-thur-team.webp';
import saturdayTeamImg from '../images/websiteImages/stan-sat-team.webp';
import socialImg1 from '../images/websiteImages/stan-social1.webp';
import socialImg2 from '../images/websiteImages/stan-social2.webp';
import config from '../config';

const { teams, socialDays } = config;

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
socialDays.forEach((day) => {
    const socialDay = day.name.toLowerCase();
    if (socialDay.includes('wednesday afternoon')) {
        day.img = socialImg1;
    }
    if (socialDay.includes('saturday')) {
        day.img = socialImg2;
    }
});

function TeamInfo() {
    return (
        <div id="team-and-socials" className="page-component">
            <div id="team-info">
                <h1>COMPETITIVE BOWLS</h1>
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
            <div id="social-info" className="page-component">
                <h1>SOCIAL BOWLS</h1>
                <Row sm={1} md={2} lg={3} xl={4} className="g-4 tabs">
                    {socialDays.map((day, idx) => (
                        <Col key={idx}>
                            <Card bg="light" style={{ width: '18rem' }}>
                                <Card.Img
                                    alt="social-photo"
                                    variant="top"
                                    src={day.img}
                                />
                                <Card.Body>
                                    <Card.Title>
                                        {day.name.toUpperCase()}
                                    </Card.Title>
                                    <Card.Text>
                                        Everyone welcome
                                        <br /> {day.time}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default TeamInfo;
