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
import bowlsStats13 from './data/bowlsStats2013.json';
import combinedBowlsStats13 from './data/allPlayerStats2013.json';
import bowlsStats14 from './data/bowlsStats2014.json';
import combinedBowlsStats14 from './data/allPlayerStats2014.json';
import bowlsStats15 from './data/bowlsStats2015.json';
import combinedBowlsStats15 from './data/allPlayerStats2015.json';
import bowlsStats16 from './data/bowlsStats2016.json';
import combinedBowlsStats16 from './data/allPlayerStats2016.json';
import bowlsStats17 from './data/bowlsStats2017.json';
import combinedBowlsStats17 from './data/allPlayerStats2017.json';
import bowlsStats18 from './data/bowlsStats2018.json';
import combinedBowlsStats18 from './data/allPlayerStats2018.json';
import bowlsStats19 from './data/bowlsStats2019.json';
import combinedBowlsStats19 from './data/allPlayerStats2019.json';
import bowlsStats21 from './data/bowlsStats2021.json';
import combinedBowlsStats21 from './data/allPlayerStats2021.json';
import bowlsStats22 from './data/bowlsStats2022.json';
import combinedBowlsStats22 from './data/allPlayerStats2022.json';
import bowlsStats23 from './data/bowlsStats2023.json';
import combinedBowlsStats23 from './data/allPlayerStats2023.json';
import bowlsStats24 from './data/bowlsStats2024.json';
import combinedBowlsStats24 from './data/allPlayerStats2024.json';
import './app.css';

function App() {
    const [teamStats, setTeamStats] = useState(bowlsStats24);
    const [combinedStats, setCombinedStats] = useState(combinedBowlsStats24);
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
        year2013: bowlsStats13,
        year2014: bowlsStats14,
        year2015: bowlsStats15,
        year2016: bowlsStats16,
        year2017: bowlsStats17,
        year2018: bowlsStats18,
        year2019: bowlsStats19,
        year2021: bowlsStats21,
        year2022: bowlsStats22,
        year2023: bowlsStats23,
        year2024: bowlsStats24,
    };
    const allYearCombinedStats = {
        year2013: combinedBowlsStats13,
        year2014: combinedBowlsStats14,
        year2015: combinedBowlsStats15,
        year2016: combinedBowlsStats16,
        year2017: combinedBowlsStats17,
        year2018: combinedBowlsStats18,
        year2019: combinedBowlsStats19,
        year2021: combinedBowlsStats21,
        year2022: combinedBowlsStats22,
        year2023: combinedBowlsStats23,
        year2024: combinedBowlsStats24,
    };
    const statsForEveryYearArray = [
        bowlsStats13,
        bowlsStats14,
        bowlsStats15,
        bowlsStats16,
        bowlsStats17,
        bowlsStats18,
        bowlsStats19,
        bowlsStats21,
        bowlsStats22,
        bowlsStats23,
        bowlsStats24,
    ];
    const combinedStatsForEveryYearArray = [
        combinedBowlsStats13,
        combinedBowlsStats14,
        combinedBowlsStats15,
        combinedBowlsStats16,
        combinedBowlsStats17,
        combinedBowlsStats18,
        combinedBowlsStats19,
        combinedBowlsStats21,
        combinedBowlsStats22,
        combinedBowlsStats23,
        combinedBowlsStats24,
    ];

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
