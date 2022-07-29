const live = {
    teamNames: {
        abbreviated: 'S.P.B.C.',
        full: 'Stanningley Park Bowling Club',
        short: 'Stanningley',
    },
    socialLinks: {
        instagramUrl: 'https://www.instagram.com/StanningleyParkBowls',
        facebookUrl: 'https://www.facebook.com/StanningleyBowlsClub',
        emailUrl: 'mailto:stanningleybowlsclub@gmail.com',
        googleMapsUrl: 'https://goo.gl/maps/RQ7wemtuHQhXPgmF9',
        googleMapsIframeUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d739.5172794483534!2d-1.6554462674593056!3d53.81026923756449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795fb1c49a2601%3A0xe4eb67d3c4eeb88f!2sStanningley%20Park%20Crown%20Green%20Bowling%20Club!5e0!3m2!1sen!2suk!4v1657105300205!5m2!1sen!2suk',
    },
    membership: {
        socialPrice: '10',
        bowlingPrice: '45',
        bowlingPriceOnly: '5',
    },
    teams: [
        {
            name: 'Monday Combined',
            age: 'Open Age',
            desc: '4 singles games and 2 pairs',
            link: 'https://bowlsnet.uk/Leeds/MonComb',
            startTime: '6:15-6.45pm',
        },
        {
            name: 'Tuesday Vets',
            age: '55+ year olds',
            desc: '8 singles games',
            link: 'https://bowlsnet.uk/LeedsParkVets/Tue',
            startTime: '1:30pm',
        },
        {
            name: 'Thursday Vets',
            age: '55+ year olds',
            desc: '8 singles games',
            link: 'https://bowlsnet.uk/LeedsParkVets/Thu',
            startTime: '1:30pm',
        },
        {
            name: 'Saturday',
            age: 'Open Age',
            desc: '8 singles games',
            link: 'https://bowlsnet.uk/Leeds/Sat',
            startTime: '2pm',
        },
    ],
    days: {
        monday: 'Monday Combined',
        tuesday: 'Tuesday Vets',
        thursday: 'Thursday Vets',
        saturday: 'Saturday',
    },
    leagues: 'Leeds Parks',
    leagueRules:
        'League matches are decided using the 0-5 points system. If a player wins by scoring 21 then they get 5 points. If they lose and score 18-20 then they get 4 points, 15-17 is 3 points, 10-14 is 2 points and 5-9 is 1 point. If a player scores 0-4 then they get 0 points. Cup matches are decided on pure aggregate.',
};

export default live;
