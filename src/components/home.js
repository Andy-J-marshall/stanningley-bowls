import React from 'react';
import { Nav, Carousel } from 'react-bootstrap';
import Supporters from './supporters';
import stanImg1 from '../images/websiteImages/stan-green.webp';
import stanImg2 from '../images/websiteImages/stan-green2.webp';
import stanImg3 from '../images/websiteImages/stan-green3.webp';

// TODO carousel arrows disappeared?
function Home() {
    return (
        <div className="center" id="home-page">
            <div className="center page-component">
                <Nav activeKey="/home" className="tabs">
                    <Carousel fade>
                        <Carousel.Item>
                            <img src={stanImg1} alt="Membership slide" />
                            <Carousel.Caption>
                                <Nav.Item>
                                    <Nav.Link
                                        style={{
                                            color: 'white',
                                        }}
                                        href="/membership"
                                    >
                                        <h2>Membership</h2>
                                    </Nav.Link>
                                </Nav.Item>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={stanImg2} alt="Stats slide" />
                            <Carousel.Caption>
                                <Nav.Item>
                                    <Nav.Link
                                        style={{
                                            color: 'white',
                                        }}
                                        href="/stats"
                                    >
                                        <h2>Team & Player Stats</h2>
                                    </Nav.Link>
                                </Nav.Item>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={stanImg3} alt="Fixtures slide" />

                            <Carousel.Caption>
                                <Nav.Item>
                                    <Nav.Link
                                        style={{
                                            color: 'white',
                                        }}
                                        href="/fixtures-and-results"
                                    >
                                        <h2>Fixtures & Results</h2>
                                    </Nav.Link>
                                </Nav.Item>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Nav>
            </div>
            <Supporters />
        </div>
    );
}

export default Home;
