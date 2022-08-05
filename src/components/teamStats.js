import React, { useEffect } from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';
import config from '../config';

function TeamStats(props) {
    const stats = props.stats;

    const { playerResults, teamResults } = stats;

    const mondayStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('monday')
    );
    const tuesdayStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('tuesday vets')
    );
    const thursdayStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('thursday')
    );
    const saturdayStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('saturday')
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    function allComponent() {
        return <CombinedTeamStats stats={teamResults} />;
    }

    function returnTeam1Component() {
        return (
            <IndividualTeamStats
                day="Monday Combined Leeds"
                stats={mondayStats}
                playerStats={playerResults}
            />
        );
    }

    function returnTeam2Component() {
        return (
            <IndividualTeamStats
                day="Tuesday Vets Leeds"
                stats={tuesdayStats}
                playerStats={playerResults}
            />
        );
    }

    function returnTeam3Component() {
        return (
            <IndividualTeamStats
                day="Thursday Vets Leeds"
                stats={thursdayStats}
                playerStats={playerResults}
            />
        );
    }

    function returnTeam4Component() {
        return (
            <IndividualTeamStats
                day="Saturday Leeds"
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
                team1Component={returnTeam1Component()}
                team2Component={returnTeam2Component()}
                team3Component={returnTeam3Component()}
                team4Component={returnTeam4Component()}
            />
            <br />
            <p className="footnote">* {config.leagueRules}</p>
        </div>
    );
}

export default TeamStats;
