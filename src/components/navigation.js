import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '../config';

function Navigation() {
    return (
        <Navbar
            collapseOnSelect
            id="navbar"
            fixed="top"
            bg="light"
            variant="light"
            expand="md"
        >
            <Container fluid>
                <Navbar.Brand as={Link} to="/" href="/home">
                    {config.teamNames.abbreviatedName}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto"
                        style={{ maxHeight: '700px' }}
                        navbarScroll
                    >
                        <NavDropdown
                            title="MEMBERSHIP & TEAMS"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item
                                as={Link}
                                to="/membership"
                                className="tabs navigation"
                                style={{ textDecoration: 'none' }}
                            >
                                <Nav.Link
                                    as="div"
                                    href="/membership"
                                    eventKey="/membership"
                                >
                                    MEMBERSHIP
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                                as={Link}
                                to="/team-and-social"
                                className="tabs navigation"
                                style={{ textDecoration: 'none' }}
                            >
                                <Nav.Link
                                    as="div"
                                    href="/team-and-social"
                                    eventKey="/team-and-social"
                                >
                                    TEAM & SOCIAL BOWLING
                                </Nav.Link>
                            </Nav.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="FIXTURES & RESULTS"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item
                                as={Link}
                                to="/fixtures"
                                className="tabs navigation"
                                style={{ textDecoration: 'none' }}
                            >
                                <Nav.Link
                                    as="div"
                                    href="/fixtures"
                                    eventKey="/fixtures"
                                >
                                    FIXTURES
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                                as={Link}
                                to="/results"
                                className="tabs navigation"
                                style={{ textDecoration: 'none' }}
                            >
                                <Nav.Link
                                    as="div"
                                    href="/results"
                                    eventKey="/results"
                                >
                                    RESULTS
                                </Nav.Link>
                            </Nav.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="STATS"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item
                                as={Link}
                                to="/stats/player"
                                className="tabs"
                                style={{ textDecoration: 'none' }}
                            >
                                <Nav.Link
                                    as="div"
                                    href="/stats/player"
                                    eventKey="/stats/player"
                                >
                                    PLAYER STATS
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                                as={Link}
                                to="/stats/team"
                                className="tabs"
                                style={{ textDecoration: 'none' }}
                            >
                                <Nav.Link
                                    as="div"
                                    href="/stats/team"
                                    eventKey="/stats/team"
                                >
                                    TEAM STATS
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                                as={Link}
                                to="/stats/records"
                                className="tabs"
                                style={{ textDecoration: 'none' }}
                            >
                                <Nav.Link
                                    as="div"
                                    href="/stats/records"
                                    eventKey="/stats/records"
                                >
                                    RECORDS
                                </Nav.Link>
                            </Nav.Item>
                        </NavDropdown>
                        <Nav.Item
                            as={Link}
                            to="/contact"
                            className="navigation"
                            style={{ textDecoration: 'none' }}
                        >
                            <Nav.Link
                                as="div"
                                href="/contact"
                                eventKey="/contact"
                            >
                                CONTACT
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item
                            as={Link}
                            to="/history"
                            className="navigation"
                            style={{ textDecoration: 'none' }}
                        >
                            <Nav.Link
                                as="div"
                                href="/history"
                                eventKey="/history"
                            >
                                HISTORY
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
