import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import './app.css';
import Home from './pages/home';
import Membership from './pages/membership';
import Contact from './pages/contact';
import Results from './pages/results';
import Records from './pages/records';
import TeamStats from './pages/teamStats';
import TeamInfo from './pages/teamInfo';
import PlayerStats from './pages/playerStats';
import History from './pages/history';
import SocialInfo from './pages/socialInfo';
import Fixtures from './pages/fixtures';
import Navigation from './components/homePage/navigation';
import Footer from './components/homePage/footer';
import YearSelectDropdown from './components/homePage/yearSelectDropdown';
import { FullStatsFile } from './types/interfaces';
import statsData from './statsData';

// TODO set types here?
const allYearStanningleyStats: any = statsData.allYearStanningleyStats;
const allYearLittlemoorStats: any = statsData.allYearLittlemoorStats;
const allYearPudseyStats: any = statsData.allYearPudseyStats;
const allYearAllClubsStats: any = statsData.allYearAllClubsStats;

function App() {
    const [stanningleyStats, setStanningleyStats] = useState<FullStatsFile>(
        statsData.allYearStanningleyStats.year2024
    );
    const [littlemoorStats, setLittlemoorStats] = useState<FullStatsFile>(
        statsData.allYearLittlemoorStats.year2024
    );
    const [pudseyStats, setPudseyStats] = useState<FullStatsFile>(
        statsData.allYearPudseyStats.year2024
    );
    const [allClubsStats, setAllClubsStats] = useState<FullStatsFile>(
        statsData.allYearAllClubsStats.year2024
    );
    const [yearToDisplay, setYearToDisplay] = useState('2024');

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Alegreya Sans', 'Alegreya SC'],
            },
        });
    }, []);

    // TODO fix issue with Records for all years (or don't save the state)
    // TODO title case for records/team stats/results etc.
    // TODO refactor
    function statsSelectCallback(year: string) {
        // TODO refactor
        const statsYearsProperty = isNaN(Number(year))
            ? 'allYears'
            : `year${year}`;

        if (
            allYearStanningleyStats[statsYearsProperty] &&
            allYearLittlemoorStats[statsYearsProperty] &&
            allYearPudseyStats[statsYearsProperty] &&
            allYearAllClubsStats[statsYearsProperty]
        ) {
            setStanningleyStats(allYearStanningleyStats[statsYearsProperty]);
            setLittlemoorStats(allYearLittlemoorStats[statsYearsProperty]);
            setPudseyStats(allYearPudseyStats[statsYearsProperty]);
            setAllClubsStats(allYearAllClubsStats[statsYearsProperty]);

            setYearToDisplay(year.toString());
        }
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
                                    displayAllYearsOption={false}
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
                                    displayAllYearsOption={true}
                                />
                                <PlayerStats
                                    stanningleyStats={stanningleyStats}
                                    littlemoorStats={littlemoorStats}
                                    pudseyStats={pudseyStats}
                                    allClubsStats={allClubsStats}
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
                                    displayAllYearsOption={false}
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
                                    displayAllYearsOption={false}
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
