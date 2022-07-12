import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap';
import Stats from './components/stats';
import Footer from './components/footer';
import Supporters from './components/supporters';
import Membership from './components/membership';
import Contact from './components/contact';
import FixturesResults from './components/fixturesResults';
import smallLogo from './images/brand-logo-tiny.png';
import logo from './images/brand-logo.png';
import stan1 from './images/stan1.jpg';
import stan2 from './images/stan2.jpg';
import stan3 from './images/stan3.jpg';
import bowlsStats2022 from './data/bowlsStats2022.json';
import './app.css';

const year = new Date().getFullYear();

function App() {
    const [showHome, setShowHome] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showMembership, setShowMembership] = useState(false);
    const [showFixturesResults, setShowFixturesResults] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const playerResults = bowlsStats2022.playerResults;
    const teamResults = bowlsStats2022.teamResults;

    // TODO Handle multiple years worth of stats
    useEffect(() => {
        window.scrollTo(0, 0);
        const url = window.location.href.toLowerCase();
        if (loaded === false) {
            if (
                url.includes('#records') ||
                url.includes('#stats') ||
                url.includes('-stats')
            ) {
                displayStats();
            }
            if (url.includes('#membership')) {
                displayMembership();
            }
            if (url.includes('#fixtures-results')) {
                displayFixturesResults();
            }
            if (url.includes('#contact')) {
                displayContactInfo();
            }
            if (url.includes('#home')) {
                setShowHome();
            }
            setLoaded(true);
        }
    });

    const onSelect = (selectedKey) => {
        if (selectedKey === '#homepage') {
            displayHome();
        }
        if (selectedKey === '#membership') {
            displayMembership();
        }
        if (selectedKey === '#fixtures-results') {
            displayFixturesResults();
        }
        if (selectedKey === '#stats') {
            displayStats();
        }
        if (selectedKey === '#contact') {
            displayContactInfo();
        }
    };

    function displayHome() {
        setShowHome(true);
        setShowContactInfo(false);
        setShowFixturesResults(false);
        setShowMembership(false);
        setShowStats(false);
    }

    function displayContactInfo() {
        setShowContactInfo(true);
        setShowFixturesResults(false);
        setShowMembership(false);
        setShowStats(false);
        setShowHome(false);
    }

    function displayFixturesResults() {
        setShowFixturesResults(true);
        setShowMembership(false);
        setShowStats(false);
        setShowContactInfo(false);
        setShowHome(false);
    }

    function displayMembership() {
        setShowMembership(true);
        setShowStats(false);
        setShowFixturesResults(false);
        setShowContactInfo(false);
        setShowHome(false);
    }

    function displayStats() {
        setShowStats(true);
        setShowMembership(false);
        setShowFixturesResults(false);
        setShowContactInfo(false);
        setShowHome(false);
    }
    return (
        <div id="home">
            <Navbar
                collapseOnSelect
                id="navbar"
                fixed="top"
                bg="light"
                variant="light"
                expand="md"
            >
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img
                            alt="logo"
                            src={smallLogo}
                            width="52px"
                            height="52px"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto"
                            style={{ maxHeight: '700px' }}
                            navbarScroll
                            activeKey="#homepage"
                            onSelect={onSelect}
                        >
                            <Nav.Item>
                                <Nav.Link href="#homepage" eventKey="#homepage">
                                    HOME
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    href="#membership"
                                    eventKey="#membership"
                                >
                                    MEMBERSHIP
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    href="#fixtures-results"
                                    eventKey="#fixtures-results"
                                >
                                    FIXTURES & RESULTS
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#stats" eventKey="#stats">
                                    STATS
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#contact" eventKey="#contact">
                                    CONTACT
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div id="header">
                <img
                    alt="logo"
                    src={logo}
                    width="240"
                    height="240"
                    className="d-inline-block align-top"
                />
            </div>
            {showFixturesResults && (
                <FixturesResults teamResults={teamResults} />
            )}
            {showContactInfo && <Contact />}
            {showMembership && <Membership />}
            {showStats && (
                <Stats
                    playerResults={playerResults}
                    teamResults={teamResults}
                />
            )}

            {(showHome ||
                (!showStats &&
                    !showFixturesResults &&
                    !showContactInfo &&
                    !showMembership &&
                    !showHome)) && (
                <div className="center" style={{ width: '90%' }} id="home-page">
                    <div className="center page-component">
                        <p>
                            Welcome to Stanningley Park Bowling Club's website.
                            <br /> <br /> Find out about membership, upcoming
                            fixures and player stats.
                        </p>
                        <Nav
                            activeKey="#homepage"
                            onSelect={onSelect}
                            className="tabs"
                        >
                            <Carousel fade>
                                <Carousel.Item>
                                    <img src={stan1} alt="Membership slide" />
                                    <Carousel.Caption>
                                        <Nav.Item>
                                            <Nav.Link
                                                style={{ color: 'white' }}
                                                href="#membership"
                                            >
                                                <h5>Membership Options</h5>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={stan2} alt="Stats slide" />

                                    <Carousel.Caption>
                                        <Nav.Item>
                                            <Nav.Link
                                                style={{ color: 'white' }}
                                                href="#stats"
                                            >
                                                <h5>Team and Player Stats</h5>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={stan3} alt="Fixtures slide" />

                                    <Carousel.Caption>
                                        <Nav.Item>
                                            <Nav.Link
                                                style={{ color: 'white' }}
                                                href="#fixtures-results"
                                            >
                                                <h5>Fixtures and Results</h5>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Nav>
                    </div>

                    <h3>SUPPORTERS</h3>
                    <Supporters />
                </div>
            )}
            <Footer />
        </div>
    );
}

export default App;
