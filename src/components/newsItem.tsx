import { useState } from 'react';
import { Button, Card, Col, Collapse } from 'react-bootstrap';

// TODO add a link to FB event?
// TODO add type for props
function NewsItem(props) {
    const title = props.title.toUpperCase();
    const text = props.text;
    const imgSrc = props.imgSrc;

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Col>
                <Card bg="light">
                    <Card.Body>
                        <h4>{title}</h4>
                        <Card.Img
                            style={{ width: '100%', height: 'auto' }}
                            variant="top"
                            src={imgSrc}
                        />
                        <br />
                        <br />
                        {!open && (
                            <Button
                                variant="light"
                                onClick={() => setOpen(true)}
                            >
                                READ MORE...
                            </Button>
                        )}
                        <Collapse in={open}>
                            <Card.Text>{text}</Card.Text>
                        </Collapse>
                        {open && (
                            <Button
                                variant="light"
                                onClick={() => setOpen(false)}
                            >
                                CLOSE
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
}

export default NewsItem;
