import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Fixtures from './fixtures';
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
        name: 'Tuesday Vet',
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

function Info() {
    return (
        <div id="info">
            <h1>Team Information</h1>
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
                                    <br /> 8 players per team
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
            <Fixtures />
        </div>
    );
}

export default Info;
