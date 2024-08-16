import { Nav, Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Supporters from './supporters';
import Fixtures from './fixtures';
import statsImg from '../images/websiteImages/carousel-01.webp';
import membershipImg from '../images/websiteImages/carousel-02.webp';
import fixturesImg from '../images/websiteImages/carousel-03.webp';
import eventsImg from '../images/websiteImages/carousel-05.webp';
import config from '../config';

function Home() {
    return (
        <div className="center page-component" id="home-page">
            <div>
                <Nav defaultActiveKey="/home" className="tabs">
                    <Carousel fade>
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
                    </Carousel>
                </Nav>
            </div>
            <br />
            <p style={{ width: '90%' }} className="center">
                {config.teamNames.fullName} is a crown green bowling club
                situated within Stanningley Park, West Leeds. New members of all
                ages and abilities are welcome and we have numerous social
                events to get involved in. If you are interested in competing
                then we are always looking for dedicated bowlers to join our
                teams.
            </p>
            <br />
            <Fixtures />
            <Supporters />
        </div>
    );
}

export default Home;
