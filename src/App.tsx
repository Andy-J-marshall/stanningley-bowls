import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './pages/home';
import Footer from './components/homePage/footer';
import Membership from './pages/membership';
import Contact from './pages/contact';
import Results from './pages/results';
import Navigation from './components/homePage/navigation';
import Records from './pages/records';
import TeamStats from './pages/teamStats';
import TeamInfo from './pages/teamInfo';
import PlayerStats from './pages/playerStats';
import History from './pages/history';
import YearSelectDropdown from './components/homePage/yearSelectDropdown';
import statsData from './statsData';
import './app.css';
import SocialInfo from './pages/socialInfo';
import Fixtures from './pages/fixtures';

const allYearStanningleyStats: any = statsData.allYearStanningleyStats;
const allYearLittlemoorStats: any = statsData.allYearLittlemoorStats;
const allYearPudseyStats: any = statsData.allYearPudseyStats;
const allYearAllClubsStats: any = statsData.allYearAllClubsStats;

function App() {
    const [stanningleyStats, setStanningleyStats] = useState(
        statsData.dataFiles.stanningleyStats24
    );
    const [littlemoorStats, setLittlemoorStats] = useState(
        statsData.dataFiles.littlemoorStats24
    );
    const [pudseyStats, setPudseyStats] = useState(
        statsData.dataFiles.pudseyStats24
    );
    const [allClubsStats, setAllClubsStats] = useState(
        statsData.dataFiles.allClubsStats24
    );
    const [yearToDisplay, setYearToDisplay] = useState('2024');

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Alegreya Sans', 'Alegreya SC'],
            },
        });
    }, []);

    function statsSelectCallback(year: string) {
        if (allYearStanningleyStats[`year${year}`]) {
            setStanningleyStats(allYearStanningleyStats[`year${year}`]);
        }
        if (allYearLittlemoorStats[`year${year}`]) {
            setLittlemoorStats(allYearLittlemoorStats[`year${year}`]);
        }
        if (allYearPudseyStats[`year${year}`]) {
            setPudseyStats(allYearPudseyStats[`year${year}`]);
        }
        if (allYearAllClubsStats[`year${year}`]) {
            setAllClubsStats(allYearAllClubsStats[`year${year}`]);
        }

        setYearToDisplay(year.toString());
    }

    return (
        <div id="app">
            <main>
                <Navigation />
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/membership" element={<Membership />} />
                    <Route path="/teams" element={<TeamInfo />} />
                    <Route path="/social" element={<SocialInfo />} />
                    <Route path="/fixtures" element={<Fixtures />} />
                    <Route
                        path="/results"
                        element={
                            <div className="stats-data-page-component center">
                                <YearSelectDropdown
                                    statsCallback={statsSelectCallback}
                                    yearToDisplay={yearToDisplay}
                                />
                                <Results
                                    stats={stanningleyStats}
                                    yearToDisplay={yearToDisplay}
                                />
                            </div>
                        }
                    />
                    <Route
                        path="/stats/player"
                        element={
                            <div className="stats-data-page-component center">
                                <YearSelectDropdown
                                    statsCallback={statsSelectCallback}
                                    yearToDisplay={yearToDisplay}
                                />
                                <PlayerStats
                                    stanningleyStats={stanningleyStats}
                                    stanningleyStatsForEveryYearArray={
                                        statsData.stanningleyStatsForEveryYearArray
                                    }
                                    littlemoorStats={littlemoorStats}
                                    littlemoorStatsForEveryYearArray={
                                        statsData.littlemoorStatsForEveryYearArray
                                    }
                                    pudseyStats={pudseyStats}
                                    pudseyStatsForEveryYearArray={
                                        statsData.pudseyStatsForEveryYearArray
                                    }
                                    allClubsStats={allClubsStats}
                                    allClubsStatsForEveryYearArray={
                                        statsData.allClubsStatsForEveryYearArray
                                    }
                                />
                            </div>
                        }
                    />
                    <Route
                        path="/stats/team"
                        element={
                            <div className="stats-data-page-component center">
                                <YearSelectDropdown
                                    statsCallback={statsSelectCallback}
                                    yearToDisplay={yearToDisplay}
                                />
                                <TeamStats
                                    stats={stanningleyStats}
                                    statsSelectCallback={statsSelectCallback}
                                    yearToDisplay={yearToDisplay}
                                />
                            </div>
                        }
                    />
                    <Route
                        path="/stats/records"
                        element={
                            <div className="stats-data-page-component center">
                                <YearSelectDropdown
                                    statsCallback={statsSelectCallback}
                                    yearToDisplay={yearToDisplay}
                                />
                                <Records
                                    stats={stanningleyStats}
                                    statsSelectCallback={statsSelectCallback}
                                    yearToDisplay={yearToDisplay}
                                />
                            </div>
                        }
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
