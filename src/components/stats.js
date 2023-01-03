import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import YearSelectDropdown from './yearSelectDropdown';

function Stats(props) {
    const stats = props.stats;
    const statsCallback = props.statsCallback;
    const yearToDisplay = props.yearToDisplay;
    const numberOfYearsToDisplay = props.numberOfYearsToDisplay;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="stats" className="center">
            <YearSelectDropdown
                numberOfYearsToDisplay={numberOfYearsToDisplay}
                statsCallback={statsCallback}
                yearToDisplay={yearToDisplay}
            />
            <Outlet />
            <p className="footnote">Last Updated: {stats.lastUpdated}</p>
            <br />
        </div>
    );
}

export default Stats;
