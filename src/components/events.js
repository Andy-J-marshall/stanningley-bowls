import React from 'react';
import facebook from '../images/socials/facebook_blue.png';

const today = new Date().getTime();
const events = [
    {
        date: new Date(2022, 7, 14).getTime(),
        title: 'Event 1',
        description: 'This is event 1',
    },
    {
        date: new Date(2022, 6, 14).getTime(),
        title: 'Event 2',
        description: 'This is event 2',
    },
];

let eventsToShow;
events.forEach((event) => {
    if (!eventsToShow) {
        eventsToShow = event.date >= today ? true : false;
    }
});

function Events() {
    return (
        <div>
            {eventsToShow && (
                <div id="events" className="center page-component">
                    <h1>UPCOMING EVENTS</h1>
                    <a
                        style={{ textDecoration: 'none' }}
                        href="https://www.facebook.com/StanningleyBowlsClub/events/"
                    >
                        <img
                            className="logos"
                            src={facebook}
                            alt="Facebook Events link"
                        />
                        See Facebook Events
                    </a>

                    {events.map((event) => {
                        if (event.date >= today) {
                            return (
                                <div>
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default Events;
