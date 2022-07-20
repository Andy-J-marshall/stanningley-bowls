import React from 'react';
import TeamRecords from './teamRecords';
import PlayerRecords from './playerRecords';
import config from '../config';

function Records(props) {
    const stats = props.stats;

    const { playerResults, teamResults } = stats;

    return (
        <div id="record" className="page-component center">
            <PlayerRecords playerResults={playerResults} />
            <TeamRecords teamResults={teamResults} />
            <p className="footnote">
                ** The number in brackets indicates the number of games played.
            </p>
            <p className="footnote">*** {config.leagueRules}</p>
        </div>
    );
}

export default Records;
