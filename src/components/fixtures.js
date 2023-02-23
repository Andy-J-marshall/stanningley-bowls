import { useEffect } from 'react';

// TODO Add Tuesday fixtures to calendar when available, and check there's been no updates

function FixturesResults() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="fixture" className="center page-component">
            <h1>Fixtures</h1>
            <iframe
                id="fixture-calendar"
                src="https://calendar.google.com/calendar/embed?height=400&wkst=2&bgcolor=%23ffffff&ctz=UTC&title=Stanningley%20Park%20Fixtures%20And%20Events&showTz=0&showDate=1&showCalendars=0&ctz=Europe%2FLondon&showTabs=1&showPrint=0&showDate=0&showTitle=0&showNav=1&src=c3Rhbm5pbmdsZXlib3dsc2NsdWJAZ21haWwuY29t&color=%23039BE5"
                width="95%"
                height="550"
            ></iframe>
        </div>
    );
}

export default FixturesResults;
