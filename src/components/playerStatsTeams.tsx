import { Accordion } from 'react-bootstrap';
import { PlayerStatsTeamsProps } from '../types/interfaces';
import PlayerStatOverviewTiles from './PlayerStatOverviewTiles';

function PlayerStatsTeams(props: PlayerStatsTeamsProps) {
    const stats = props.stats;

    const { allTeamStats } = stats;
    allTeamStats.sort((a, b) => a.teamName.localeCompare(b.teamName));

    return (
        <Accordion.Item eventKey="4">
            <Accordion.Header id="stats-teams">TEAMS</Accordion.Header>
            <Accordion.Body>
                {allTeamStats.map(
                    (team, idx) =>
                        team.teamGames > 0 && (
                            <div key={idx}>
                                <h3>{team.teamName.toLowerCase()}</h3>
                                <PlayerStatOverviewTiles
                                    games={team.teamGames}
                                    average={team.teamAvg}
                                    wins={team.teamWins}
                                    losses={team.teamLosses}
                                    idPrefix={team.teamName}
                                />
                                <hr />
                            </div>
                        )
                )}
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default PlayerStatsTeams;
