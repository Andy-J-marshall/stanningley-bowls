import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './components/home';
import Stats from './components/stats';
import Footer from './components/footer';
import Membership from './components/membership';
import Header from './components/header';
import Contact from './components/contact';
import Fixtures from './components/fixtures';
import Results from './components/results';
import Navigation from './components/navigation';
import Records from './components/records';
import TeamStats from './components/teamStats';
import TeamInfo from './components/teamInfo';
import PlayerStats from './components/playerStats';
import bowlsStats22 from './data/bowlsStats2022.json';
import combinedBowlsStats22 from './data/allPlayerStats2022.json';
import './app.css';

function App() {
    const [teamStats, setTeamStats] = useState(bowlsStats22);
    const [combinedStats, setCombinedStats] = useState(combinedBowlsStats22);

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Alegreya Sans', 'Alegreya SC'],
            },
        });
    }, []);

    // Stats for future years will need to be updated here
    const allYearStats = {
        year2022: bowlsStats22,
    };
    const allYearCombinedStats = {
        year2022: combinedBowlsStats22,
    };

    function statsCallback(year) {
        const currentYear = new Date().getFullYear();
        let statsForSelectedYear;
        let combinedStatsForSelectedYear;
        switch (year.toString()) {
            case '2022':
                statsForSelectedYear = allYearStats['year2022'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2022'];
                break;
            default:
                statsForSelectedYear = allYearStats[`year${currentYear}`];
                combinedStatsForSelectedYear =
                    allYearCombinedStats[`year${currentYear}`];
                break;
        }
        setTeamStats(statsForSelectedYear);
        setCombinedStats(combinedStatsForSelectedYear);
    }

    return (
        <div id="app">
            <Header />
            <Navigation />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/team-and-social" element={<TeamInfo />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route
                    path="/results"
                    element={<Results stats={teamStats} />}
                />
                <Route
                    path="/stats"
                    element={
                        <Stats
                            yearsToDisplay={Object.keys(allYearStats).length}
                            statsCallback={statsCallback}
                            stats={teamStats}
                        />
                    }
                >
                    <Route
                        path="/stats/player"
                        element={<PlayerStats stats={teamStats} combinedStats={combinedStats} />}
                    />
                    <Route
                        path="/stats/team"
                        element={<TeamStats stats={teamStats} />}
                    />
                    <Route
                        path="/stats/records"
                        element={<Records stats={teamStats} />}
                    />
                </Route>
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
