import { Row } from 'react-bootstrap';
import { PlayerStatAggregatesTilesProps } from '../types/interfaces';
import StatsTile from './statsTile';

function PlayerStatAggregateTiles(props: PlayerStatAggregatesTilesProps) {
    const aggFor = props.aggFor;
    const aggAgainst = props.aggAgainst;
    const idPrefix = props.idPrefix;

    return (
        <Row xs={2} className="g-4 align-items-start">
            <StatsTile title="FOR" bodyText={aggFor} id={idPrefix + 'AggFor'} />

            <StatsTile
                title="AGAINST"
                bodyText={aggAgainst}
                id={idPrefix + 'AggAgainst'}
            />
        </Row>
    );
}

export default PlayerStatAggregateTiles;
