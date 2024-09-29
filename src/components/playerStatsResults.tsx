import { Accordion } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import { PlayerStatsResultsProps } from '../types/interfaces';

function PlayerStatsResults(props: PlayerStatsResultsProps) {
    const stats = props.stats;

    const { results } = stats;
    const resultsArray = results.map((result) => {
        const resultParts = result.split(' - ');

        const teamPart = resultParts[0];
        const playerScore = teamPart.match(/[0-9]+/g)[0].trim();
        const player = teamPart.split(/[0-9]+/g)[0].trim();

        const opponentPart = resultParts[1].split(' (')[0];
        const opponentScore = opponentPart.match(/[0-9]+/g)[0].trim();
        const opponent = opponentPart.split(/[0-9]+/g)[1].trim();

        return {
            team: {
                name: player,
                score: playerScore,
            },
            opponent: {
                name: opponent,
                score: opponentScore,
            },
        };
    });

    return (
        <div id="player-stats-results">
            <Accordion.Item eventKey="5">
                <Accordion.Header id="stats-results">RESULTS</Accordion.Header>
                <Accordion.Body style={{ padding: '0' }}>
                    <div id="player-results" className="center">
                        <div>
                            <br />
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>PLAYER</th>
                                        <th></th>
                                        <th></th>
                                        <th>OPPONENT</th>
                                    </tr>
                                </thead>
                                {resultsArray.map((result, idx) => {
                                    const player = capitalizeText([
                                        result.team.name,
                                    ]);
                                    const teamScore = result.team.score;
                                    const opponent = capitalizeText([
                                        result.opponent.name,
                                    ]);
                                    const opponentScore = result.opponent.score;
                                    return (
                                        <tbody key={idx}>
                                            <tr>
                                                <td
                                                    style={{
                                                        width: '42%',
                                                    }}
                                                >
                                                    {player}
                                                </td>

                                                <td
                                                    style={{
                                                        borderRightStyle:
                                                            'solid',
                                                        borderRightColor:
                                                            'black',
                                                    }}
                                                >
                                                    {teamScore}
                                                </td>
                                                <td>{opponentScore}</td>

                                                <td
                                                    style={{
                                                        width: '42%',
                                                    }}
                                                >
                                                    {opponent}
                                                </td>
                                            </tr>
                                        </tbody>
                                    );
                                })}
                            </Table>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsResults;
