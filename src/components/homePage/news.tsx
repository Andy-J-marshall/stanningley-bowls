import { useState } from 'react';
import { Button, Card, Collapse, Col, Row } from 'react-bootstrap';
import news1Img from '../../images/news/fundraising.png';
import news2Img from '../../images/news/volunteering.png';
import news3Img from '../../images/news/ladies.png';
import news from '../../news.json';

function News() {
    const [expandNews1, setExpandNews1] = useState(false);
    const [expandNews2, setExpandNews2] = useState(false);
    const [expandNews3, setExpandNews3] = useState(false);

    function handleNewsExpand1() {
        setExpandNews1(!expandNews1);
        setExpandNews2(false);
        setExpandNews3(false);
    }

    function handleNewsExpand2() {
        setExpandNews2(!expandNews2);
        setExpandNews1(false);
        setExpandNews3(false);
    }

    function handleNewsExpand3() {
        setExpandNews3(!expandNews3);
        setExpandNews1(false);
        setExpandNews2(false);
    }

    const newsItems = [
        {
            title: news[0].title,
            openingLine: news[0].openingLine,
            mainText: news[0].mainText,
            linkText: news[0].linkText,
            link: news[0].link,
            imgSrc: news1Img,
            callback: handleNewsExpand1,
            expanded: expandNews1,
        },
        {
            title: news[1].title,
            openingLine: news[1].openingLine,
            mainText: news[1].mainText,
            linkText: news[1].linkText,
            link: news[1].link,
            imgSrc: news2Img,
            callback: handleNewsExpand2,
            expanded: expandNews2,
        },
        {
            title: news[2].title,
            openingLine: news[2].openingLine,
            mainText: news[2].mainText,
            linkText: news[2].linkText,
            link: news[2].link,
            imgSrc: news3Img,
            callback: handleNewsExpand3,
            expanded: expandNews3,
        },
    ];

    return (
        <div id="news">
            <h1>latest news</h1>
            <Row xs={1} lg={3} className="g-4 align-items-start">
                {newsItems.map((item, index) => {
                    return (
                        <Col key={index}>
                            <Card style={{ minHeight: '490px' }} bg="light">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>
                                        {item.title.toUpperCase()}
                                    </Card.Title>
                                    <Card.Img
                                        style={{ paddingBottom: '1rem' }}
                                        variant="top"
                                        src={item.imgSrc}
                                    />
                                    {item.expanded && (
                                        <Card.Text className="flex-grow-1">
                                            {item.openingLine}
                                        </Card.Text>
                                    )}
                                    {!item.expanded && (
                                        <Card.Text className="flex-grow-1">
                                            {item.openingLine.length > 100 &&
                                            !item.expanded
                                                ? `${item.openingLine.substring(
                                                      0,
                                                      100
                                                  )}...`
                                                : item.openingLine}
                                        </Card.Text>
                                    )}
                                    {!item.expanded && (
                                        <div className="d-flex justify-content-end mt-auto">
                                            <Button
                                                variant="light"
                                                onClick={() => item.callback()}
                                                className="w-100"
                                            >
                                                READ MORE
                                            </Button>
                                        </div>
                                    )}
                                    <Collapse in={item.expanded}>
                                        <div>
                                            <Card.Text>
                                                {item.mainText}
                                            </Card.Text>
                                            {item.linkText && (
                                                <Button
                                                    style={{
                                                        marginBottom: '1rem',
                                                        backgroundColor:
                                                            '#0081a4',
                                                    }}
                                                >
                                                    <a
                                                        className="carousel-link"
                                                        href={item.link}
                                                        target="_blank"
                                                    >
                                                        {item.linkText}
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </Collapse>
                                    {item.expanded && (
                                        <Button
                                            variant="light"
                                            onClick={() => item.callback()}
                                        >
                                            CLOSE
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default News;
