import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import stan1 from '../images/stan1.jpg';
import stan2 from '../images/stan2.jpg';
import stan3 from '../images/stan3.jpg';
import stan4 from '../images/stan4.jpg';

const teams = [
    {
        name: 'Monday Combined',
        age: 'Open Age',
        desc: '4 singles games and 2 pairs',
        link: 'https://bowlsnet.uk/Leeds/MonComb',
        startTime: '6:15-6.45pm',
        img: stan1,
    },
    {
        name: 'Tuesday Vets',
        age: 'Vets (55+ year olds)',
        desc: '8 singles games',
        link: 'https://bowlsnet.uk/LeedsParkVets/Tue',
        startTime: '1:30pm',
        img: stan2,
    },
    {
        name: 'Thursday Vets',
        age: 'Vets (55+ year olds)',
        desc: '8 singles games',
        link: 'https://bowlsnet.uk/LeedsParkVets/Thu',
        startTime: '1:30pm',
        img: stan3,
    },
    {
        name: 'Saturday',
        age: 'Open Age',
        desc: '8 singles games',
        link: 'https://bowlsnet.uk/Leeds/Sat',
        startTime: '2pm',
        img: stan4,
    },
];
const socialDays = [
    {
        name: 'WEDNESDAY AFTERNOON',
        time: '2pm -4pm',
        img: stan1,
    },
    {
        name: 'SATURDAY MORNING',
        time: '10:30am -12:30pm',
        img: stan4,
    },
];

function Membership() {
    return (
        <div id="members">
            <h1>MEMBERSHIP</h1>
            <div>
                <p>New members welcome.</p>
                <p>
                    Please visit the Contact page to get in touch, or just turn
                    up to one of the days listed below.
                </p>
                <p>The green is open between April and September for all members. Prices:</p>
                <div className="tabs">
                    <ul>
                        <li>Social membership: £10</li>
                        <li>Bowling membership: £45</li>
                    </ul>
                </div>
                <p>
                    All members are given the keycode to the gate and can play
                    whenever the green is free and equipment can be provided.
                </p>
                <p>
                    Teams currently play in the Leeds Park leagues on a Monday
                    evening and on Tuesday, Thursday and Saturday afternoons.
                </p>
            </div>
            <div>
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

export default Membership;
