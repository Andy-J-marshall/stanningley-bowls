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

const allYearClubStats: any = statsData.allYearClubStats;
const allYearAllClubsStats: any = statsData.allYearAllClubStats;
const clubStatsForEveryYearArray: any[] = statsData.clubStatsForEveryYearArray;
const allClubStatsForEveryYearArray: any[] =
    statsData.allClubStatsForEveryYearArray;

function App() {
    const [clubStats, setClubStats] = useState(statsData.dataFiles.clubStats24);
    const [allClubsStats, setAllClubsStats] = useState(
        statsData.dataFiles.allClubStats24
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
        const currentYear = new Date().getFullYear();
        let statsForSelectedYear: any;
        let combinedStatsForSelectedYear: any;
        switch (year.toString()) {
            case '2013':
                statsForSelectedYear = allYearClubStats['year2013'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2013'];
                break;
            case '2014':
                statsForSelectedYear = allYearClubStats['year2014'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2014'];
                break;
            case '2015':
                statsForSelectedYear = allYearClubStats['year2015'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2015'];
                break;
            case '2016':
                statsForSelectedYear = allYearClubStats['year2016'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2016'];
                break;
            case '2017':
                statsForSelectedYear = allYearClubStats['year2017'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2017'];
                break;
            case '2018':
                statsForSelectedYear = allYearClubStats['year2018'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2018'];
                break;
            case '2019':
                statsForSelectedYear = allYearClubStats['year2019'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2019'];
                break;
            case '2021':
                statsForSelectedYear = allYearClubStats['year2021'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2021'];
                break;
            case '2022':
                statsForSelectedYear = allYearClubStats['year2022'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2022'];
                break;
            case '2023':
                statsForSelectedYear = allYearClubStats['year2023'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2023'];
                break;
            case '2024':
                statsForSelectedYear = allYearClubStats['year2024'];
                combinedStatsForSelectedYear = allYearAllClubsStats['year2024'];
                break;
            default:
                statsForSelectedYear = allYearClubStats[`year${currentYear}`];
                combinedStatsForSelectedYear =
                    allYearAllClubsStats[`year${currentYear}`];
                break;
        }
        setYearToDisplay(year.toString());
        setClubStats(statsForSelectedYear);
        setAllClubsStats(combinedStatsForSelectedYear);
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
                                    stats={clubStats}
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
                                    clubStats={clubStats}
                                    allClubStats={allClubsStats}
                                    clubStatsForEveryYearArray={
                                        clubStatsForEveryYearArray
                                    }
                                    allClubStatsForEveryYearArray={
                                        allClubStatsForEveryYearArray
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
                                    stats={clubStats}
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
                                    stats={clubStats}
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
