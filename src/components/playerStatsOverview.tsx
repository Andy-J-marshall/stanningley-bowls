import { Accordion, Row } from 'react-bootstrap';
import StatTile from './statTile';
import { capitalizeText } from '../helpers/utils';
import { PlayerStatsComponentsProps } from '../types/interfaces';

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
                    <Row
                        style={{ padding: 0, margin: '0 0.5rem' }}
                        xs={2}
                        md={3}
                        className="g-4 align-items-start"
                    >
                        <StatTile
                            title="GAMES"
                            bodyText={gamesPlayed}
                            id="totalGamesPlayed"
                        />
                        <StatTile
                            title="WINS"
                            bodyText={totalWins}
                            id="totalWins"
                        />
                        <StatTile
                            title="LOSSES"
                            bodyText={totalLosses}
                            id="totalLosses"
                        />
                        {average >= -26 && average <= 26 && (
                            <StatTile
                                title="AVERAGE"
                                bodyText={average.toFixed(2)}
                                id="totalAverage"
                            />
                        )}
                        <StatTile
                            title="WIN %"
                            bodyText={
                                ((totalWins / gamesPlayed) * 100).toFixed(0) +
                                '%'
                            }
                            id="WinPerc"
                        />
                        {biggestWin && totalWins > 0 && (
                            <StatTile
                                title="BEST WIN"
                                bodyText={capitalizeText([biggestWin])}
                                id="biggestWin"
                            />
                        )}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsOverview;
