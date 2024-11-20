import { Row } from 'react-bootstrap';
import StatsTile from './statsTile';
import { PlayerStatAggregatesTilesProps } from '../../types/interfaces';

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
