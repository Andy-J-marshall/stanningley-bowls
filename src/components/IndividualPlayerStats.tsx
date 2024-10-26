import { useEffect, useState } from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';
import { config } from '../config';
import { returnPlayerStats } from '../helpers/playersHelper';
import { capitalizeText } from '../helpers/utils';
import PlayerStatsOverview from './playerStatsOverview';
import PlayerStatsWinsLosses from './playerStatsWinsLosses';
import PlayerStatsTeams from './playerStatsTeams';
import PlayerStatsAggregates from './playerStatsAggregates';
import PlayerStatsResults from './playerStatsResults';
import { IndividualPlayerStatsProps } from '../types/interfaces';

function IndividualPlayerStats(props: IndividualPlayerStatsProps) {
    const player = props.player;
    const playersStats = props.playersStats;
    const name = props.name;
    const showStatSummary = props.showStatSummary;

    // TODO not displaying stats if player has not played for Stanningley
    const [loaded, setLoaded] = useState(false);

    const stats = returnPlayerStats(playersStats, player);

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);
    });

    if (stats) {
        return (
            <div id="detailed-player-stats">
                <ListGroup.Item>
                    <h2 id="playerNameTitle">{capitalizeText([name])}</h2>
                    {stats.gamesPlayed === 0 && (
                        <div>
                            {!showStatSummary && (
                                <p>
                                    No games played for{' '}
                                    {config.teamNames.shortName}
                                </p>
                            )}
                            {showStatSummary && <p>No games played</p>}
                        </div>
                    )}
                    {/* TODO add a message here if no games played */}
                    {stats.gamesPlayed > 0 && (
                        <Accordion defaultActiveKey="0">
                            <PlayerStatsOverview stats={stats} />
                            <PlayerStatsWinsLosses stats={stats} />
                            <PlayerStatsAggregates stats={stats} />
                            {!showStatSummary && (
                                <PlayerStatsTeams stats={stats} />
                            )}
                            <PlayerStatsResults stats={stats} />
                        </Accordion>
                    )}
                </ListGroup.Item>
                <br />
            </div>
        );
    } else {
        return null;
    }
}

export default IndividualPlayerStats;
