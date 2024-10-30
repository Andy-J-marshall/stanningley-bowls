import { Accordion } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import { PlayerStatsComponentsProps } from '../types/interfaces';

function PlayerStatsOverview(props: PlayerStatsComponentsProps) {
    const stats = props.stats;

    const {
        totalLosses,
        totalWins,
        gamesPlayed,
        average,
        biggestWin,
    } = stats;

    return (
        <div id="player-stats-overview">
            <Accordion.Item eventKey="0">
                <Accordion.Header id="stats-overview">
                    OVERVIEW
                </Accordion.Header>
                <Accordion.Body>
                    <div>
                        <h3>STATS</h3>
                        <p id="totalGamesPlayed">Games played: {gamesPlayed}</p>
                        <p id="totalWins">Wins: {totalWins}</p>
                        <p id="totalLosses">Losses: {totalLosses}</p>
                        {average >= -26 && average <= 26 && (
                            <p id="totalAverage">
                                Average: {average.toFixed(2)}
                            </p>
                        )}
                        <p>
                            {' '}
                            Win percentage:{' '}
                            {((totalWins / gamesPlayed) * 100).toFixed(0)}%
                        </p>
                        {biggestWin && totalWins > 0 && (
                            <p id="biggestWin">
                                Biggest win: {capitalizeText([biggestWin])}
                            </p>
                        )}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsOverview;
