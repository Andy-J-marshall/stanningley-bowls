import { returnPlayerStatsForAllYears } from './helpers/allYearPlayerStatsHelper';
import stanningleyStats13 from './data/stanningleyStats2013.json';
import stanningleyStats14 from './data/stanningleyStats2014.json';
import stanningleyStats15 from './data/stanningleyStats2015.json';
import stanningleyStats16 from './data/stanningleyStats2016.json';
import stanningleyStats17 from './data/stanningleyStats2017.json';
import stanningleyStats18 from './data/stanningleyStats2018.json';
import stanningleyStats19 from './data/stanningleyStats2019.json';
import stanningleyStats21 from './data/stanningleyStats2021.json';
import stanningleyStats22 from './data/stanningleyStats2022.json';
import stanningleyStats23 from './data/stanningleyStats2023.json';
import stanningleyStats24 from './data/stanningleyStats2024.json';
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
import pudseyStats13 from './data/pudseyStats2013.json';
import pudseyStats14 from './data/pudseyStats2014.json';
import pudseyStats15 from './data/pudseyStats2015.json';
import pudseyStats16 from './data/pudseyStats2016.json';
import pudseyStats17 from './data/pudseyStats2017.json';
import pudseyStats18 from './data/pudseyStats2018.json';
import pudseyStats19 from './data/pudseyStats2019.json';
import pudseyStats21 from './data/pudseyStats2021.json';
import pudseyStats22 from './data/pudseyStats2022.json';
import pudseyStats23 from './data/pudseyStats2023.json';
import pudseyStats24 from './data/pudseyStats2024.json';
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

// Stats for future years will need to be updated here

const stanningleyStatsForEveryYearArray = [
    stanningleyStats13,
    stanningleyStats14,
    stanningleyStats15,
    stanningleyStats16,
    stanningleyStats17,
    stanningleyStats18,
    stanningleyStats19,
    stanningleyStats21,
    stanningleyStats22,
    stanningleyStats23,
    stanningleyStats24,
];

const allYearStanningleyStats = {
    year2013: stanningleyStats13,
    year2014: stanningleyStats14,
    year2015: stanningleyStats15,
    year2016: stanningleyStats16,
    year2017: stanningleyStats17,
    year2018: stanningleyStats18,
    year2019: stanningleyStats19,
    year2021: stanningleyStats21,
    year2022: stanningleyStats22,
    year2023: stanningleyStats23,
    year2024: stanningleyStats24,
    allYears: returnPlayerStatsForAllYears(stanningleyStatsForEveryYearArray),
};

const littlemoorStatsForEveryYearArray = [
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
];

const allYearLittlemoorStats = {
    year2013: littlemoorStats13,
    year2014: littlemoorStats14,
    year2015: littlemoorStats15,
    year2016: littlemoorStats16,
    year2017: littlemoorStats17,
    year2018: littlemoorStats18,
    year2019: littlemoorStats19,
    year2021: littlemoorStats21,
    year2022: littlemoorStats22,
    year2023: littlemoorStats23,
    year2024: littlemoorStats24,
    allYears: returnPlayerStatsForAllYears(littlemoorStatsForEveryYearArray),
};

const pudseyStatsForEveryYearArray = [
    pudseyStats13,
    pudseyStats14,
    pudseyStats15,
    pudseyStats16,
    pudseyStats17,
    pudseyStats18,
    pudseyStats19,
    pudseyStats21,
    pudseyStats22,
    pudseyStats23,
    pudseyStats24,
];

const allYearPudseyStats = {
    year2013: pudseyStats13,
    year2014: pudseyStats14,
    year2015: pudseyStats15,
    year2016: pudseyStats16,
    year2017: pudseyStats17,
    year2018: pudseyStats18,
    year2019: pudseyStats19,
    year2021: pudseyStats21,
    year2022: pudseyStats22,
    year2023: pudseyStats23,
    year2024: pudseyStats24,
    allYears: returnPlayerStatsForAllYears(pudseyStatsForEveryYearArray),
};

const allClubsStatsForEveryYearArray = [
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
];

const allYearAllClubsStats = {
    year2013: allClubsStats13,
    year2014: allClubsStats14,
    year2015: allClubsStats15,
    year2016: allClubsStats16,
    year2017: allClubsStats17,
    year2018: allClubsStats18,
    year2019: allClubsStats19,
    year2021: allClubsStats21,
    year2022: allClubsStats22,
    year2023: allClubsStats23,
    year2024: allClubsStats24,
    allYears: returnPlayerStatsForAllYears(allClubsStatsForEveryYearArray),
};

export default {
    allYearAllClubsStats,
    allYearStanningleyStats,
    allYearLittlemoorStats,
    allYearPudseyStats,
};
