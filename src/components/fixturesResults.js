import React, { useEffect } from 'react';
import Results from './results';
import upcoming_fixtures from '../images/fixtures/upcoming_fixtures.png';
import upcomingFixturesAugust from '../images/fixtures/upcoming_fixtures_Aug.png';
import upcomingFixturesSeptember from '../images/fixtures/upcoming_fixtures_Sept.png';

function FixturesResults(props) {
    const stats = props.stats;

    const { teamResults } = stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    // TODO split fixtures and results into 2 pages
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
