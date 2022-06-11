import React from 'react';
import Player from './players';
import { ListGroup } from 'react-bootstrap';
import bowlsStats from '../helpers/bowlsStats.json'

function PlayerStats() {
    const playersStats = bowlsStats.playerResults;
    const keys = Object.keys(playersStats);

    return (
        <div>
            <h2>Player Stats</h2>
            <ListGroup id='player-stats'>
                {keys.map((p, index) => {
                    const playerName = keys[index];
                    return <Player
                        key={index}
                        index={index}
                        player={p}
                        name={playerName}
                        playersStats={playersStats}
                    >{JSON.stringify(playersStats[p])}</Player>
                })}
            </ListGroup>
        </div >
    );
}

export default PlayerStats;
