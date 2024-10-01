import { Card, Button, Row, Col } from 'react-bootstrap';
import monImg from '../images/websiteImages/mon-team.webp';
import tuesVetsImg from '../images/websiteImages/tuesVets-team.webp';
import thurVetsImg from '../images/websiteImages/thursVets-team.webp';
import satImg from '../images/websiteImages/sat-team.webp';
import tuesImg from '../images/websiteImages/tues-team.webp';
import wedImg from '../images/websiteImages/wed-team.webp';
import wedPairsImg from '../images/websiteImages/wedPairs-team.webp';
import { config } from '../config';

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
        <div id="team-info" className="page-component center">
            <h1>TEAM INFORMATION</h1>
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
    );
}

export default TeamInfo;
