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

// TODO add cup wins too?
// TODO move to config?
const teamPhotosUrl =
    'https://photos.google.com/share/AF1QipMmkXau_XJaD1459y7Sdsk7pSoUeAr04SiVP_z07i1u0NzLiVQLBioFHwGF9jHV_A?key=N3VLT0l0VWZEVlNrVm5kQUF3MHl1d2lJNEFDRVNR';
const historicStatsUrl =
    'https://photos.google.com/share/AF1QipOqs9EK2LBhL3uZjas8l1ccFkrkdsY8KpOlajx60sBsUaM_-S4LCr-qLpEj9aRX3Q?key=N1VwMnRwdWlKQU5pcW9lVXk1b09IX3Y1OGxQWlFR';

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
                            <Card.Text>
                                Team photos from the club house
                            </Card.Text>
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
                            <Card.Title>HISTORIC TEAM RECORDS</Card.Title>
                            <Card.Text>
                                Stats from the old record books, 1972-1990
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
            {/* TODO review below wording, and link to contact page? */}
            <p>Below are the Club Cup winners. There are a number of years missing, contact us if you can help fill in the gaps.</p>
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
                <ListGroupItem>2019 - S. Gardner</ListGroupItem>
                <ListGroupItem>2022 - J. Armitage</ListGroupItem>
                <ListGroupItem>2023 - P. Bowes</ListGroupItem>
            </ListGroup>
        </div>
    );
}
export default Contact;
