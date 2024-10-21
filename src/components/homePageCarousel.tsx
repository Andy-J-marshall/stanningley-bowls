import { Nav, Carousel, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import statsImg from '../images/websiteImages/carousel-01.png';
import membershipImg from '../images/websiteImages/carousel-02.png';
import eventsImg from '../images/websiteImages/carousel-05.png';
import { config } from '../config';

// TODO improve image size
// TODO improve image dimensions

function HomePageCarousel() {
    return (
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
    );
}

export default HomePageCarousel;
