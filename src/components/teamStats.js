import React from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamRecords from './teamRecords';
import bowlsStats from '../helpers/bowlsStats.json'

function TeamStats() {
    const teamStats = bowlsStats.teamResults;
    // TODO get the teamStats in a better way that using array
    const mondayStats = teamStats[0]
    const tuesdayStats = teamStats[1]
    const thursdayStats = teamStats[2]
    const saturdayStats = teamStats[3]

    return (
        <div id='TeamStats'>
            <h2>Team Stats</h2>
            <TeamRecords
                stats={teamStats}
            />
            <CombinedTeamStats
                stats={teamStats}
            />
            <IndividualTeamStats
                day='Monday'
                stats={mondayStats}
            />
            <IndividualTeamStats
                day='Tuesday'
                stats={tuesdayStats}
            />
            <IndividualTeamStats
                day='Thursday'
                stats={thursdayStats}
            />
            <IndividualTeamStats
                day='Saturday'
                stats={saturdayStats}
            />
        </div>
    );
}

export default TeamStats;
