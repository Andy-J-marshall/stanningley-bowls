import React from 'react';
import bowlsStats from '../data/bowlsStats.json';
import { arrayToList } from '../helpers/utils';

function Results() {
    const teamStats = bowlsStats.teamResults;

    return (
        <div id="result">
            <h1>RESULTS</h1>
            {teamStats.map((team, idx) => {
                return (
                    <div className="center" idx={idx}>
                        <h3>{team.day}</h3>
                        <p>{arrayToList(team.results)}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Results;
