import { Accordion } from 'react-bootstrap';

function PlayerStatsOpponents(props) {
    const stats = props.stats;

    const { beatenByList, beatenOpponentsList } = stats;

    return (
        <div id="player-stats-opponents">
            <Accordion.Item eventKey="6">
                <Accordion.Header id="stats-opponents">
                    OPPONENTS
                </Accordion.Header>
                <Accordion.Body>
                    {beatenOpponentsList.length > 0 && (
                        <div>
                            <h3>PLAYERS BEATEN</h3>
                            <p>{beatenOpponentsList}</p>
                        </div>
                    )}
                    {beatenByList.length > 0 && (
                        <div>
                            <h3>PLAYERS LOST TO</h3>
                            <p>{beatenByList}</p>
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsOpponents;
