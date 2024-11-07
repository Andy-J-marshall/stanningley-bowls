import { useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { config } from '../config';
import { capitalizeText } from '../helpers/utils';
import PlayerStatsOverview from './playerStatsOverview';
import PlayerStatsWinsLosses from './playerStatsWinsLosses';
import PlayerStatsTeams from './playerStatsTeams';
import PlayerStatsAggregates from './playerStatsAggregates';
import PlayerStatsResults from './playerStatsResults';
import { IndividualPlayerStatsProps } from '../types/interfaces';

function IndividualPlayerStats(props: IndividualPlayerStatsProps) {
    const name = props.name;
    const stats = props.playersStats;
    const showStatSummary = props.showStatSummary;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="detailed-player-stats">
            <h2 style={{ padding: '0.5rem' }} id="playerNameTitle">
                {capitalizeText([name])}
            </h2>
            {stats.gamesPlayed === 0 && (
                <div>
                    {!showStatSummary && (
                        <p>No games played for {config.teamNames.shortName}</p>
                    )}
                    {showStatSummary && <p>No games played</p>}
                </div>
            )}
            {stats.gamesPlayed > 0 && (
                <Accordion defaultActiveKey="0">
                    <PlayerStatsOverview stats={stats} />
                    <PlayerStatsWinsLosses stats={stats} />
                    <PlayerStatsAggregates stats={stats} />
                    {!showStatSummary && <PlayerStatsTeams stats={stats} />}
                    <PlayerStatsResults stats={stats} />
                </Accordion>
            )}
            <br />
        </div>
    );
}

export default IndividualPlayerStats;
