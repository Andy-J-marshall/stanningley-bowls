import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './components/home';
import Footer from './components/footer';
import Membership from './components/membership';
import Header from './components/header';
import Contact from './components/contact';
import Fixtures from './components/fixtures';
import Results from './components/results';
import Navigation from './components/navigation';
import PlayerRecords from './components/playerRecords';
import TeamStats from './components/teamStats';
import TeamInfo from './components/teamInfo';
import PlayerStats from './components/playerStats';
import History from './components/history';
import YearSelectDropdown from './components/yearSelectDropdown';
import dataFiles from './dataFiles';
import './app.css';

function App() {
    const [teamStats, setTeamStats] = useState(dataFiles.bowlsStats24);
    const [combinedStats, setCombinedStats] = useState(dataFiles.combinedBowlsStats24);
    const [pudseyStats, setPudseyTeamStats] = useState(dataFiles.pudseyBowlsStats24);
    const [pudseyCombinedStats, setPudseyCombinedStats] = useState(dataFiles.pudseyCombinedBowlsStats24);
    const [yearToDisplay, setYearToDisplay] = useState('2024');

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Alegreya Sans', 'Alegreya SC'],
            },
        });
    }, []);

    // Stats for future years will need to be updated here
    const allYearStats = {
        year2013: dataFiles.bowlsStats13,
        year2014: dataFiles.bowlsStats14,
        year2015: dataFiles.bowlsStats15,
        year2016: dataFiles.bowlsStats16,
        year2017: dataFiles.bowlsStats17,
        year2018: dataFiles.bowlsStats18,
        year2019: dataFiles.bowlsStats19,
        year2021: dataFiles.bowlsStats21,
        year2022: dataFiles.bowlsStats22,
        year2023: dataFiles.bowlsStats23,
        year2024: dataFiles.bowlsStats24,
    };
    const allYearCombinedStats = {
        year2013: dataFiles.combinedBowlsStats13,
        year2014: dataFiles.combinedBowlsStats14,
        year2015: dataFiles.combinedBowlsStats15,
        year2016: dataFiles.combinedBowlsStats16,
        year2017: dataFiles.combinedBowlsStats17,
        year2018: dataFiles.combinedBowlsStats18,
        year2019: dataFiles.combinedBowlsStats19,
        year2021: dataFiles.combinedBowlsStats21,
        year2022: dataFiles.combinedBowlsStats22,
        year2023: dataFiles.combinedBowlsStats23,
        year2024: dataFiles.combinedBowlsStats24,
    };
    const statsForEveryYearArray = [
        dataFiles.bowlsStats13,
        dataFiles.bowlsStats14,
        dataFiles.bowlsStats15,
        dataFiles.bowlsStats16,
        dataFiles.bowlsStats17,
        dataFiles.bowlsStats18,
        dataFiles.bowlsStats19,
        dataFiles.bowlsStats21,
        dataFiles.bowlsStats22,
        dataFiles.bowlsStats23,
        dataFiles.bowlsStats24,
    ];
    const combinedStatsForEveryYearArray = [
        dataFiles.combinedBowlsStats13,
        dataFiles.combinedBowlsStats14,
        dataFiles.combinedBowlsStats15,
        dataFiles.combinedBowlsStats16,
        dataFiles.combinedBowlsStats17,
        dataFiles.combinedBowlsStats18,
        dataFiles.combinedBowlsStats19,
        dataFiles.combinedBowlsStats21,
        dataFiles.combinedBowlsStats22,
        dataFiles.combinedBowlsStats23,
        dataFiles.combinedBowlsStats24,
    ];

    const pudseyAllYearStats = {
        year2024: dataFiles.pudseyBowlsStats24,
        year2023: dataFiles.pudseyBowlsStats23,
        year2022: dataFiles.pudseyBowlsStats22,
        year2021: dataFiles.pudseyBowlsStats21,
    };
    const pudseyAllYearCombinedStats = {
        year2024: dataFiles.pudseyCombinedBowlsStats24,
        year2023: dataFiles.pudseyCombinedBowlsStats23,
        year2022: dataFiles.pudseyCombinedBowlsStats22,
        year2021: dataFiles.pudseyCombinedBowlsStats21,
    };
    const pudseyStatsForEveryYearArray = [
        dataFiles.pudseyBowlsStats24,
        dataFiles.pudseyBowlsStats23,
        dataFiles.pudseyBowlsStats22,
        dataFiles.pudseyBowlsStats21,
    ];
    const pudseyCombinedStatsForEveryYearArray = [
        dataFiles.pudseyCombinedBowlsStats24,
        dataFiles.pudseyCombinedBowlsStats23,
        dataFiles.pudseyCombinedBowlsStats22,
        dataFiles.pudseyCombinedBowlsStats21,
    ];

    function statsSelectCallback(year) {
        const currentYear = new Date().getFullYear();
        let statsForSelectedYear;
        let combinedStatsForSelectedYear;
        let pudseyStatsForSelectedYear;
        let pudseyCombinedStatsForSelectedYear;
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
                pudseyStatsForSelectedYear = pudseyAllYearStats['year2021'];
                pudseyCombinedStatsForSelectedYear = pudseyAllYearCombinedStats['year2021'];
                break;
            case '2022':
                statsForSelectedYear = allYearStats['year2022'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2022'];
                pudseyStatsForSelectedYear = pudseyAllYearStats['year2022'];
                pudseyCombinedStatsForSelectedYear = pudseyAllYearCombinedStats['year2022'];
                break;
            case '2023':
                statsForSelectedYear = allYearStats['year2023'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2023'];
                pudseyStatsForSelectedYear = pudseyAllYearStats['year2023'];
                pudseyCombinedStatsForSelectedYear = pudseyAllYearCombinedStats['year2023'];
                break;
            case '2024':
                statsForSelectedYear = allYearStats['year2024'];
                combinedStatsForSelectedYear = allYearCombinedStats['year2024'];
                pudseyStatsForSelectedYear = pudseyAllYearStats['year2024'];
                pudseyCombinedStatsForSelectedYear = pudseyAllYearCombinedStats['year2024'];
                break;
            default:
                statsForSelectedYear = allYearStats[`year${currentYear}`];
                combinedStatsForSelectedYear = allYearCombinedStats[`year${currentYear}`];
                pudseyStatsForSelectedYear = pudseyAllYearStats[`year${currentYear}`];
                pudseyCombinedStatsForSelectedYear = pudseyAllYearCombinedStats[`year${currentYear}`];
                break;
        }
        setYearToDisplay(year.toString());
        setTeamStats(statsForSelectedYear);
        setCombinedStats(combinedStatsForSelectedYear);
        setPudseyTeamStats(pudseyStatsForSelectedYear);
        setPudseyCombinedStats(pudseyCombinedStatsForSelectedYear);
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
                    <Route path="/fixtures" element={<Fixtures />} />
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
                                    showOldYears={true}
                                />
                                <PlayerStats
                                    url="/#/stats/player"
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
                        path="/stats/pudsey"
                        element={
                            <div>
                                <YearSelectDropdown
                                    statsCallback={statsSelectCallback}
                                    yearToDisplay={yearToDisplay}
                                    showOldYears={true}
                                />
                                <PlayerStats
                                    url="/#/stats/pudsey"
                                    stats={pudseyStats}
                                    combinedStats={pudseyCombinedStats}
                                    statsForEveryYearArray={
                                        pudseyStatsForEveryYearArray
                                    }
                                    combinedStatsForEveryYearArray={
                                        pudseyCombinedStatsForEveryYearArray
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
                                    showOldYears={false}
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
                                    showOldYears={true}
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
