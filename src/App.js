import { useState, useEffect } from 'react';
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
import bowlsStats23 from './data/bowlsStats2023.json';
import combinedBowlsStats23 from './data/allPlayerStats2023.json';
import './app.css';

// TODO update README to explain how to update script per year?

function App() {
    // TODO change to 2023
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
        year2023: bowlsStats23,
    };
    const allYearCombinedStats = {
        year2022: combinedBowlsStats22,
        year2023: combinedBowlsStats23,
    };
    //TODO create a combined stats option?

    function statsCallback(year) {
        const currentYear = new Date().getFullYear();
        let statsForSelectedYear;
        let combinedStatsForSelectedYear;
        switch (year.toString()) {
            case '2022':
                statsForSelectedYear = allYearStats['year2022'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2022'];
                break;
            case '2023':
                statsForSelectedYear = allYearStats['year2023'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2023'];
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
                        element={
                            <PlayerStats
                                stats={teamStats}
                                combinedStats={combinedStats}
                            />
                        }
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
