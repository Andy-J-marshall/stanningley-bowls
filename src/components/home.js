import { Nav, Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Supporters from './supporters';
import statsImg from '../images/websiteImages/carousel-01.webp';
import membershipImg from '../images/websiteImages/carousel-02.webp';
import fixturesImg from '../images/websiteImages/carousel-03.webp';
import eventsImg from '../images/websiteImages/carousel-05.webp';
import config from '../config';

function Home() {
    return (
        <div id="home-page">
            <div className="center page-component">
                <Nav defaultActiveKey="/home" className="tabs">
                    <Carousel fade>
                        <Carousel.Item>
                            <img src={membershipImg} alt="Membership slide" />
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
                            <img src={eventsImg} alt="Events slide" />
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
                        <Carousel.Item>
                            <img src={statsImg} alt="Stats slide" />
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
                            <img src={fixturesImg} alt="Fixtures slide" />
                            <Carousel.Caption>
                                <Nav.Link
                                    to="/fixtures"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <h2>FIXTURES</h2>
                                </Nav.Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Nav>
            </div>
            <p className="center page-component" style={{ width: '80%' }}>
                {config.teamNames.fullName} is a family friendly crown green
                bowling club situated within Stanningley Park, West Leeds.
                Surrounded by trees, the green is a secure and tranquil place to
                play bowls. New members of all ages and abilities are welcome
                and we have numerous social events to get involved in. The club
                has proved to be a strong contender in the {config.leagues}{' '}
                leagues so if you are interested in competing then we are always
                looking for dedicated bowlers to join our teams.
            </p>
            <Supporters />
        </div>
    );
}

export default Home;
