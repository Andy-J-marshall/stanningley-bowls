import React from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import bowlsStats from '../data/bowlsStats.json';

function TeamStats() {
    const teamStats = bowlsStats.teamResults;
    const playerStats = bowlsStats.playerResults;
    // TODO get the teamStats in a better way than using array
    const mondayStats = teamStats[0];
    const tuesdayStats = teamStats[1];
    const thursdayStats = teamStats[2];
    const saturdayStats = teamStats[3];

    return (
        <div id="team-stats">
            <CombinedTeamStats stats={teamStats} />
            <div>
                <IndividualTeamStats
                    index={1}
                    day="Monday"
                    stats={mondayStats}
                    playerStats={playerStats}
                />
                <IndividualTeamStats
                    index={2}
                    day="Tuesday"
                    stats={tuesdayStats}
                    playerStats={playerStats}
                />
                <IndividualTeamStats
                    index={3}
                    day="Thursday"
                    stats={thursdayStats}
                    playerStats={playerStats}
                />
                <IndividualTeamStats
                    index={4}
                    day="Saturday"
                    stats={saturdayStats}
                    playerStats={playerStats}
                />
            </div>
        </div>
    );
}

export default TeamStats;
