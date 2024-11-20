import { Accordion } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { PlayerStatsComponentsProps } from '../../types/interfaces';
import { capitalizeText } from '../../helpers/utils';
import { returnStructuredResultsArray } from '../../helpers/resultsHelper';

function PlayerStatsResults(props: PlayerStatsComponentsProps) {
    const stats = props.stats;

    const { results } = stats;

    const structuredResultsArray = returnStructuredResultsArray(results);

    return (
        <Accordion.Item eventKey="5">
            <Accordion.Header id="stats-results">RESULTS</Accordion.Header>
            <Accordion.Body style={{ padding: '0' }}>
                <Table id="player-results-table" striped bordered hover>
                    <thead>
                        <tr>
                            <th className="result-column">player</th>
                            <th></th>
                            <th></th>
                            <th className="result-column">opponent</th>
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
                                    <td>{player}</td>
                                    <td className="result-central-column">
                                        {teamScore}
                                    </td>
                                    <td>{opponentScore}</td>

                                    <td>{opponent}</td>
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
