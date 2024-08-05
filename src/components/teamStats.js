import { useEffect } from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';
import config from '../config';
import { returnTabName } from '../helpers/teamsHelper';

function TeamStats(props) {
    const stats = props.stats;

    const teamName = config.teamNames.shortName;

    const { playerResults, teamResults } = stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    function allComponent() {
        return <CombinedTeamStats stats={teamResults} />;
    }

    function returnTeamComponents() {
        const possibleTeamNames = config.allTeamsInLeaguesSince2013;

        const days = Object.keys(config.days);
        return days.map((day) => {
            const teamResult = teamResults.find(
                (e) => e.day.toLowerCase() === day
            );
            if (
                teamResult &&
                possibleTeamNames.includes(teamResult.day.toLowerCase())
            ) {
                return (
                    <IndividualTeamStats
                        displayname={returnTabName(day)}
                        day={day}
                        stats={teamResult}
                        playerStats={playerResults}
                    />
                );
            } else {
                return (
                    <p displayname={returnTabName(day)}>
                        {config.teamNames.shortName} did not play on this day for the selected year
                    </p>
                );
            }
        });
    }

    if (teamResults) {
        return (
            <div id="team-stats" className="center page-component">
                <h1>TEAM STATS</h1>
                <TeamTabs
                    allCombinedComponent={allComponent()}
                    teamComponents={returnTeamComponents()}
                />
                <br />
            </div>
        );
    } else {
        return (
            <div id="team-stats-unavailable" className="center page-component">
                <h1>TEAM STATS</h1>
                <p>
                    No {teamName} team stats available, please select another
                    year.
                </p>
            </div>
        );
    }
}

export default TeamStats;
