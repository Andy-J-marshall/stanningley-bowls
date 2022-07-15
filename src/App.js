import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Stats from './components/stats';
import Footer from './components/footer';
import Membership from './components/membership';
import Header from './components/header';
import Contact from './components/contact';
import FixturesResults from './components/fixturesResults';
import Navigation from './components/navigation';
import Records from './components/records';
import TeamStats from './components/teamStats';
import PlayerStats from './components/playerStats';
import YearSelectDropdown from './components/yearSelectDropdown';
import bowlsStats2022 from './data/bowlsStats2022.json';
import './app.css';

function App() {
    const currentYear = new Date().getFullYear();
    let startYear = currentYear;
    const url = window.location.href.toLowerCase();
    if (url.includes('#20')) {
        const yearFromUrl = url.split('/stats#')[1];
        startYear = yearFromUrl;
    }

    // Stats for future years will go in here
    const allYearStats = {
        year2022: bowlsStats2022,
    };

    let defaultStats = allYearStats[`year${startYear}`];
    if (!defaultStats) {
        defaultStats = allYearStats[`year${currentYear}`];
        startYear = currentYear;
    }

    const [playerResults, setPlayerResults] = useState(
        defaultStats.playerResults
    );
    const [teamResults, setTeamResults] = useState(defaultStats.teamResults);
    const [updateDate, setUpdateDate] = useState(defaultStats.lastUpdated);

    return (
        <div id="app">
            <Header />
            <Navigation />
            {url.includes('/stats') && (
                <YearSelectDropdown
                    startYear={startYear}
                    defaultStats={defaultStats}
                    setUpdateDate={setUpdateDate}
                    setPlayerResults={setPlayerResults}
                    setTeamResults={setTeamResults}
                    allYearStats={allYearStats}
                />
            )}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/membership" element={<Membership />} />
                <Route
                    path="/fixtures-and-results"
                    element={<FixturesResults teamResults={teamResults} />}
                />
                <Route
                    path="/stats"
                    element={
                        <Stats
                            updateDate={updateDate}
                            playerResults={playerResults}
                        />
                    }
                >
                    <Route
                        path="/stats/player"
                        element={<PlayerStats playerResults={playerResults} />}
                    />
                    <Route
                        path="/stats/team"
                        element={
                            <TeamStats
                                teamResults={teamResults}
                                playerResults={playerResults}
                            />
                        }
                    />
                    <Route
                        path="/stats/records"
                        element={
                            <Records
                                teamResults={teamResults}
                                playerResults={playerResults}
                            />
                        }
                    />
                </Route>
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
