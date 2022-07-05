import React from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';
import bowlsStats from '../data/bowlsStats.json';

function TeamStats() {
    const teamStats = bowlsStats.teamResults;
    const playerStats = bowlsStats.playerResults;
    // TODO get the teamStats in a better way than using array
    const mondayStats = teamStats[0];
    const tuesdayStats = teamStats[1];
    const thursdayStats = teamStats[2];
    const saturdayStats = teamStats[3];

    function allComponent() {
        return <CombinedTeamStats stats={teamStats} />;
    }

    function mondayComponent() {
        return (
            <IndividualTeamStats
                index={1}
                day="Monday"
                stats={mondayStats}
                playerStats={playerStats}
            />
        );
    }

    function tuesdayComponent() {
        return (
            <IndividualTeamStats
                index={2}
                day="Tuesday"
                stats={tuesdayStats}
                playerStats={playerStats}
            />
        );
    }

    function thursdayComponent() {
        return (
            <IndividualTeamStats
                index={3}
                day="Thursday"
                stats={thursdayStats}
                playerStats={playerStats}
            />
        );
    }

    function saturdayComponent() {
        return (
            <IndividualTeamStats
                index={4}
                day="Saturday"
                stats={saturdayStats}
                playerStats={playerStats}
            />
        );
    }

    return (
        <div>
            <h1>Team Stats</h1>
            <TeamTabs
                id="team-stat"
                allComponent={allComponent()}
                mondayComponent={mondayComponent()}
                tuesdayComponent={tuesdayComponent()}
                thursdayComponent={thursdayComponent()}
                saturdayComponent={saturdayComponent()}
            />
        </div>
    );
}

export default TeamStats;
