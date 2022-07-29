import React from 'react';
import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function PlayerResults(props) {
    const results = props.results;

    const resultsArray = results.map((result) => {
        const resultParts = result.split('-');

        const stanPart = resultParts[0];
        const playerScore = stanPart.match(/[0-9]+/g)[0].trim();
        const player = stanPart.split(/[0-9]+/g)[0].trim();

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
                        const opponent = capitalizeText([result.opponent.name]);
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
            </div>
        </div>
    );
}

export default PlayerResults;
