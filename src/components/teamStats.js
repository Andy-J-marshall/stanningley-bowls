import React from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';

function TeamStats(props) {
    const stats = props.stats;

    const { playerResults, teamResults } = stats;

    const mondayStats = teamResults.find(
        (team) => team.day.toLowerCase() === 'monday'
    );
    const tuesdayStats = teamResults.find(
        (team) => team.day.toLowerCase() === 'tuesday'
    );
    const thursdayStats = teamResults.find(
        (team) => team.day.toLowerCase() === 'thursday'
    );
    const saturdayStats = teamResults.find(
        (team) => team.day.toLowerCase() === 'saturday'
    );

    function allComponent() {
        return <CombinedTeamStats stats={teamResults} />;
    }

    function mondayComponent() {
        return (
            <IndividualTeamStats
                day="Monday"
                stats={mondayStats}
                playerStats={playerResults}
            />
        );
    }

    function tuesdayComponent() {
        return (
            <IndividualTeamStats
                day="Tuesday"
                stats={tuesdayStats}
                playerStats={playerResults}
            />
        );
    }

    function thursdayComponent() {
        return (
            <IndividualTeamStats
                day="Thursday"
                stats={thursdayStats}
                playerStats={playerResults}
            />
        );
    }

    function saturdayComponent() {
        return (
            <IndividualTeamStats
                day="Saturday"
                stats={saturdayStats}
                playerStats={playerResults}
            />
        );
    }

    return (
        <div className="page-component center">
            <h1>TEAM STATS</h1>
            <TeamTabs
                id="team-stat"
                allComponent={allComponent()}
                mondayComponent={mondayComponent()}
                tuesdayComponent={tuesdayComponent()}
                thursdayComponent={thursdayComponent()}
                saturdayComponent={saturdayComponent()}
            />
            <br />
            <p className="footnote">
                * A match is decided by a 0-5 points system. If a player scores
                21 then they score 5 points. If they score 18-20, they score 4
                points, 15-17 is 3 points, 10-14 is 2 points and 5-9 is 1 point.
                If a player scores 0-4 then they get 0 points.
            </p>
        </div>
    );
}

export default TeamStats;
