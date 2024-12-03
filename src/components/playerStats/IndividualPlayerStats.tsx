import { useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import PlayerStatsOverview from './playerStatsOverview';
import PlayerStatsWinsLosses from './playerStatsWinsLosses';
import PlayerStatsTeams from './playerStatsTeams';
import PlayerStatsAggregates from './playerStatsAggregates';
import PlayerStatsResults from './playerStatsResults';
import { IndividualPlayerStatsProps } from '../../types/interfaces';
import { capitalizeText } from '../../helpers/utils';

function IndividualPlayerStats(props: IndividualPlayerStatsProps) {
    const name = props.name;
    const stats = props.playersStats;
    const showClubStats = props.showClubStats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="detailed-player-stats">
            <h3 style={{ padding: '0.7rem' }} id="playerNameTitle">
                {capitalizeText([name])}
            </h3>
            {!stats && <p>No games played this year</p>}
            {stats && stats.gamesPlayed > 0 && (
                <Accordion defaultActiveKey="0">
                    <PlayerStatsOverview stats={stats} />
                    <PlayerStatsWinsLosses stats={stats} />
                    <PlayerStatsAggregates stats={stats} />
                    {showClubStats && <PlayerStatsTeams stats={stats} />}
                    <PlayerStatsResults stats={stats} />
                </Accordion>
            )}
            <br />
        </div>
    );
}

export default IndividualPlayerStats;
