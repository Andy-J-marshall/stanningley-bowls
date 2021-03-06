import React, { useEffect } from 'react';
import upcomingFixturesApril from '../images/fixtures/upcoming_fixtures_April.png';
import upcomingFixturesMay from '../images/fixtures/upcoming_fixtures_May.png';
import upcomingFixturesJune from '../images/fixtures/upcoming_fixtures_June.png';
import upcomingFixturesJuly from '../images/fixtures/upcoming_fixtures_July.png';
import upcomingFixturesAugust from '../images/fixtures/upcoming_fixtures_Aug.png';
import upcomingFixturesSeptember from '../images/fixtures/upcoming_fixtures_Sept.png';

function FixturesResults() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const yearFixturesAddedFor = 2022; // Will need to change this when fixtures added for future years

    return (
        <div id="fixture" className="center">
            {year === yearFixturesAddedFor ? (
                <div>
                    {4 >= month && (
                        <div>
                            <img
                                id="upcoming-fixtures-april"
                                src={upcomingFixturesApril}
                                alt="upcoming fixtures for April"
                                className="upcoming-fixtures"
                            />
                            <hr style={{ margin: 0 }} />
                        </div>
                    )}
                    {5 >= month && (
                        <div>
                            <img
                                id="upcoming-fixtures-may"
                                src={upcomingFixturesMay}
                                alt="upcoming fixtures for May"
                                className="upcoming-fixtures"
                            />
                            <hr style={{ margin: 0 }} />
                        </div>
                    )}
                    {6 >= month && (
                        <div>
                            <img
                                id="upcoming-fixtures-june"
                                src={upcomingFixturesJune}
                                alt="upcoming fixtures for June"
                                className="upcoming-fixtures"
                            />
                            <hr style={{ margin: 0 }} />
                        </div>
                    )}
                    {7 >= month && (
                        <div>
                            <img
                                id="upcoming-fixtures-july"
                                src={upcomingFixturesJuly}
                                alt="upcoming fixtures for July"
                                className="upcoming-fixtures"
                            />
                            <hr style={{ margin: 0 }} />
                        </div>
                    )}
                    {8 >= month && (
                        <div>
                            <img
                                id="upcoming-fixtures-august"
                                src={upcomingFixturesAugust}
                                alt="upcoming fixtures for August"
                                className="upcoming-fixtures"
                            />
                        </div>
                    )}
                    <hr style={{ margin: 0 }} />
                    {9 >= month && (
                        <div>
                            <img
                                id="upcoming-fixtures-september"
                                src={upcomingFixturesSeptember}
                                alt="upcoming fixtures for September"
                                className="upcoming-fixtures"
                            />
                            <hr style={{ margin: 0 }} />
                        </div>
                    )}
                </div>
            ) : (
                <h3 style={{ padding: '2rem' }}>
                    No fixtures are available yet.
                </h3>
            )}
        </div>
    );
}

export default FixturesResults;
