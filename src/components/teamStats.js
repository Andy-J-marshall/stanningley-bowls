import React from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import bowlsStats from '../helpers/bowlsStats.json'

function TeamStats() {
    const mondayStats = bowlsStats.teamResults[0].Monday
    const tuesdayStats = bowlsStats.teamResults[1].Tuesday
    const thursdayStats = bowlsStats.teamResults[2].Thursday
    const saturdayStats = bowlsStats.teamResults[3].Saturday

    return (
        <div>
            <h1>Team Stats</h1>
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
