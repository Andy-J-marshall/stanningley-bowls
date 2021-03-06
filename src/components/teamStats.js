import React, { useEffect } from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';
import config from '../config';

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

    useEffect(() => {
        window.scrollTo(0, 0);
    });

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
            <p className="footnote">* {config.leagueRules}</p>
        </div>
    );
}

export default TeamStats;
