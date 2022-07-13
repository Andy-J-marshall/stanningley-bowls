import React from 'react';
import Results from './results';
import upcoming_fixtures from '../images/fixtures/upcoming_fixtures.png';
import upcomingFixturesAugust from '../images/fixtures/upcoming_fixtures_Aug.png';
import upcomingFixturesSeptember from '../images/fixtures/upcoming_fixtures_Sept.png';

function FixturesResults(props) {
    const teamResults = props.teamResults;

    return (
        <div id="fixture">
            <Results teamResults={teamResults} />
            <img
                id="upcoming-fixtures"
                src={upcoming_fixtures}
                alt="upcoming fixtures for July"
            />
            <hr style={{ margin: 0 }} />
            <img
                id="upcoming-fixtures"
                src={upcomingFixturesAugust}
                alt="upcoming fixtures for August"
            />
            <hr style={{ margin: 0 }} />
            <img
                id="upcoming-fixtures"
                src={upcomingFixturesSeptember}
                alt="upcoming fixtures for September"
            />
            <hr style={{ margin: 0 }} />
        </div>
    );
}

export default FixturesResults;
