import React from 'react';
import TeamStats from './teamStats';
import PlayerStats from './playerStats';


function Stats() {
    return (
        <div>
            <h1>Stats</h1>
            <TeamStats />
            <PlayerStats />
        </div>
    );
}

export default Stats;
