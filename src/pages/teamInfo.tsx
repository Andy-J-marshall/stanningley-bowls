import { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import monImg from '../images/websiteImages/mon-team.png';
import tuesVetsImg from '../images/websiteImages/tuesVets-team.png';
import thurVetsImg from '../images/websiteImages/thursVets-team.png';
import satImg from '../images/websiteImages/sat-team.png';
import tuesImg from '../images/websiteImages/tues-team.png';
import wedImg from '../images/websiteImages/wed-team.png';
import wedPairsImg from '../images/websiteImages/wedPairs-team.png';

const teams = [
    {
        name: 'Leeds Monday Combined',
        link: 'https://bowlsnet.uk/Leeds-MonComb',
        img: monImg,
    },
    {
        name: 'Leeds Tuesday Vets',
        link: 'https://bowlsnet.uk/Leeds-TueVets',
        img: tuesVetsImg,
    },
    {
        name: 'Leeds Tuesday',
        link: 'https://bowlsnet.uk/Leeds-Tue',
        img: tuesImg,
    },
    {
        name: 'Leeds Half Holiday',
        link: 'https://bowlsnet.uk/Leeds-Wed',
        img: wedImg,
    },
    {
        name: 'AireWharfe Wednesday Pairs',
        link: 'https://bowlsnet.uk/AW-WedPairs',
        img: wedPairsImg,
    },
    {
        name: 'Leeds Thursday Vets',
        link: 'https://bowlsnet.uk/leeds-ThuVets',
        img: thurVetsImg,
    },
    {
        name: 'Leeds Saturday',
        link: 'https://bowlsnet.uk/Leeds-Sat',
        img: satImg,
    },
];

function TeamInfo() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="team-info" className="page-component center">
            <h1>teams</h1>
            <Row xs={1} md={2} xl={3} className="g-4 tabs">
                {teams.map((team, idx) => (
                    <Col key={idx}>
                        <Card bg="light">
                            <Card.Img
                                alt="team-photo"
                                variant="top"
                                src={team.img}
                            />
                            <Card.Body>
                                <Card.Title>{team.name}</Card.Title>
                                <Button
                                    style={{ backgroundColor: '#0081a4' }}
                                    href={team.link}
                                    target="_blank"
                                >
                                    View on Bowlsnet
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default TeamInfo;
