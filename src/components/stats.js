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
        <div id="stats">
            <YearSelectDropdown
                yearsToDisplay={yearsToDisplay}
                statsCallback={statsCallback}
            />
            <Outlet />
            <p>Last Updated: {stats.lastUpdated}</p>
        </div>
    );
}

export default Stats;
