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
const allYearLittlemoorStats: any = statsData.allYearLittlemoorStats;
const allYearAllClubsStats: any = statsData.allYearAllClubsStats;
const clubStatsForEveryYearArray: any[] = statsData.clubStatsForEveryYearArray;
const littlemoorStatsForEveryYearArray: any[] =
    statsData.littlemoorStatsForEveryYearArray;
const allClubsStatsForEveryYearArray: any[] =
    statsData.allClubsStatsForEveryYearArray;

function App() {
    const [clubStats, setClubStats] = useState(statsData.dataFiles.clubStats24);
    const [littlemoorStats, setLittlemoorStats] = useState(
        statsData.dataFiles.littlemoorStats24
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
        const currentYear = new Date().getFullYear();
        let clubStatsForSelectedYear: any;
        let littlemoorStatsForSelectedYear: any;
        let allClubsStatsForSelectedYear: any;

        switch (year.toString()) {
            case '2013':
                clubStatsForSelectedYear = allYearClubStats['year2013'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2013'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2013'];
                break;
            case '2014':
                clubStatsForSelectedYear = allYearClubStats['year2014'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2014'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2014'];
                break;
            case '2015':
                clubStatsForSelectedYear = allYearClubStats['year2015'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2015'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2015'];
                break;
            case '2016':
                clubStatsForSelectedYear = allYearClubStats['year2016'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2016'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2016'];
                break;
            case '2017':
                clubStatsForSelectedYear = allYearClubStats['year2017'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2017'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2017'];
                break;
            case '2018':
                clubStatsForSelectedYear = allYearClubStats['year2018'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2018'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2018'];
                break;
            case '2019':
                clubStatsForSelectedYear = allYearClubStats['year2019'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2019'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2019'];
                break;
            case '2021':
                clubStatsForSelectedYear = allYearClubStats['year2021'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2021'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2021'];
                break;
            case '2022':
                clubStatsForSelectedYear = allYearClubStats['year2022'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2022'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2022'];
                break;
            case '2023':
                clubStatsForSelectedYear = allYearClubStats['year2023'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2023'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2023'];
                break;
            case '2024':
                clubStatsForSelectedYear = allYearClubStats['year2024'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2024'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2024'];
                break;
            default:
                clubStatsForSelectedYear =
                    allYearClubStats[`year${currentYear}`];
                allClubsStatsForSelectedYear =
                    allYearAllClubsStats[`year${currentYear}`];
                break;
        }

        setYearToDisplay(year.toString());
        setClubStats(clubStatsForSelectedYear);
        setLittlemoorStats(littlemoorStatsForSelectedYear);
        setAllClubsStats(allClubsStatsForSelectedYear);
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
                                    littlemoorStats={littlemoorStats}
                                    allClubsStats={allClubsStats}
                                    clubStatsForEveryYearArray={
                                        clubStatsForEveryYearArray
                                    }
                                    littlemoorStatsForEveryYearArray={
                                        littlemoorStatsForEveryYearArray
                                    }
                                    allClubsStatsForEveryYearArray={
                                        allClubsStatsForEveryYearArray
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
