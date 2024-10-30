import { Accordion, Card, Row } from 'react-bootstrap';
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
                                    <h3>{team.teamName.toUpperCase()}</h3>
                                    <Row
                                        style={{ padding: 0, margin: '0.4rem' }}
                                        xs={2}
                                        md={5}
                                        className="g-4 align-items-start"
                                    >
                                        <Card bg="light">
                                            <Card.Body>
                                                <Card.Title>GAMES</Card.Title>
                                                <Card.Text>
                                                    {team.teamGames}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="light">
                                            <Card.Body>
                                                <Card.Title>WINS</Card.Title>
                                                <Card.Text>
                                                    {team.teamWins}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="light">
                                            <Card.Body>
                                                <Card.Title>LOSSES</Card.Title>
                                                <Card.Text>
                                                    {team.teamLosses}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="light">
                                            <Card.Body>
                                                <Card.Title>AVERAGE</Card.Title>
                                                <Card.Text>
                                                    {team.teamAvg?.toFixed(2)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="light">
                                            <Card.Body>
                                                <Card.Title>WIN %</Card.Title>
                                                <Card.Text>
                                                    {team.teamWinPerc.toFixed(
                                                        0
                                                    )}
                                                    %
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
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
