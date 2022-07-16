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
import bowlsStats from './data/bowlsStats2022.json';
import './app.css';

function App() {
    // Stats for future years will need to be updated here
    const stats = bowlsStats;
    const { playerResults, teamResults } = stats;

    return (
        <div id="app">
            <Header />
            <Navigation />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/membership" element={<Membership />} />
                <Route
                    path="/fixtures-and-results"
                    element={<FixturesResults teamResults={teamResults} />}
                />
                <Route path="/stats" element={<Stats stats={stats} />}>
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
