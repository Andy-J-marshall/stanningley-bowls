import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import YearSelectDropdown from './yearSelectDropdown';

function Stats(props) {
    const stats = props.stats;
    const statsCallback = props.statsCallback;
    const yearsToDisplay = props.yearsToDisplay;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="stats" className="center">
            <YearSelectDropdown
                yearsToDisplay={yearsToDisplay}
                statsCallback={statsCallback}
            />
            <Outlet />
            <p className="footnote">Last Updated: {stats.lastUpdated}</p>
            <br />
        </div>
    );
}

export default Stats;
