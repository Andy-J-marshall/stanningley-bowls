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
import bowlsStats22 from './data/bowlsStats2022.json';
import './app.css';


function App() {
    const [stats, setStats] = useState(bowlsStats22);

    function statsCallback(year) {
        const currentYear = new Date().getFullYear();
        let statsForSelectedYear;
        // Stats for future years will need to be updated here
        const allYearStats = {
            year2022: bowlsStats22,
        };

        switch (year.toString()) {
            case '2022':
                statsForSelectedYear = allYearStats['year2022'];
                break;
            default:
                statsForSelectedYear = allYearStats[`year${currentYear}`];
                break;
        }
        setStats(statsForSelectedYear);
    }

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
                    element={<FixturesResults stats={stats} />}
                />
                <Route
                    path="/stats"
                    element={
                        <Stats statsCallback={statsCallback} stats={stats} />
                    }
                >
                    <Route
                        path="/stats/player"
                        element={<PlayerStats stats={stats} />}
                    />
                    <Route
                        path="/stats/team"
                        element={<TeamStats stats={stats} />}
                    />
                    <Route
                        path="/stats/records"
                        element={<Records stats={stats} />}
                    />
                </Route>
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
