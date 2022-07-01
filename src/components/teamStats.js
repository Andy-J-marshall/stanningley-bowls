import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamRecords from './teamRecords';
import bowlsStats from '../data/bowlsStats.json';

function TeamStats() {
    const [showStats, setShowStats] = useState(false);
    const [buttonText, setButtonText] = useState('Show Team Stats');

    const teamStats = bowlsStats.teamResults;
    const playerStats = bowlsStats.playerResults;
    // TODO get the teamStats in a better way that using array
    const mondayStats = teamStats[0];
    const tuesdayStats = teamStats[1];
    const thursdayStats = teamStats[2];
    const saturdayStats = teamStats[3];

    function toggleTeamStats() {
        if (showStats) {
            setShowStats(false);
            setButtonText('Show Team Stats');
        } else {
            setShowStats(true);
            setButtonText('Hide Team Stats');
        }
    }

    return (
        <div id="TeamStats">
            <h1>Team Stats</h1>
            <TeamRecords stats={teamStats} />
            <CombinedTeamStats stats={teamStats} />

            <Button variant="light" size="lg" onClick={toggleTeamStats}>
                {buttonText}
            </Button>
            <br />
            <br />

            {showStats && (
                <div>
                    <IndividualTeamStats
                        index={1}
                        day="Monday"
                        stats={mondayStats}
                        playerStats={playerStats}
                    />
                    <IndividualTeamStats
                        index={2}
                        day="Tuesday"
                        stats={tuesdayStats}
                        playerStats={playerStats}
                    />
                    <IndividualTeamStats
                        index={3}
                        day="Thursday"
                        stats={thursdayStats}
                        playerStats={playerStats}
                    />
                    <IndividualTeamStats
                        index={4}
                        day="Saturday"
                        stats={saturdayStats}
                        playerStats={playerStats}
                    />
                </div>
            )}
        </div>
    );
}

export default TeamStats;
