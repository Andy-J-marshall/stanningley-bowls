import { Card } from 'react-bootstrap';
import agmImage from '../images/news/agm-2024.png';
import volunteeringImage from '../images/news/volunteering.png';

function News() {
    return (
        <div id="news">
            <Card bg="light">
                <Card.Body>
                    <Card.Title>AGM</Card.Title>
                    <Card.Text>
                        The 2024 AGM will be at 11am on the 9th November at
                        Stanningley Park Bowling Club. If you have any proposals
                        then contact a member of the committee before the 6th
                        November.
                    </Card.Text>
                    <Card.Img
                        style={{ width: '100%', height: 'auto' }}
                        variant="bottom"
                        src={agmImage}
                    />
                </Card.Body>
            </Card>
            <Card bg="light">
                <Card.Body>
                    <Card.Title>VOLUNTEER DAYS</Card.Title>
                    <Card.Text>We are looking for volunteers to help keep the club clean and tidy over winter.</Card.Text>
                    <Card.Img
                        style={{ width: '100%', height: 'auto' }}
                        variant="bottom"
                        src={volunteeringImage}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

export default News;
