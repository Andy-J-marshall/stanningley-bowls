import { useState } from 'react';
import { config } from '../config';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';

function MembershipDocs() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="center" style={{ padding: '1.5rem' }}>
            <Button variant="primary" onClick={handleShow}>
                Membership Documents
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Documents</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <a
                                target="_blank"
                                href="https://drive.google.com/file/d/16t4A7AfzcBtd4s9TEEXvKuHFCoPYuakQ/view?usp=drive_link"
                                download
                                className="link"
                            >
                                BCGBA Membership Registration Form
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a
                                target="_blank"
                                href="https://drive.google.com/file/d/17-JRHQfRHVJxphj8cDQhsx6pFdMh7u5o/view?usp=drive_link"
                                download
                                className="link"
                            >
                                {config.teamNames.shortName} Constitution
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a
                                target="_blank"
                                href="https://drive.google.com/file/d/16kUu4uQ9X9ScvPTap4fRJRT8w28uqIQc/view?usp=drive_link"
                                download
                                className="link"
                            >
                                Code of Conduct
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a
                                target="_blank"
                                href="https://drive.google.com/file/d/16vxyxvAqPH311HK6_5zQ0dRW5zfweB7N/view?usp=drive_link"
                                download
                                className="link"
                            >
                                Safeguarding Policy
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a
                                target="_blank"
                                href="https://www.bcgba.org.uk/laws-of-the-game/"
                                className="link"
                            >
                                Crown Green Bowling Rules
                            </a>
                        </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default MembershipDocs;
