import React from 'react';
import Results from './results';
import upcoming_fixtures from '../images/upcoming_fixtures.png';

function FixturesResults(props) {
    const teamResults = props.teamResults;

    return (
        <div id="fixture">
            <Results teamResults={teamResults} />
            <img
                id="upcoming-fixtures"
                src={upcoming_fixtures}
                alt="upcoming fixtures"
            />
            <hr style={{ margin: 0 }} />
        </div>
    );
}

export default FixturesResults;
