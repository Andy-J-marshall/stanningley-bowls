import { useEffect } from 'react';
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
    const tuesdayVetsStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('tuesday vets')
    );
    const tuesdayStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('tuesday leeds')
    );
    const wednesdayStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('wednesday')
    );
    const thursdayStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('thursday')
    );
    const saturdayStats = teamResults.find(
        (team) => team.day.toLowerCase().includes('saturday')
    );

    // TODO add teams into here

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
                stats={tuesdayVetsStats}
                playerStats={playerResults}
            />
        );
    }

    function returnTeam3Component() {
        return (
            <IndividualTeamStats
                day="Tuesday Leeds"
                stats={tuesdayStats}
                playerStats={playerResults}
            />
        );
    }

    function returnTeam4Component() {
        return (
            <IndividualTeamStats
                day="Wednesday Half Holiday Leeds"
                stats={wednesdayStats}
                playerStats={playerResults}
            />
        );
    }

    function returnTeam5Component() {
        return (
            <IndividualTeamStats
                day="Thursday Vets Leeds"
                stats={thursdayStats}
                playerStats={playerResults}
            />
        );
    }

    function returnTeam6Component() {
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
                team5Component={returnTeam6Component()}
                team6Component={returnTeam6Component()}
            />
            <br />
            <p className="footnote">* {config.leagueRules}</p>
        </div>
    );
}

export default TeamStats;
