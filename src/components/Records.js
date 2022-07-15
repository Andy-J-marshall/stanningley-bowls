import React from 'react';
import TeamRecords from './teamRecords';
import PlayerRecords from './playerRecords';

function Records(props) {
    const teamResults = props.teamResults;
    const playerResults = props.playerResults;

    return (
        <div id="record" className="page-component">
            <PlayerRecords playerResults={playerResults} />
            <TeamRecords teamResults={teamResults} />
        </div>
    );
}

export default Records;
