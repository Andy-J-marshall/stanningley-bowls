import React from 'react';
import Player from './players';
import { ListGroup } from 'react-bootstrap';
import bowlsStats from '../data/bowlsStats.json';

function PlayerStats() {
    const playersStats = bowlsStats.playerResults;
    const keys = Object.keys(playersStats);

    // TODO get rid of the blue bar?
    return (
        <div id="player-stats">
            <h1>Player Stats</h1>
            <ListGroup>
                {keys.map((p, index) => {
                    const playerName = keys[index];
                    return (
                        <Player
                            key={index}
                            index={index}
                            player={p}
                            name={playerName}
                            playersStats={playersStats}
                        >
                            {JSON.stringify(playersStats[p])}
                        </Player>
                    );
                })}
            </ListGroup>
        </div>
    );
}

export default PlayerStats;
