import { Accordion } from 'react-bootstrap';
import { PlayerStatsTeamsProps } from '../types/interfaces';

function PlayerStatsTeams(props: PlayerStatsTeamsProps) {
    const stats = props.stats;

    const { allTeamStats } = stats;
    allTeamStats.sort((a, b) => a.teamName.localeCompare(b.teamName));

    return (
        <div id="player-stats-teams">
            <Accordion.Item eventKey="4">
                <Accordion.Header id="stats-teams">TEAMS</Accordion.Header>
                <Accordion.Body>
                    <div>
                        {allTeamStats.map(
                            (team, idx) =>
                                team.teamGames > 0 && (
                                    <div key={idx}>
                                        <h3>{team.teamName.toUpperCase()}</h3>
                                        <p>Games: {team.teamGames}</p>
                                        <p>Wins: {team.teamWins}</p>
                                        <p>Losses: {team.teamLosses}</p>
                                        <p>
                                            Average: {team.teamAvg?.toFixed(2)}
                                        </p>
                                        <p>
                                            Win percentage:{' '}
                                            {team.teamWinPerc.toFixed(0)}%
                                        </p>
                                        <hr />
                                    </div>
                                )
                        )}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsTeams;
