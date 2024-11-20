import clubStats13 from './data/stanningleyStats2013.json';
import allClubStats13 from './data/allClubStats2013.json';
import clubStats14 from './data/stanningleyStats2014.json';
import allClubStats14 from './data/allClubStats2014.json';
import clubStats15 from './data/stanningleyStats2015.json';
import allClubStats15 from './data/allClubStats2015.json';
import clubStats16 from './data/stanningleyStats2016.json';
import allClubStats16 from './data/allClubStats2016.json';
import clubStats17 from './data/stanningleyStats2017.json';
import allClubStats17 from './data/allClubStats2017.json';
import clubStats18 from './data/stanningleyStats2018.json';
import allClubStats18 from './data/allClubStats2018.json';
import clubStats19 from './data/stanningleyStats2019.json';
import allClubStats19 from './data/allClubStats2019.json';
import clubStats21 from './data/stanningleyStats2021.json';
import allClubStats21 from './data/allClubStats2021.json';
import clubStats22 from './data/stanningleyStats2022.json';
import allClubStats22 from './data/allClubStats2022.json';
import clubStats23 from './data/stanningleyStats2023.json';
import allClubStats23 from './data/allClubStats2023.json';
import clubStats24 from './data/stanningleyStats2024.json';
import allClubStats24 from './data/allClubStats2024.json';

// Stats for future years will need to be updated here
const dataFiles = {
    clubStats13,
    allClubStats13,
    clubStats14,
    allClubStats14,
    clubStats15,
    allClubStats15,
    clubStats16,
    allClubStats16,
    clubStats17,
    allClubStats17,
    clubStats18,
    allClubStats18,
    clubStats19,
    allClubStats19,
    clubStats21,
    allClubStats21,
    clubStats22,
    allClubStats22,
    clubStats23,
    allClubStats23,
    clubStats24,
    allClubStats24,
};

const allYearClubStats = {
    year2013: dataFiles.clubStats13,
    year2014: dataFiles.clubStats14,
    year2015: dataFiles.clubStats15,
    year2016: dataFiles.clubStats16,
    year2017: dataFiles.clubStats17,
    year2018: dataFiles.clubStats18,
    year2019: dataFiles.clubStats19,
    year2021: dataFiles.clubStats21,
    year2022: dataFiles.clubStats22,
    year2023: dataFiles.clubStats23,
    year2024: dataFiles.clubStats24,
};

const allYearAllClubStats = {
    year2013: dataFiles.allClubStats13,
    year2014: dataFiles.allClubStats14,
    year2015: dataFiles.allClubStats15,
    year2016: dataFiles.allClubStats16,
    year2017: dataFiles.allClubStats17,
    year2018: dataFiles.allClubStats18,
    year2019: dataFiles.allClubStats19,
    year2021: dataFiles.allClubStats21,
    year2022: dataFiles.allClubStats22,
    year2023: dataFiles.allClubStats23,
    year2024: dataFiles.allClubStats24,
};

const clubStatsForEveryYearArray = [
    dataFiles.clubStats13,
    dataFiles.clubStats14,
    dataFiles.clubStats15,
    dataFiles.clubStats16,
    dataFiles.clubStats17,
    dataFiles.clubStats18,
    dataFiles.clubStats19,
    dataFiles.clubStats21,
    dataFiles.clubStats22,
    dataFiles.clubStats23,
    dataFiles.clubStats24,
];

const allClubStatsForEveryYearArray = [
    dataFiles.allClubStats13,
    dataFiles.allClubStats14,
    dataFiles.allClubStats15,
    dataFiles.allClubStats16,
    dataFiles.allClubStats17,
    dataFiles.allClubStats18,
    dataFiles.allClubStats19,
    dataFiles.allClubStats21,
    dataFiles.allClubStats22,
    dataFiles.allClubStats23,
    dataFiles.allClubStats24,
];

export default {
    dataFiles,
    allYearClubStats,
    allYearAllClubStats,
    clubStatsForEveryYearArray,
    allClubStatsForEveryYearArray,
};
