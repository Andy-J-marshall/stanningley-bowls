import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import bowlsStats from '../data/bowlsStats.json';

function TeamStats() {
    const teamStats = bowlsStats.teamResults;
    const playerStats = bowlsStats.playerResults;
    // TODO get the teamStats in a better way than using array
    const mondayStats = teamStats[0];
    const tuesdayStats = teamStats[1];
    const thursdayStats = teamStats[2];
    const saturdayStats = teamStats[3];

    return (
        <div>
            <Tabs
                defaultActiveKey="Combined"
                id="team-stats"
                className="mb-3 tabs"
            >
                <Tab eventKey="Combined" title="All">
                    <CombinedTeamStats stats={teamStats} />
                </Tab>
                <Tab eventKey="Monday" title="Mon">
                    <IndividualTeamStats
                        index={1}
                        day="Monday"
                        stats={mondayStats}
                        playerStats={playerStats}
                    />
                </Tab>
                <Tab eventKey="Tuesday" title="Tues">
                    <IndividualTeamStats
                        index={2}
                        day="Tuesday"
                        stats={tuesdayStats}
                        playerStats={playerStats}
                    />
                </Tab>
                <Tab eventKey="Thursday" title="Thur">
                    <IndividualTeamStats
                        index={3}
                        day="Thursday"
                        stats={thursdayStats}
                        playerStats={playerStats}
                    />
                </Tab>
                <Tab eventKey="Saturday" title="Sat">
                    <IndividualTeamStats
                        index={4}
                        day="Saturday"
                        stats={saturdayStats}
                        playerStats={playerStats}
                    />
                </Tab>
            </Tabs>
        </div>
    );
}

export default TeamStats;
