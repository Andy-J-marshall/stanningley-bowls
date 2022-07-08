import React from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';

function TeamStats(props) {
    const teamStats = props.teamStats;
    const playerStats = props.playersStats;

    const mondayStats = teamStats.find(
        (team) => team.day.toLowerCase() === 'monday'
    );
    const tuesdayStats = teamStats.find(
        (team) => team.day.toLowerCase() === 'tuesday'
    );
    const thursdayStats = teamStats.find(
        (team) => team.day.toLowerCase() === 'thursday'
    );
    const saturdayStats = teamStats.find(
        (team) => team.day.toLowerCase() === 'saturday'
    );

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
