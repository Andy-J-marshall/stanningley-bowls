import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TeamStats from './teamStats';
import PlayerStats from './playerStats';

function Stats() {
    const [showStats, setShowStats] = useState(false);
    const [showTeamStats, setShowTeamStats] = useState(false);

    // TODO decide how to display this information. Maybe records together? Use a nav bar?
    // TODO what info should I default to?

    function displayPlayerStats() {
        if (showStats) {
            setShowStats(false);
        } else {
            setShowStats(true);
        }
    }

    function displayTeamStats() {
        if (showStats) {
            setShowTeamStats(false);
        } else {
            setShowTeamStats(true);
        }
    }

    return (
        <div>
            <Button variant="light" size="lg" onClick={displayPlayerStats}>
                {'Player Stats'}
            </Button>
            <Button variant="light" size="lg" onClick={displayTeamStats}>
                {'Team Stats'}
            </Button>
            <br />
            <br />
            {showStats && <PlayerStats />}
            {showTeamStats && <TeamStats />}
        </div>
    );
}

export default Stats;
