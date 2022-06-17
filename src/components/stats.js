import React from 'react';
import TeamStats from './teamStats';
import PlayerStats from './playerStats';

function Stats() {
    return (
        <div>
            <PlayerStats />
            <TeamStats />
        </div>
    );
}

export default Stats;
