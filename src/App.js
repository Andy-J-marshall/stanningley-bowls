import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './components/home';
import Footer from './components/footer';
import Membership from './components/membership';
import Header from './components/header';
import Contact from './components/contact';
import Results from './components/results';
import Navigation from './components/navigation';
import PlayerRecords from './components/playerRecords';
import TeamStats from './components/teamStats';
import TeamInfo from './components/teamInfo';
import PlayerStats from './components/playerStats';
import History from './components/history';
import YearSelectDropdown from './components/yearSelectDropdown';
import statsData from './statsData';
import './app.css';

const {
    allYearStats,
    allYearCombinedStats,
    statsForEveryYearArray,
    combinedStatsForEveryYearArray,
} = statsData;

function App() {
    const [teamStats, setTeamStats] = useState(statsData.dataFiles.bowlsStats24);
    const [combinedStats, setCombinedStats] = useState(statsData.dataFiles.combinedBowlsStats24);
    const [yearToDisplay, setYearToDisplay] = useState('2024');

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Alegreya Sans', 'Alegreya SC'],
            },
        });
    }, []);

    function statsSelectCallback(year) {
        const currentYear = new Date().getFullYear();
        let statsForSelectedYear;
        let combinedStatsForSelectedYear;
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
            <Header />
            <main>
                <Navigation />
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/membership" element={<Membership />} />
                    <Route path="/team-and-social" element={<TeamInfo />} />
                    <Route
                        path="/results"
                        element={
                            <Results
                                stats={teamStats}
                                statsCallback={statsSelectCallback}
                                yearToDisplay={yearToDisplay}
                            />
                        }
                    />
                    <Route
                        path="/stats/player"
                        element={
                            <div>
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
                            <div>
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
                            <div>
                                <YearSelectDropdown
                                    statsCallback={statsSelectCallback}
                                    yearToDisplay={yearToDisplay}
                                />
                                <PlayerRecords
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
