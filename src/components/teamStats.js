import React from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamRecords from './teamRecords';
import bowlsStats from '../helpers/bowlsStats.json'

function TeamStats() {
    const teamStats = bowlsStats.teamResults;
    const mondayStats = teamStats[0].Monday
    const tuesdayStats = teamStats[1].Tuesday
    const thursdayStats = teamStats[2].Thursday
    const saturdayStats = teamStats[3].Saturday

    return (
        <div id='TeamStats'>
            <h1>Team Stats</h1>
            <TeamRecords
                stats={teamStats}
            />
            <CombinedTeamStats
                stats={[mondayStats, tuesdayStats, thursdayStats, saturdayStats]}
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
