import { Nav, Carousel, Image, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import statsImg from '../images/carousel/carousel-4.png';
import membershipImg from '../images/carousel/carousel-2.png';
import eventsImg from '../images/carousel/carousel-3.png';
import { config } from '../config';

// TODO improve image dimensions?

function HomePageCarousel() {
    return (
        <Container fluid>
            <Nav defaultActiveKey="/home" className="tabs">
                <Carousel fade>
                    <Carousel.Item>
                        <Image src={statsImg} fluid />
                        <Carousel.Caption>
                            <NavLink
                                to="/stats/player"
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                <h2>PLAYER STATS</h2>
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={membershipImg} fluid />
                        <Carousel.Caption>
                            <NavLink
                                to="/membership"
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                <h2>MEMBERSHIP</h2>
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={eventsImg} fluid />
                        <Carousel.Caption>
                            <a
                                target="_blank"
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                                href={`${config.socialLinks.facebookUrl}/events`}
                            >
                                <h2 style={{ margin: '16px' }}>EVENTS</h2>
                            </a>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Nav>
        </Container>
    );
}

export default HomePageCarousel;
