import React from 'react';
import upcoming_fixtures from '../images/upcoming_fixtures.png';

function Fixtures() {
    return (
        <div id="fixtures">
            <img
                id="upcoming-fixtures"
                src={upcoming_fixtures}
                alt="upcoming fixtures"
            />
        </div>
    );
}

export default Fixtures;
