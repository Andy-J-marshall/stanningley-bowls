import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Stats from './components/stats';
import Footer from './components/footer';
import Membership from './components/membership';
import Contact from './components/contact';
import Fixtures from './components/fixtures';
import Home from './components/home';
import smallLogo from './images/brand-logo-tiny.png';
import logo from './images/brand-logo.png';
import './app.css';

function App() {
    const [showHome, setShowHome] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showMembership, setShowMembership] = useState(false);
    const [showFixtures, setShowFixtures] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // TODO Handle multiple years worth of stats
    useEffect(() => {
        window.scrollTo(0, 0);
        const url = window.location.href.toLowerCase();
        if (loaded === false) {
            if (
                url.includes('/records') ||
                url.includes('/stats') ||
                url.includes('-stats')
            ) {
                displayStats();
            }
            if (url.includes('/membership')) {
                displayMembership();
            }
            if (url.includes('/fixtures')) {
                displayFixtures();
            }
            if (url.includes('/contact')) {
                displayContactInfo();
            }
            if (url.includes('/home')) {
                setShowHome();
            }
            setLoaded(true);
        }
    });

    function displayHome() {
        setShowHome(true);
        setShowContactInfo(false);
        setShowFixtures(false);
        setShowMembership(false);
        setShowStats(false);
    }

    function displayContactInfo() {
        setShowContactInfo(true);
        setShowFixtures(false);
        setShowMembership(false);
        setShowStats(false);
        setShowHome(false);
    }

    function displayFixtures() {
        setShowFixtures(true);
        setShowMembership(false);
        setShowStats(false);
        setShowContactInfo(false);
        setShowHome(false);
    }

    function displayMembership() {
        setShowMembership(true);
        setShowStats(false);
        setShowFixtures(false);
        setShowContactInfo(false);
        setShowHome(false);
    }

    function displayStats() {
        setShowStats(true);
        setShowMembership(false);
        setShowFixtures(false);
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
                    <Navbar.Brand href="/home">
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
                            activeKey="/home"
                            onSelect={(selectedKey) => {
                                if (selectedKey === '/home') {
                                    displayHome();
                                }
                                if (selectedKey === '/membership') {
                                    displayMembership();
                                }
                                if (selectedKey === '/fixtures') {
                                    displayFixtures();
                                }
                                if (selectedKey === '/stats') {
                                    displayStats();
                                }
                                if (selectedKey === '/contact') {
                                    displayContactInfo();
                                }
                            }}
                        >
                            <Nav.Item>
                                <Nav.Link href="/home" eventKey="/home">HOME</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    href="/membership"
                                    eventKey="/membership"
                                >
                                    MEMBERSHIP
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/fixtures" eventKey="/fixtures">
                                    FIXTURES
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/stats" eventKey="/stats">
                                    STATS
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/contact" eventKey="/contact">
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
            {showFixtures && <Fixtures />}
            {showContactInfo && <Contact />}
            {showMembership && <Membership />}
            {showStats && <Stats />}
            {showHome && <Home />}
            {!showStats &&
                !showFixtures &&
                !showContactInfo &&
                !showMembership &&
                !showHome && <Home />}
            {/* TODO add info on supporters */}
            {/* TODO add Results, and result records */}
            <Footer />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                crossOrigin="anonymous"
            />
        </div>
    );
}

export default App;
