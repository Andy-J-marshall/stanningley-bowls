import React, { useState } from 'react';
import Player from './players';
import PlayerRecords from './playerRecords';
import { ListGroup, Button } from 'react-bootstrap';
import bowlsStats from '../helpers/bowlsStats.json'

function PlayerStats() {
    const [showStats, setShowStats] = useState(false);
    const [buttonText, setButtonText] = useState('Show Player Stats');

    const playersStats = bowlsStats.playerResults;
    const keys = Object.keys(playersStats);


    function togglePlayerStats() {
        if (showStats) {
            setShowStats(false);
            setButtonText('Show Player Stats')
        } else {
            setShowStats(true);
            setButtonText('Hide Player Stats')
        }
    }

    return (
        <div>
            <h1>Player Stats</h1>
            <PlayerRecords
                playersStats={playersStats}
            />
            <Button variant='light' size='lg' onClick={togglePlayerStats}>{buttonText}</Button>
            <br />
            <br />
            {showStats && <div id='player-stats'>
                <ListGroup>
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
            </div>}
        </div >
    );
}

export default PlayerStats;
