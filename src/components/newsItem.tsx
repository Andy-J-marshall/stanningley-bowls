import { useState } from 'react';
import { Button, Card, Col, Collapse } from 'react-bootstrap';
import { NewsItemProps } from '../types/interfaces';

function NewsItem(props: NewsItemProps) {
    const title = props.title.toUpperCase();
    const text = props.firstParagraph;
    const text2 = props.secondParagraph;
    const imgSrc = props.imgSrc;

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Col>
            {/* TODO add a text preview to the news item */}
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
                            <div>
                                <Card.Text>{text}</Card.Text>
                                <Card.Text>{text2}</Card.Text>
                            </div>
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
