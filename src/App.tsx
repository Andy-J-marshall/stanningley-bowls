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

const allYearStats: any = statsData.allYearStats;
const allYearCombinedStats: any = statsData.allYearCombinedStats;
const statsForEveryYearArray: any[] = statsData.statsForEveryYearArray;
const combinedStatsForEveryYearArray: any[] =
    statsData.combinedStatsForEveryYearArray;

function App() {
    const [teamStats, setTeamStats] = useState(
        statsData.dataFiles.bowlsStats24
    );
    const [combinedStats, setCombinedStats] = useState(
        statsData.dataFiles.combinedBowlsStats24
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
                statsForSelectedYear = allYearStats['year2013'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2013'];
                break;
            case '2014':
                statsForSelectedYear = allYearStats['year2014'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2014'];
                break;
            case '2015':
                statsForSelectedYear = allYearStats['year2015'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2015'];
                break;
            case '2016':
                statsForSelectedYear = allYearStats['year2016'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2016'];
                break;
            case '2017':
                statsForSelectedYear = allYearStats['year2017'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2017'];
                break;
            case '2018':
                statsForSelectedYear = allYearStats['year2018'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2018'];
                break;
            case '2019':
                statsForSelectedYear = allYearStats['year2019'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2019'];
                break;
            case '2021':
                statsForSelectedYear = allYearStats['year2021'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2021'];
                break;
            case '2022':
                statsForSelectedYear = allYearStats['year2022'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2022'];
                break;
            case '2023':
                statsForSelectedYear = allYearStats['year2023'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2023'];
                break;
            case '2024':
                statsForSelectedYear = allYearStats['year2024'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2024'];
                break;
            default:
                statsForSelectedYear = allYearStats[`year${currentYear}`];
                combinedStatsForSelectedYear =
                    allYearCombinedStats[`year${currentYear}`];
                break;
        }
        setYearToDisplay(year.toString());
        setTeamStats(statsForSelectedYear);
        setCombinedStats(combinedStatsForSelectedYear);
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
                                    stats={teamStats}
                                    statsCallback={statsSelectCallback}
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
                                    stats={teamStats}
                                    combinedStats={combinedStats}
                                    statsForEveryYearArray={
                                        statsForEveryYearArray
                                    }
                                    combinedStatsForEveryYearArray={
                                        combinedStatsForEveryYearArray
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
                                    stats={teamStats}
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
                                    stats={teamStats}
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
