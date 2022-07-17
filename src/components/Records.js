import React from 'react';
import TeamRecords from './teamRecords';
import PlayerRecords from './playerRecords';

function Records(props) {
    const stats = props.stats;

    const { playerResults, teamResults } = stats;

    return (
        <div id="record" className="page-component">
            <PlayerRecords playerResults={playerResults} />
            <TeamRecords teamResults={teamResults} />
        </div>
    );
}

export default Records;
