import { useEffect } from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';
import config from '../config';

function TeamStats(props) {
    const stats = props.stats;

    const teamName = config.teamNames.shortName;

    const { playerResults, teamResults } = stats;

    let mondayStats;
    let tuesdayVetsStats;
    let tuesdayStats;
    let wednesdayStats;
    let wednesdayPairsStats;
    let thursdayVetsStats;
    let saturdayStats;
    let saturdayBStats;

    // TODO refactor this?

    if (teamResults) {
        mondayStats = teamResults.find((team) =>
            team.day.toLowerCase().includes('monday')
        );
        tuesdayVetsStats = teamResults.find((team) =>
            team.day.toLowerCase().includes('tuesday vets')
        );
        tuesdayStats = teamResults.find((team) =>
            team.day.toLowerCase().includes('tuesday leeds')
        );
        wednesdayStats = teamResults.find((team) =>
            team.day.toLowerCase().includes('wednesday half holiday')
        );
        wednesdayPairsStats = teamResults.find((team) =>
            team.day.toLowerCase().includes('wednesday pairs')
        );
        thursdayVetsStats = teamResults.find((team) =>
            team.day.toLowerCase().includes('thursday')
        );
        saturdayStats = teamResults.find(
            (team) => team.day.toLowerCase() === 'saturday leeds'
        );
        saturdayBStats = teamResults.find(
            (team) => team.day.toLowerCase() === 'saturday leeds (b)'
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    function allComponent() {
        return <CombinedTeamStats stats={teamResults} />;
    }

    function returnTeam1Component() {
        const teamConfig = config.teams.find((e) =>
            e.name.toLowerCase().includes('monday combined')
        );
        return (
            <IndividualTeamStats
                day="Monday Combined Leeds"
                stats={mondayStats}
                playerStats={playerResults}
                url={teamConfig.link}
                displayUrl={true}
            />
        );
    }

    function returnTeam2Component() {
        const teamConfig = config.teams.find((e) =>
            e.name.toLowerCase().includes('tuesday vets')
        );

        return (
            <IndividualTeamStats
                day="Tuesday Vets Leeds"
                stats={tuesdayVetsStats}
                playerStats={playerResults}
                url={teamConfig.link}
                displayUrl={true}
            />
        );
    }

    function returnTeam3Component() {
        const teamConfig = config.teams.find(
            (e) => e.name.toLowerCase() === 'tuesday'
        );

        return (
            <IndividualTeamStats
                day="Tuesday Leeds"
                stats={tuesdayStats}
                playerStats={playerResults}
                url={teamConfig.link}
                displayUrl={true}
            />
        );
    }

    function returnTeam4Component() {
        const teamConfig = config.teams.find((e) =>
            e.name.toLowerCase().includes('wednesday half holiday')
        );

        return (
            <IndividualTeamStats
                day="Wednesday Half Holiday Leeds"
                stats={wednesdayStats}
                playerStats={playerResults}
                url={teamConfig.link}
                displayUrl={true}
            />
        );
    }

    function returnTeam7Component() {
        const teamConfig = config.teams.find((e) =>
            e.name.toLowerCase().includes('wednesday pairs')
        );

        return (
            <IndividualTeamStats
                day="Wednesday Pairs AireWharfe"
                stats={wednesdayPairsStats}
                playerStats={playerResults}
                url={teamConfig.link}
                displayUrl={true}
            />
        );
    }

    function returnTeam5Component() {
        const teamConfig = config.teams.find((e) =>
            e.name.toLowerCase().includes('thursday vets')
        );

        return (
            <IndividualTeamStats
                day="Thursday Vets Leeds"
                stats={thursdayVetsStats}
                playerStats={playerResults}
                url={teamConfig.link}
                displayUrl={true}
            />
        );
    }

    function returnTeam6Component() {
        const teamConfig = config.teams.find((e) =>
            e.name.toLowerCase().includes('saturday')
        );

        return (
            <div>
                <IndividualTeamStats
                    day="Saturday Leeds"
                    stats={saturdayStats}
                    playerStats={playerResults}
                    url={teamConfig.link}
                    displayUrl={false}
                />
                {saturdayBStats && (
                    <div>
                        <br />
                        <h1>SECOND TEAM STATS</h1>
                        <IndividualTeamStats
                            day="Saturday Leeds (b)"
                            stats={saturdayBStats}
                            playerStats={playerResults}
                            url={teamConfig.link}
                            displayUrl={true}
                        />
                    </div>
                )}
            </div>
        );
    }

    if (teamResults) {
        return (
            <div id="team-stats" className="center page-component">
                <h1>TEAM STATS</h1>
                <TeamTabs
                    id="team-stat"
                    allComponent={allComponent()}
                    team1Component={returnTeam1Component()}
                    team2Component={returnTeam2Component()}
                    team3Component={returnTeam3Component()}
                    team4Component={returnTeam4Component()}
                    team7Component={returnTeam7Component()}
                    team5Component={returnTeam5Component()}
                    team6Component={returnTeam6Component()}
                />
                <br />
            </div>
        );
    } else {
        return (
            <div id="team-stats-unavailable" className="center page-component">
                <h1>TEAM STATS</h1>
                <p>
                    No {teamName} team stats available, please select another year.
                </p>
            </div>
        );
    }
}

export default TeamStats;
