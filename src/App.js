import React from 'react';
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
import bowlsStats2022 from './data/bowlsStats2022.json';
import './app.css';

function App() {
    const currentYear = new Date().getFullYear();
    const allYearStats = {
        year2022: bowlsStats2022,
    };
    const defaultStats = allYearStats[`year${currentYear}`];
    const { teamResults, playerResults } = defaultStats;

    // TODO need to keep the nav bar for the records/ player stats and team stats
    return (
        <div id="app">
            <Header />
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/membership" element={<Membership />} />
                <Route
                    path="/fixtures-and-results"
                    element={<FixturesResults teamResults={teamResults} />}
                />
                <Route path="/stats" element={<Stats />}>
                    <Route
                        path="/stats/player"
                        element={<PlayerStats playersStats={playerResults} />}
                    />
                    <Route
                        path="/stats/team"
                        element={
                            <TeamStats
                                teamStats={teamResults}
                                playersStats={playerResults}
                            />
                        }
                    />
                    <Route
                        path="/stats/records"
                        element={
                            <Records
                                teamStats={teamResults}
                                playersStats={playerResults}
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
