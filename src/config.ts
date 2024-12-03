const coreClubName = 'Stanningley';

export const config = {
    teamNames: {
        fullName: 'Stanningley Park Bowling Club',
        shortName: coreClubName,
    },
    clubsForPlayersStats: [coreClubName.toLowerCase(), 'littlemoor'],
    socialLinks: {
        instagramUrl: 'https://www.instagram.com/StanningleyParkBowls',
        facebookUrl: 'https://www.facebook.com/StanningleyBowlsClub',
        emailUrl: 'mailto:stanningleybowlsclub@gmail.com',
        teamPhotosUrl:
            'https://photos.google.com/share/AF1QipMmkXau_XJaD1459y7Sdsk7pSoUeAr04SiVP_z07i1u0NzLiVQLBioFHwGF9jHV_A?key=N3VLT0l0VWZEVlNrVm5kQUF3MHl1d2lJNEFDRVNR',
        historicStatsUrl:
            'https://photos.google.com/share/AF1QipOqs9EK2LBhL3uZjas8l1ccFkrkdsY8KpOlajx60sBsUaM_-S4LCr-qLpEj9aRX3Q?key=N1VwMnRwdWlKQU5pcW9lVXk1b09IX3Y1OGxQWlFR',
        googleMapsUrl: 'https://goo.gl/maps/RQ7wemtuHQhXPgmF9',
        googleMapsIframeUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d739.5172794483534!2d-1.6554462674593056!3d53.81026923756449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795fb1c49a2601%3A0xe4eb67d3c4eeb88f!2sStanningley%20Park%20Crown%20Green%20Bowling%20Club!5e0!3m2!1sen!2suk!4v1657105300205!5m2!1sen!2suk',
    },
    membership: {
        socialPrice: '20',
        bowlingPrice: '55',
        bowlingPriceOnly: '10',
        leedsCouncilFee: '45',
    },
    days: {
        'monday combined leeds': 'Monday Combined',
        'tuesday vets leeds': 'Tuesday Vets',
        'tuesday leeds': 'Tuesday',
        'wednesday half holiday leeds': 'Wednesday Half Holiday',
        'wednesday pairs airewharfe': 'Wednesday Pairs',
        'thursday vets leeds': 'Thursday Vets',
        'saturday leeds': 'Saturday',
        'saturday leeds (b)': 'Saturday B',
    },
    allTeamsInLeaguesSince2013: [
        'monday combined leeds',
        'monday airewharfe',
        'monday airewharfe (a)',
        'monday airewharfe (b)',
        'tuesday vets leeds',
        'tuesday leeds',
        'wednesday half holiday leeds',
        'wednesday half holiday bradford',
        'wednesday half holiday bradford (a)',
        'wednesday half holiday bradford (b)',
        'wednesday pairs airewharfe',
        'wednesday pairs airewharfe (a)',
        'wednesday pairs airewharfe (b)',
        'thursday vets leeds',
        'thursday vets leeds (a)',
        'thursday vets leeds (b)',
        'saturday leeds',
        'saturday leeds (a)',
        'saturday leeds (b)',
        'saturday bradford',
        'saturday bradford (a)',
        'saturday bradford (b)',
    ],
    historicTeamInfo: [
        {
            teamNames: ['monday combined leeds', 'monday airewharfe'],
            bTeamForLeagueBool: true,
        },
        {
            teamNames: ['tuesday vets leeds'],
            bTeamForLeagueBool: false,
        },
        {
            teamNames: ['tuesday leeds'],
            bTeamForLeagueBool: false,
        },
        {
            teamNames: [
                'wednesday half holiday leeds',
                'wednesday half holiday bradford',
            ],
            bTeamForLeagueBool: true,
        },
        {
            teamNames: ['wednesday pairs airewharfe'],
            bTeamForLeagueBool: true,
        },
        {
            teamNames: ['thursday vets leeds'],
            bTeamForLeagueBool: true,
        },
        {
            teamNames: ['saturday leeds', 'saturday bradford'],
            bTeamForLeagueBool: true,
        },
    ],
};
