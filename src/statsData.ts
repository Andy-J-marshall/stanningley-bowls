import clubStats13 from './data/stanningleyStats2013.json';
import clubStats14 from './data/stanningleyStats2014.json';
import clubStats15 from './data/stanningleyStats2015.json';
import clubStats16 from './data/stanningleyStats2016.json';
import clubStats17 from './data/stanningleyStats2017.json';
import clubStats18 from './data/stanningleyStats2018.json';
import clubStats19 from './data/stanningleyStats2019.json';
import clubStats21 from './data/stanningleyStats2021.json';
import clubStats22 from './data/stanningleyStats2022.json';
import clubStats23 from './data/stanningleyStats2023.json';
import clubStats24 from './data/stanningleyStats2024.json';
import allClubsStats13 from './data/allClubsStats2013.json';
import allClubsStats14 from './data/allClubsStats2014.json';
import allClubsStats15 from './data/allClubsStats2015.json';
import allClubsStats16 from './data/allClubsStats2016.json';
import allClubsStats17 from './data/allClubsStats2017.json';
import allClubsStats18 from './data/allClubsStats2018.json';
import allClubsStats19 from './data/allClubsStats2019.json';
import allClubsStats21 from './data/allClubsStats2021.json';
import allClubsStats22 from './data/allClubsStats2022.json';
import allClubsStats23 from './data/allClubsStats2023.json';
import allClubsStats24 from './data/allClubsStats2024.json';
import littlemoorStats13 from './data/littlemoorStats2013.json';
import littlemoorStats14 from './data/littlemoorStats2014.json';
import littlemoorStats15 from './data/littlemoorStats2015.json';
import littlemoorStats16 from './data/littlemoorStats2016.json';
import littlemoorStats17 from './data/littlemoorStats2017.json';
import littlemoorStats18 from './data/littlemoorStats2018.json';
import littlemoorStats19 from './data/littlemoorStats2019.json';
import littlemoorStats21 from './data/littlemoorStats2021.json';
import littlemoorStats22 from './data/littlemoorStats2022.json';
import littlemoorStats23 from './data/littlemoorStats2023.json';
import littlemoorStats24 from './data/littlemoorStats2024.json';

// Stats for future years will need to be updated here
const dataFiles = {
    clubStats13,
    clubStats14,
    clubStats15,
    clubStats16,
    clubStats17,
    clubStats18,
    clubStats19,
    clubStats21,
    clubStats22,
    clubStats23,
    clubStats24,
    allClubsStats13,
    allClubsStats14,
    allClubsStats15,
    allClubsStats16,
    allClubsStats17,
    allClubsStats18,
    allClubsStats19,
    allClubsStats21,
    allClubsStats22,
    allClubsStats23,
    allClubsStats24,
    littlemoorStats13,
    littlemoorStats14,
    littlemoorStats15,
    littlemoorStats16,
    littlemoorStats17,
    littlemoorStats18,
    littlemoorStats19,
    littlemoorStats21,
    littlemoorStats22,
    littlemoorStats23,
    littlemoorStats24,
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

const allYearLittlemoorStats = {
    year2013: dataFiles.littlemoorStats13,
    year2014: dataFiles.littlemoorStats14,
    year2015: dataFiles.littlemoorStats15,
    year2016: dataFiles.littlemoorStats16,
    year2017: dataFiles.littlemoorStats17,
    year2018: dataFiles.littlemoorStats18,
    year2019: dataFiles.littlemoorStats19,
    year2021: dataFiles.littlemoorStats21,
    year2022: dataFiles.littlemoorStats22,
    year2023: dataFiles.littlemoorStats23,
    year2024: dataFiles.littlemoorStats24,
};

const allYearAllClubsStats = {
    year2013: dataFiles.allClubsStats13,
    year2014: dataFiles.allClubsStats14,
    year2015: dataFiles.allClubsStats15,
    year2016: dataFiles.allClubsStats16,
    year2017: dataFiles.allClubsStats17,
    year2018: dataFiles.allClubsStats18,
    year2019: dataFiles.allClubsStats19,
    year2021: dataFiles.allClubsStats21,
    year2022: dataFiles.allClubsStats22,
    year2023: dataFiles.allClubsStats23,
    year2024: dataFiles.allClubsStats24,
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

const littlemoorStatsForEveryYearArray = [
    dataFiles.littlemoorStats13,
    dataFiles.littlemoorStats14,
    dataFiles.littlemoorStats15,
    dataFiles.littlemoorStats16,
    dataFiles.littlemoorStats17,
    dataFiles.littlemoorStats18,
    dataFiles.littlemoorStats19,
    dataFiles.littlemoorStats21,
    dataFiles.littlemoorStats22,
    dataFiles.littlemoorStats23,
    dataFiles.littlemoorStats24,
];

const allClubsStatsForEveryYearArray = [
    dataFiles.allClubsStats13,
    dataFiles.allClubsStats14,
    dataFiles.allClubsStats15,
    dataFiles.allClubsStats16,
    dataFiles.allClubsStats17,
    dataFiles.allClubsStats18,
    dataFiles.allClubsStats19,
    dataFiles.allClubsStats21,
    dataFiles.allClubsStats22,
    dataFiles.allClubsStats23,
    dataFiles.allClubsStats24,
];

export default {
    dataFiles,
    allYearClubStats,
    allYearLittlemoorStats,
    allYearAllClubsStats,
    clubStatsForEveryYearArray,
    littlemoorStatsForEveryYearArray,
    allClubsStatsForEveryYearArray,
};
