import { useEffect, useState } from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';
import PlayerStatsOverview from './playerStatsOverview';
import { capitalizeText } from '../helpers/utils';
import { returnPlayerStats } from '../helpers/playersHelper';
import config from '../config';
import PlayerStatsGamePlayed from './playerStatsGamePlayed';
import PlayerStatsWinsLosses from './playerStatsWinsLosses';
import PlayerStatsAverages from './playerStatsAverages';
import PlayerStatsPoints from './playerStatsPoints';
import PlayerStatsAggregates from './playerStatsAggregates';
import PlayerStatsOpponents from './playerStatsOpponents';
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
                            <PlayerStatsGamePlayed
                                stats={stats}
                                showStatSummary={showStatSummary}
                            />
                            <PlayerStatsWinsLosses
                                stats={stats}
                                showStatSummary={showStatSummary}
                            />
                            <PlayerStatsAverages
                                stats={stats}
                                showStatSummary={showStatSummary}
                            />
                            {!showStatSummary && (
                                <PlayerStatsPoints stats={stats} />
                            )}
                            <PlayerStatsAggregates stats={stats} />
                            <PlayerStatsOpponents stats={stats} />
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
