import React from 'react';
import TeamRecords from './teamRecords';
import PlayerRecords from './playerRecords';

function Records(props) {
    const teamStats = props.teamStats;
    const playersStats = props.playersStats;

    return (
        <div id="record" className="page-component">
            <PlayerRecords playersStats={playersStats} />
            <TeamRecords teamStats={teamStats} />
        </div>
    );
}

export default Records;
