import { Nav, Carousel, Image, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import statsImg from '../../images/carousel/carousel-04.png';
import membershipImg from '../../images/carousel/carousel-02.png';
import eventsImg from '../../images/carousel/carousel-03.png';
import { config } from '../../config';

function HomePageCarousel() {
    return (
        <Container fluid>
            <Nav defaultActiveKey="/home">
                <Carousel fade>
                    <Carousel.Item>
                        <Image src={statsImg} fluid />
                        <Carousel.Caption>
                            <NavLink
                                className="carousel-link"
                                to="/stats/player"
                            >
                                <h2>player stats</h2>
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={membershipImg} fluid />
                        <Carousel.Caption>
                            <NavLink to="/membership" className="carousel-link">
                                <h2>membership</h2>
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={eventsImg} fluid />
                        <Carousel.Caption>
                            <a
                                target="_blank"
                                className="carousel-link"
                                href={`${config.socialLinks.facebookUrl}/events`}
                            >
                                <h2>events</h2>
                            </a>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Nav>
        </Container>
    );
}

export default HomePageCarousel;
