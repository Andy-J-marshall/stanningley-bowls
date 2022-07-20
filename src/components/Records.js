import React from 'react';
import TeamRecords from './teamRecords';
import PlayerRecords from './playerRecords';

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
            <p className="footnote">
                *** A match is decided using the 0-5 points system. If a player
                wins by scoring 21 then they get 5 points. If they lose and
                score 18-20 then they get 4 points, 15-17 is 3 points, 10-14 is
                2 points and 5-9 is 1 point. If a player scores 0-4 then they
                get 0 points.
            </p>
        </div>
    );
}

export default Records;
