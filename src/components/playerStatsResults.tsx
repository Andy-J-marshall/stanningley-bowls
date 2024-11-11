import { Accordion } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import { PlayerStatsComponentsProps } from '../types/interfaces';
import { returnStructuredResultsArray } from '../helpers/playerStatsHelper';

function PlayerStatsResults(props: PlayerStatsComponentsProps) {
    const stats = props.stats;

    const { results } = stats;

    const structuredResultsArray = returnStructuredResultsArray(results);

    return (
        <Accordion.Item eventKey="5">
            <Accordion.Header id="stats-results">RESULTS</Accordion.Header>
            <Accordion.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>player</th>
                            <th></th>
                            <th></th>
                            <th>opponent</th>
                        </tr>
                    </thead>
                    {structuredResultsArray.map((result, idx) => {
                        const player = capitalizeText([result.home.name]);
                        const teamScore = result.home.score;
                        const opponent = capitalizeText([result.away.name]);
                        const opponentScore = result.away.score;
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
                                            borderRightStyle: 'solid',
                                            borderRightColor: 'black',
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
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default PlayerStatsResults;
