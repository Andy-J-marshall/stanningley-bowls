import React from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';

function TeamStats(props) {
    const teamStats = props.teamStats;
    const playerStats = props.playersStats;

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
                day="Monday"
                stats={mondayStats}
                playerStats={playerStats}
            />
        );
    }

    function tuesdayComponent() {
        return (
            <IndividualTeamStats
                day="Tuesday"
                stats={tuesdayStats}
                playerStats={playerStats}
            />
        );
    }

    function thursdayComponent() {
        return (
            <IndividualTeamStats
                day="Thursday"
                stats={thursdayStats}
                playerStats={playerStats}
            />
        );
    }

    function saturdayComponent() {
        return (
            <IndividualTeamStats
                day="Saturday"
                stats={saturdayStats}
                playerStats={playerStats}
            />
        );
    }

    return (
        <div className="page-component">
            <h1>TEAM STATS</h1>
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
