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
import bowlsStats2022 from './data/bowlsStats2022.json';
import './app.css';

function App() {
    const currentYear = new Date().getFullYear();
    const allYearStats = {
        year2022: bowlsStats2022,
    };
    const defaultStats = allYearStats[`year${currentYear}`];
    const { teamResults } = defaultStats;

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
                <Route path="/stats" element={<Stats />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
