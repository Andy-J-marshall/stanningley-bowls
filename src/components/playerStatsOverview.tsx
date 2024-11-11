import { Accordion } from 'react-bootstrap';
import { PlayerStatsComponentsProps } from '../types/interfaces';
import PlayerStatTiles from './playerStatTiles';

function PlayerStatsOverview(props: PlayerStatsComponentsProps) {
    const stats = props.stats;

    const { totalLosses, totalWins, gamesPlayed, average, biggestWin } = stats;

    return (
        <div id="player-stats-overview">
            <Accordion.Item eventKey="0">
                <Accordion.Header id="stats-overview">
                    OVERVIEW
                </Accordion.Header>
                <Accordion.Body>
                    <PlayerStatTiles
                        games={gamesPlayed}
                        average={average}
                        wins={totalWins}
                        losses={totalLosses}
                        biggestWin={biggestWin}
                        idPrefix="total"
                    />
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsOverview;
