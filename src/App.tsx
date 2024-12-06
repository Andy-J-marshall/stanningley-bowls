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

const allYearStanningleyStats: any = statsData.allYearClubStats;
const stanningleyStatsForEveryYearArray: any[] =
    statsData.clubStatsForEveryYearArray;
const allYearAllClubsStats: any = statsData.allYearAllClubsStats;
const allClubsStatsForEveryYearArray: any[] =
    statsData.allClubsStatsForEveryYearArray;
const allYearLittlemoorStats: any = statsData.allYearLittlemoorStats;
const littlemoorStatsForEveryYearArray: any[] =
    statsData.littlemoorStatsForEveryYearArray;
const allYearPudseyStats: any = statsData.allYearPudseyStats;
const pudseyStatsForEveryYearArray: any[] =
    statsData.pudseyStatsForEveryYearArray;

function App() {
    const [clubStats, setClubStats] = useState(statsData.dataFiles.clubStats24);
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
        let clubStatsForSelectedYear: any;
        let littlemoorStatsForSelectedYear: any;
        let pudseyStatsForSelectedYear: any;
        let allClubsStatsForSelectedYear: any;

        switch (year.toString()) {
            case '2013':
                clubStatsForSelectedYear = allYearStanningleyStats['year2013'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2013'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2013'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2013'];
                break;
            case '2014':
                clubStatsForSelectedYear = allYearStanningleyStats['year2014'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2014'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2014'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2014'];
                break;
            case '2015':
                clubStatsForSelectedYear = allYearStanningleyStats['year2015'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2015'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2015'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2015'];
                break;
            case '2016':
                clubStatsForSelectedYear = allYearStanningleyStats['year2016'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2016'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2016'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2016'];
                break;
            case '2017':
                clubStatsForSelectedYear = allYearStanningleyStats['year2017'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2017'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2017'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2017'];
                break;
            case '2018':
                clubStatsForSelectedYear = allYearStanningleyStats['year2018'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2018'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2018'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2018'];
                break;
            case '2019':
                clubStatsForSelectedYear = allYearStanningleyStats['year2019'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2019'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2019'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2019'];
                break;
            case '2021':
                clubStatsForSelectedYear = allYearStanningleyStats['year2021'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2021'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2021'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2021'];
                break;
            case '2022':
                clubStatsForSelectedYear = allYearStanningleyStats['year2022'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2022'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2022'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2022'];
                break;
            case '2023':
                clubStatsForSelectedYear = allYearStanningleyStats['year2023'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2023'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2023'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2023'];
                break;
            default:
            case '2024':
                clubStatsForSelectedYear = allYearStanningleyStats['year2024'];
                littlemoorStatsForSelectedYear =
                    allYearLittlemoorStats['year2024'];
                pudseyStatsForSelectedYear = allYearPudseyStats['year2024'];
                allClubsStatsForSelectedYear = allYearAllClubsStats['year2024'];
                break;
        }

        setYearToDisplay(year.toString());
        setClubStats(clubStatsForSelectedYear);
        setLittlemoorStats(littlemoorStatsForSelectedYear);
        setPudseyStats(pudseyStatsForSelectedYear);
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
                                    clubStatsForEveryYearArray={
                                        stanningleyStatsForEveryYearArray
                                    }
                                    littlemoorStats={littlemoorStats}
                                    littlemoorStatsForEveryYearArray={
                                        littlemoorStatsForEveryYearArray
                                    }
                                    pudseyStats={pudseyStats}
                                    pudseyStatsForEveryYearArray={
                                        pudseyStatsForEveryYearArray
                                    }
                                    allClubsStats={allClubsStats}
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
