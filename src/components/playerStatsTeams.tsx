import { Accordion, Row } from 'react-bootstrap';
import StatTile from './statTile';
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
                    {allTeamStats.map(
                        (team, idx) =>
                            team.teamGames > 0 && (
                                <div key={idx}>
                                    <h3>{team.teamName.toLowerCase()}</h3>
                                    <Row
                                        xs={2}
                                        md={5}
                                        className="g-4 align-items-start"
                                    >
                                        <StatTile
                                            title="GAMES"
                                            bodyText={team.teamGames}
                                        />
                                        <StatTile
                                            title="AVERAGE"
                                            bodyText={team.teamAvg?.toFixed(2)}
                                        />
                                        <StatTile
                                            title="WINS"
                                            bodyText={team.teamWins}
                                        />
                                        <StatTile
                                            title="LOSSES"
                                            bodyText={team.teamLosses}
                                        />
                                        <StatTile
                                            title="WIN %"
                                            bodyText={
                                                team.teamWinPerc.toFixed(0) +
                                                '%'
                                            }
                                        />
                                    </Row>
                                    <hr />
                                </div>
                            )
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsTeams;
