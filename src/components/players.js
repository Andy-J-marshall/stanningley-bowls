import { useEffect, useState } from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';
import config from '../config';
import { returnPlayerStats } from '../helpers/playersHelper';
import { capitalizeText } from '../helpers/utils';
import PlayerStatsOverview from './playerStatsOverview';
import PlayerStatsWinsLosses from './playerStatsWinsLosses';
import PlayerStatsTeams from './playerStatsTeams';
import PlayerStatsPoints from './playerStatsPoints';
import PlayerStatsAggregates from './playerStatsAggregates';
import PlayerStatsResults from './playerStatsResults';

function Players(props) {
    const player = props.player;
    const playersStats = props.playersStats;
    const name = props.name;
    const showStatSummary = props.showStatSummary;

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
                                    No games played for {config.teamNames.short}
                                </p>
                            )}
                            {showStatSummary && <p>No games played</p>}
                        </div>
                    )}
                    {stats.gamesPlayed > 0 && (
                        <Accordion defaultActiveKey="0">
                            <PlayerStatsOverview stats={stats} />
                            <PlayerStatsWinsLosses stats={stats} />
                            {!showStatSummary && (
                                <PlayerStatsPoints stats={stats} />
                            )}
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

export default Players;
