import { Card } from 'react-bootstrap';

function statsTile(props) {
    const title = props.title;
    const bodyText = props.bodyText;
    const id = props.id;
    // TODO create props type (id=optional)

    return (
        <Card bg="light">
            <Card.Body>
                <Card.Title>{title.toUpperCase()}</Card.Title>
                <Card.Text id={id ?? null}>{bodyText}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default statsTile;
