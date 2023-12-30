import { useEffect } from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';
import config from '../config';

function TeamStats(props) {
    const stats = props.stats;

    const { playerResults, teamResults } = stats;

    const mondayStats = teamResults.find((team) =>
        team.day.toLowerCase().includes('monday')
    );
    const tuesdayVetsStats = teamResults.find((team) =>
        team.day.toLowerCase().includes('tuesday vets')
    );
    const tuesdayStats = teamResults.find((team) =>
        team.day.toLowerCase().includes('tuesday leeds')
    );
    const wednesdayStats = teamResults.find((team) =>
        team.day.toLowerCase().includes('wednesday half holiday')
    );
    const thursdayVetsStats = teamResults.find((team) =>
        team.day.toLowerCase().includes('thursday')
    );
    const saturdayStats = teamResults.find((team) =>
        team.day.toLowerCase().includes('saturday')
    );

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
            />
        );
    }

    function returnTeam6Component() {
        const teamConfig = config.teams.find((e) =>
            e.name.toLowerCase().includes('saturday')
        );

        return (
            <IndividualTeamStats
                day="Saturday Leeds"
                stats={saturdayStats}
                playerStats={playerResults}
                url={teamConfig.link}
            />
        );
    }

    return (
        <div className="center page-component">
            <h1>TEAM STATS</h1>
            <TeamTabs
                id="team-stat"
                allComponent={allComponent()}
                team1Component={returnTeam1Component()}
                team2Component={returnTeam2Component()}
                team3Component={returnTeam3Component()}
                team4Component={returnTeam4Component()}
                team5Component={returnTeam5Component()}
                team6Component={returnTeam6Component()}
            />
            <br />
        </div>
    );
}

export default TeamStats;
