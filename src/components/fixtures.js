import React from 'react';
import upcoming_fixtures from '../images/upcoming_fixtures.png';

function Fixtures() {
    return (
        <div id="fixture">
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
