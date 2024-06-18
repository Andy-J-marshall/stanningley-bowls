import {
    Card,
    Button,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';
import historicTeamImage from '../images/websiteImages/historic-team-photo.webp';
import historicStatsImage from '../images/websiteImages/historic-stats.webp';
import config from '../config';

const { emailUrl, teamPhotosUrl, historicStatsUrl } = config.socialLinks;

// TODO add cup wins too?

function Contact() {
    return (
        <div id="history-page" className="page-component center">
            <h1>HISTORY</h1>
            {/* TODO make images same size */}
            <Row sm={1} md={2} lg={3} xl={4} className="g-4 tabs">
                <Col>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Img
                            alt="historic-team-photos"
                            variant="top"
                            src={historicTeamImage}
                        />
                        <Card.Body>
                            <Card.Title>TEAM PHOTOS</Card.Title>
                            <Card.Text>Photos from the club house</Card.Text>
                            <Button
                                style={{ backgroundColor: '#0081a4' }}
                                href={teamPhotosUrl}
                                target="_blank"
                                variant="secondary"
                            >
                                View the photo album
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Img
                            alt="historic-team-stats"
                            variant="top"
                            src={historicStatsImage}
                        />
                        <Card.Body>
                            <Card.Title>HISTORIC STATS</Card.Title>
                            <Card.Text>
                                Stats 1972-1990
                            </Card.Text>
                            <Button
                                style={{ backgroundColor: '#0081a4' }}
                                href={historicStatsUrl}
                                target="_blank"
                                variant="secondary"
                            >
                                View the photo album
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            <h2>CLUB CUP WINNERS</h2>
            <ListGroup className="page-center">
                <ListGroupItem>1950 - N. Dewhirst</ListGroupItem>
                <ListGroupItem>1951 - E. Foskett</ListGroupItem>
                <ListGroupItem>1952 - G. Greaves</ListGroupItem>
                <ListGroupItem>1953 - A. Key</ListGroupItem>
                <ListGroupItem>1954 - N. Wilkinson</ListGroupItem>
                <ListGroupItem>1955 - J. Learoyd</ListGroupItem>
                <ListGroupItem>1956 - G. Greaves</ListGroupItem>
                <ListGroupItem>1957 - J.H. Bennet</ListGroupItem>
                <ListGroupItem>1958 - J. Darnborough</ListGroupItem>
                <ListGroupItem>1959 - J. Crampton</ListGroupItem>
                <ListGroupItem>1960 - F. Ward</ListGroupItem>
                <ListGroupItem>1961 - N. Wilkinson</ListGroupItem>
                <ListGroupItem>1962 - S. Gregory</ListGroupItem>
                <ListGroupItem>1963 - V. Hill</ListGroupItem>
                <ListGroupItem>1964 - H. Hall</ListGroupItem>
                <ListGroupItem>1965 - H. Hall</ListGroupItem>
                <ListGroupItem>1966 - J.H. Bennet</ListGroupItem>
                <ListGroupItem>1967 - H. Hall</ListGroupItem>
                <ListGroupItem>1968 - H. Hall</ListGroupItem>
                <ListGroupItem>1969 - H. Hall</ListGroupItem>
                <ListGroupItem>1970 - V. Hill</ListGroupItem>
                <ListGroupItem>1971 - W. Lupton</ListGroupItem>
                <ListGroupItem>1972 - W. Ainge</ListGroupItem>
                <ListGroupItem>1973 - A. Dearnley</ListGroupItem>
                <ListGroupItem>1974 - H. Hall</ListGroupItem>
                <ListGroupItem>1975 - B. Richards</ListGroupItem>
                <ListGroupItem>1976 - B. Lynch</ListGroupItem>
                <ListGroupItem>1977 - T. Warrington</ListGroupItem>
                <ListGroupItem>1978 - V. Hill</ListGroupItem>
                <ListGroupItem>1979 - D. Cooper</ListGroupItem>
                <ListGroupItem>1980 - M. Threapleton</ListGroupItem>
                <ListGroupItem>1981 - A. Parker</ListGroupItem>
                <ListGroupItem>1982 - M.V. Shaw</ListGroupItem>
                <ListGroupItem>1983 - M.V. Shaw</ListGroupItem>
                <ListGroupItem>1984 - C. Farquharson</ListGroupItem>
                <ListGroupItem>1985 - A. Parker</ListGroupItem>
                <ListGroupItem>1986 - D. McPhail</ListGroupItem>
                <ListGroupItem>1999 - M. Shaw</ListGroupItem>
                <ListGroupItem>2014 - C. Brogie</ListGroupItem>
                <ListGroupItem>2022 - J. Armitage</ListGroupItem>
                <ListGroupItem>2023 - P. Bowes</ListGroupItem>
            </ListGroup>
            <br />
            <p>
                There are a number of years missing,{' '}
                <a style={{ textDecoration: 'none' }} href={emailUrl}>
                    contact us
                </a>{' '}
                if you can help fill in the gaps.
            </p>
        </div>
    );
}
export default Contact;
