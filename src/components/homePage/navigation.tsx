import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoImg from '../../images/logos/brand-logo-blue-bg.png';

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
                    <Image
                        style={{ height: '2.3rem' }}
                        src={logoImg}
                        rounded
                        fluid
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto"
                        style={{ maxHeight: '700px' }}
                        navbarScroll
                    >
                        <NavDropdown
                            title="TEAMS"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item
                                as={Link}
                                to="/teams"
                                className="tabs link"
                            >
                                <Nav.Link
                                    as="div"
                                    href="/teams"
                                    eventKey="/teams"
                                >
                                    INFORMATION
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                                as={Link}
                                to="/fixtures"
                                className="tabs link"
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
                                className="tabs link"
                            >
                                <Nav.Link
                                    as="div"
                                    href="/results"
                                    eventKey="/results"
                                >
                                    RESULTS
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                                as={Link}
                                to="/stats/team"
                                className="tabs link"
                            >
                                <Nav.Link
                                    as="div"
                                    href="/stats/team"
                                    eventKey="/stats/team"
                                >
                                    STATS
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                                as={Link}
                                to="/stats/records"
                                className="tabs link"
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
                        <NavDropdown
                            title="THE CLUB"
                            id="basic-nav-dropdown"
                            className="navigation"
                        >
                            <Nav.Item
                                as={Link}
                                to="/membership"
                                className="tabs link"
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
                                to="/social"
                                className="tabs link"
                            >
                                <Nav.Link
                                    as="div"
                                    href="/social"
                                    eventKey="/social"
                                >
                                    SOCIAL BOWLING
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                                as={Link}
                                to="/history"
                                className="tabs link"
                            >
                                <Nav.Link
                                    as="div"
                                    href="/history"
                                    eventKey="/history"
                                >
                                    HISTORY
                                </Nav.Link>
                            </Nav.Item>
                        </NavDropdown>
                        <Nav.Item
                            as={Link}
                            to="/stats/player"
                            className="navigation link"
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
                            to="/contact"
                            className="navigation link"
                        >
                            <Nav.Link
                                as="div"
                                href="/contact"
                                eventKey="/contact"
                            >
                                CONTACT
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
