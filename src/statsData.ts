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

// Stats for future years will need to be updated here
const dataFiles = {
    bowlsStats13,
    combinedBowlsStats13,
    bowlsStats14,
    combinedBowlsStats14,
    bowlsStats15,
    combinedBowlsStats15,
    bowlsStats16,
    combinedBowlsStats16,
    bowlsStats17,
    combinedBowlsStats17,
    bowlsStats18,
    combinedBowlsStats18,
    bowlsStats19,
    combinedBowlsStats19,
    bowlsStats21,
    combinedBowlsStats21,
    bowlsStats22,
    combinedBowlsStats22,
    bowlsStats23,
    combinedBowlsStats23,
    bowlsStats24,
    combinedBowlsStats24,
};

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

export default {
    dataFiles,
    allYearStats,
    allYearCombinedStats,
    statsForEveryYearArray,
    combinedStatsForEveryYearArray,
};
