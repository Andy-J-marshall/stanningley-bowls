import { useState } from 'react';
import { Button, Card, Col, Collapse, Row } from 'react-bootstrap';
import agmImage from '../images/news/agm-2024.png';
import volunteeringImage from '../images/news/volunteering.png';

// TODO improve image dimensions
// TODO add a read more button?
// TODO add a link to FB event?
// TODO create component for news item
function News() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    return (
        <div id="news">
            <h2>LATEST NEWS</h2>
            <Row
                xs={1}
                sm={1}
                md={2}
                lg={3}
                className="g-4 align-items-start tabs"
            >
                <Col>
                    <Card bg="light">
                        <Card.Body>
                            <h3>AGM DATE</h3>
                            <Card.Img
                                style={{ width: '100%', height: 'auto' }}
                                variant="top"
                                src={agmImage}
                            />
                            <br />
                            <br />
                            {!open1 && (
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen1(true)}
                                >
                                    SHOW MORE...
                                </Button>
                            )}
                            <Collapse in={open1}>
                                <Card.Text>
                                    The 2024 AGM will be at 11am on the 9th
                                    November at Stanningley Park Bowling Club.
                                    If you have any proposals then contact a
                                    member of the committee before the 6th
                                    November.
                                </Card.Text>
                            </Collapse>
                            {open1 && (
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen1(false)}
                                >
                                    HIDE...
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="light">
                        <Card.Body>
                            <h3>VOLUNTEER DAYS</h3>
                            <Card.Img
                                style={{ width: '100%', height: 'auto' }}
                                variant="top"
                                src={volunteeringImage}
                            />
                            <br />
                            <br />
                            {!open2 && (
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen2(true)}
                                >
                                    SHOW MORE...
                                </Button>
                            )}
                            <Collapse in={open2}>
                                <Card.Text>
                                    We are looking for volunteers to help keep
                                    the club clean and tidy over winter. Regular
                                    volunteer days are planed every other
                                    Saturday between 10am and 12pm. Members and
                                    non-members are welcome to help out.
                                </Card.Text>
                            </Collapse>
                            {open2 && (
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen2(false)}
                                >
                                    HIDE...
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="light">
                        <Card.Body>
                            <h3>LADIES TEAM</h3>
                            <Card.Img
                                style={{ width: '100%', height: 'auto' }}
                                variant="top"
                                src={volunteeringImage}
                            />
                            <br />
                            <br />
                            {!open3 && (
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen3(true)}
                                >
                                    SHOW MORE...
                                </Button>
                            )}
                            <Collapse in={open3}>
                                <Card.Text>
                                    We are looking to enter a team into the
                                    Leeds Ladies League for the 2025 season. If
                                    you are interested in playing then please
                                    contact a club member. No experience is
                                    necessary.
                                </Card.Text>
                            </Collapse>
                            {open3 && (
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen3(false)}
                                >
                                    HIDE...
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default News;
