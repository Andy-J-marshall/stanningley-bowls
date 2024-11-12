import { Card } from 'react-bootstrap';
import { StatsTileProps } from '../../types/interfaces';

function statsTile(props: StatsTileProps) {
    const title = props.title;
    const bodyText = props.bodyText;
    const id = props.id;

    return (
        <Card bg="light">
            <Card.Body>
                <Card.Title>{title.toUpperCase()}</Card.Title>
                <Card.Text id={id ?? ''}>{bodyText}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default statsTile;
