import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import mondayTeamImg from '../images/websiteImages/stan-mond-team.jpg';
import tuesdayTeamImg from '../images/websiteImages/stan-tues-team.jpg';
import thursdayTeamImg from '../images/websiteImages/stan-thur-team.jpg';
import saturdayTeamImg from '../images/websiteImages/stan-sat-team.jpg';
import socialImg1 from '../images/websiteImages/stan-social1.jpg';
import socialImg2 from '../images/websiteImages/stan-social2.jpg';

const teams = [
    {
        name: 'Monday Combined',
        age: 'Open Age',
        desc: '4 singles games and 2 pairs',
        link: 'https://bowlsnet.uk/Leeds/MonComb',
        startTime: '6:15-6.45pm',
        img: mondayTeamImg,
    },
    {
        name: 'Tuesday Vets',
        age: 'Vets (55+ year olds)',
        desc: '8 singles games',
        link: 'https://bowlsnet.uk/LeedsParkVets/Tue',
        startTime: '1:30pm',
        img: tuesdayTeamImg,
    },
    {
        name: 'Thursday Vets',
        age: 'Vets (55+ year olds)',
        desc: '8 singles games',
        link: 'https://bowlsnet.uk/LeedsParkVets/Thu',
        startTime: '1:30pm',
        img: thursdayTeamImg,
    },
    {
        name: 'Saturday',
        age: 'Open Age',
        desc: '8 singles games',
        link: 'https://bowlsnet.uk/Leeds/Sat',
        startTime: '2pm',
        img: saturdayTeamImg,
    },
];
const socialDays = [
    {
        name: 'WEDNESDAY AFTERNOON',
        time: '2pm -4pm',
        img: socialImg1,
    },
    {
        name: 'SATURDAY MORNING',
        time: '10:30am -12:30pm',
        img: socialImg2,
    },
];

function TeamInfo() {
    return (
        <div id="team-and-socials" className="page-component">
            <div id="team-info">
                <h1>COMPETITIVE BOWLS</h1>
                <Row sm={1} md={2} lg={3} xl={4} className="g-4 tabs">
                    {teams.map((team, idx) => (
                        <Col key={idx}>
                            <Card bg="light" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={team.img} />
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
                                <Card.Img variant="top" src={day.img} />
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
