import React, { useEffect } from 'react';
import { Nav, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Supporters from './supporters';
import stanImg1 from '../images/websiteImages/carousel-01.webp';
import stanImg2 from '../images/websiteImages/carousel-02.webp';
import stanImg3 from '../images/websiteImages/carousel-03.webp';

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="home-page">
            <div className="center page-component">
                <Nav defaultActiveKey="/home" className="tabs">
                    <Carousel fade>
                        <Carousel.Item>
                            <img src={stanImg1} alt="Membership slide" />
                            <Carousel.Caption>
                                <Nav.Item>
                                    <LinkContainer
                                        style={{
                                            color: 'white',
                                        }}
                                        to="/membership"
                                    >
                                        <Nav.Link href="/membership">
                                            <h2>Membership</h2>
                                        </Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={stanImg2} alt="Stats slide" />
                            <Carousel.Caption>
                                <Nav.Item>
                                    <LinkContainer
                                        style={{
                                            color: 'white',
                                        }}
                                        to="/stats/player"
                                    >
                                        <Nav.Link href="/stats/player">
                                            <h2>Player Stats</h2>
                                        </Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={stanImg3} alt="Fixtures slide" />
                            <Carousel.Caption>
                                <Nav.Item>
                                    <LinkContainer
                                        style={{
                                            color: 'white',
                                        }}
                                        to="/fixtures"
                                    >
                                        <Nav.Link href="/fixtures">
                                            <h2>Fixtures</h2>
                                        </Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Nav>
            </div>
            <p className="center page-component" style={{ width: '80%' }}>
                Stanningley Park Bowling Club is a family friendly crown green
                bowling club situated within Stanningley Park, West Leeds.
                Surrounded by trees, the green is a secure and tranquil place to
                play bowls. New members of all ages and abilities are welcome
                and we have numerous social events to get involved in. The club
                has proved to be a strong contender in the Leeds Parks leagues
                so if you are interested in competing then we are always looking
                for dedicated bowlers to join our teams.
            </p>
            <Supporters />
        </div>
    );
}

export default Home;
