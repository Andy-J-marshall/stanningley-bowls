import React from 'react';
import { arrayToList } from '../helpers/utils';

function Results(props) {
    const teamResults = props.teamResults;

    return (
        <div id="result" className="page-component center">
            <h1>RESULTS</h1>
            {teamResults.map((team, idx) => {
                return (
                    <div key={idx}>
                        <h3>{team.day}</h3>
                        <p>{arrayToList(team.results)}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Results;
