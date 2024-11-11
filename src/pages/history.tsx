import { useEffect } from 'react';
import {
    Card,
    Button,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';
import { config } from '../config';
import historicTeamImage from '../images/websiteImages/historic-team-photo.png';
import historicStatsImage from '../images/websiteImages/historic-stats.png';
import clubCupWinners from '../data/clubCupWinners.json';

const { emailUrl, teamPhotosUrl, historicStatsUrl } = config.socialLinks;
const { fullName } = config.teamNames;

function History() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="history-page" className="page-component center">
            <h1>history</h1>
            <p>
                There has been crown green bowling at {fullName} for over 100
                years. Below is a selection of photos, statistics, records and
                trophies over that period.
            </p>
            <p>
                There are a number of years missing,{' '}
                <a className="link" href={emailUrl}>
                    contact us
                </a>{' '}
                if you can help fill in the gaps.
            </p>
            <Row sm={1} md={2} lg={3} xl={4} className="g-4 tabs">
                <Col>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Img
                            alt="historic-team-photos"
                            variant="top"
                            src={historicTeamImage}
                        />
                        <Card.Body>
                            <Card.Title>TEAM PHOTOS</Card.Title>
                            <Card.Text>Photos from the club house</Card.Text>
                            <Button
                                style={{ backgroundColor: '#0081a4' }}
                                href={teamPhotosUrl}
                                target="_blank"
                                variant="secondary"
                            >
                                View the photo album
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Img
                            alt="historic-team-stats"
                            variant="top"
                            src={historicStatsImage}
                        />
                        <Card.Body>
                            <Card.Title>HISTORIC STATS</Card.Title>
                            <Card.Text>Stats 1972-1990</Card.Text>
                            <Button
                                style={{ backgroundColor: '#0081a4' }}
                                href={historicStatsUrl}
                                target="_blank"
                                variant="secondary"
                            >
                                View the photo album
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            <h2>club cup winners</h2>
            <ListGroup>
                {clubCupWinners.map((record, idx) => {
                    return (
                        <ListGroupItem key={idx}>
                            {record.year} - {record.name}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
            <br />
            <h2>trophies</h2>
            <h4>brotherton cup</h4>
            <ListGroup>
                <ListGroupItem>1927</ListGroupItem>
            </ListGroup>
            <br />
            <h4>leeds saturday</h4>
            <Row
                sm={1}
                md={2}
                lg={3}
                xl={4}
                className="g-4 tabs align-items-start"
            >
                <Col>
                    <h5>league</h5>
                    <ListGroup>
                        <ListGroupItem>1926</ListGroupItem>
                        <ListGroupItem>1928</ListGroupItem>
                        <ListGroupItem>1929</ListGroupItem>
                        <ListGroupItem>1932</ListGroupItem>
                        <ListGroupItem>1933</ListGroupItem>
                        <ListGroupItem>1935</ListGroupItem>
                        <ListGroupItem>2023</ListGroupItem>
                        <ListGroupItem>2024</ListGroupItem>
                    </ListGroup>
                </Col>
                <Col>
                    <h5>cup</h5>
                    <ListGroup>
                        <ListGroupItem>1925</ListGroupItem>
                        <ListGroupItem>1926</ListGroupItem>
                        <ListGroupItem>1927</ListGroupItem>
                        <ListGroupItem>1928</ListGroupItem>
                        <ListGroupItem>1929</ListGroupItem>
                        <ListGroupItem>1931</ListGroupItem>
                        <ListGroupItem>1932</ListGroupItem>
                        <ListGroupItem>1933</ListGroupItem>
                        <ListGroupItem>1936</ListGroupItem>
                        <ListGroupItem>1937</ListGroupItem>
                        <ListGroupItem>2023</ListGroupItem>
                        <ListGroupItem>2024</ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
            <br />
            <h4>leeds tuesday vets</h4>
            <Row
                sm={1}
                md={2}
                lg={3}
                xl={4}
                className="g-4 tabs align-items-start"
            >
                <Col>
                    <h5>league</h5>
                    <ListGroup>
                        <ListGroupItem>2017</ListGroupItem>
                        <ListGroupItem>2019</ListGroupItem>
                        <ListGroupItem>2023</ListGroupItem>
                    </ListGroup>
                </Col>
                <Col>
                    <h5>clegg cup</h5>
                    <ListGroup>
                        <ListGroupItem>2017</ListGroupItem>
                        <ListGroupItem>2023</ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
            <br />
            <h4>leeds half holiday</h4>
            <h5>penrose green cup</h5>
            <ListGroup>
                <ListGroupItem>1970</ListGroupItem>
                <ListGroupItem>2023</ListGroupItem>
            </ListGroup>
            <br />
            <h4>leeds thursday vets</h4>
            <h5>harrison cup</h5>
            <ListGroup>
                <ListGroupItem>1995</ListGroupItem>
                <ListGroupItem>2017</ListGroupItem>
            </ListGroup>
            <br />
        </div>
    );
}
export default History;
