import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Stats from './stats';
import Footer from './footer';
import Membership from './membership';
import Contact from './contact';
import Fixtures from './fixtures';
import smallLogo from '../images/brand-logo-tiny.png';
import logo from '../images/brand-logo.png';

function Home() {
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
                url.includes('#records') ||
                url.includes('#stats') ||
                url.includes('-stats')
            ) {
                displayStats();
            }
            if (url.includes('#membership')) {
                displayMembership();
            }
            if (url.includes('#fixtures')) {
                displayFixtures();
            }
            if (url.includes('#contact')) {
                displayContactInfo();
            }
            // TODO change this when homepage created
            if (url.includes('#home')) {
                displayContactInfo();
            }
            setLoaded(true);
        }
    });

    function displayContactInfo() {
        setShowContactInfo(true);
        setShowFixtures(false);
        setShowMembership(false);
        setShowStats(false);
    }

    function displayFixtures() {
        setShowFixtures(true);
        setShowMembership(false);
        setShowStats(false);
        setShowContactInfo(false);
    }

    function displayMembership() {
        setShowMembership(true);
        setShowStats(false);
        setShowFixtures(false);
        setShowContactInfo(false);
    }

    function displayStats() {
        setShowStats(true);
        setShowMembership(false);
        setShowFixtures(false);
        setShowContactInfo(false);
    }

    /* TODO Home tab? Or move this to app.js? */
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
                        >
                            <Nav.Link
                                onSelect={displayMembership}
                                href="#membership"
                            >
                                MEMBERSHIP
                            </Nav.Link>
                            <Nav.Link
                                onSelect={displayFixtures}
                                href="#fixtures"
                            >
                                FIXTURES
                            </Nav.Link>
                            <Nav.Link onSelect={displayStats} href="#stats">
                                STATS
                            </Nav.Link>
                            <Nav.Link
                                onSelect={displayContactInfo}
                                href="#contact"
                            >
                                CONTACT
                            </Nav.Link>
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
            {/* TODO change this to a proper home page */}
            {!showStats &&
                !showFixtures &&
                !showContactInfo &&
                !showMembership && <Contact />}
            {/* TODO Add current league position into stats */}
            {/* TODO add info on supporters */}
            {/* TODO add Results */}
            {/* TODO add a membership page? */}
            <Footer />
        </div>
    );
}

export default Home;
