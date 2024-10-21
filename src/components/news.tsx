import { Card } from 'react-bootstrap';

function News() {
    return (
        <div id="news">
            <Card bg="light">
                <Card.Body>
                    <Card.Title>NEWS HEADER</Card.Title>
                    <Card.Text>Test article</Card.Text>
                </Card.Body>
            </Card>
            <Card bg="light">
                <Card.Body>
                    <Card.Title>NEWS HEADER 2</Card.Title>
                    <Card.Text>Test article 2</Card.Text>
                </Card.Body>
            </Card>
            <Card bg="light">
                <Card.Body>
                    <Card.Title>NEWS HEADER 3</Card.Title>
                    <Card.Text>Test article 3</Card.Text>
                </Card.Body>
                {/* TODO view more button? Link to other page? */}
                {/* TODO add images? */}
            </Card>
        </div>
    );
}

export default News;
