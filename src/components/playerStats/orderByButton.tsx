import { Button } from 'react-bootstrap';
import { orderByButtonProps } from '../../types/interfaces';

function OrderByButton(props: orderByButtonProps) {
    const name = props.name;
    const orderByCallback = props.orderByCallback;

    return (
        <Button
            id={name + '-order-by-button'}
            variant="light"
            onClick={orderByCallback}
            style={{
                backgroundColor: 'white',
                border: 'none',
                padding: '0',
            }}
        >
            {name}
        </Button>
    );
}

export default OrderByButton;
