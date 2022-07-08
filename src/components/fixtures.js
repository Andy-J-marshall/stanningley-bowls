import React from 'react';
import Results from './results';
import upcoming_fixtures from '../images/upcoming_fixtures.png';

function Fixtures() {
    return (
        <div id="fixture">
            <Results/>
            <img
                id="upcoming-fixtures"
                src={upcoming_fixtures}
                alt="upcoming fixtures"
            />
            <hr style={{ margin: 0 }} />
        </div>
    );
}

export default Fixtures;
