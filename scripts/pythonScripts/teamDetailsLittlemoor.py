import utils

# Team info (lowercase)
teamNames = [
    'Littlemoor', 
    'Littlemoor A', 
    'Littlemoor - A', 
    'Littlemoor \'A\'', 
    'Littlemoor B',
    'Littlemoor - B', 
    'Littlemoor \'B\'', 
    'Littlemoor Sports and Social', 
    'Littlemoor Sports and Social',
    'Littlemoor Sports and Social',
    'Littlemoor Sports & Social', 
    'Littlemoor Sports & Social A',
    'Littlemoor Sports & Social - A',
    'Littlemoor Sports & Social \'A\'',
    'Littlemoor Sports & Social B',
    'Littlemoor Sports & Social - B',
    'Littlemoor Sports & Social \'B\'',
    'Littlemoor S&SC',
    'Littlemoor S&SC A',
    'Littlemoor S&SC - A',
    'Littlemoor S&SC \'A\'',
    'Littlemoor S&SC B',
    'Littlemoor S&SC - B',
    'Littlemoor S&SC \'B\'',
    'Littlemoor S & SC',
    'Littlemoor S & SC A',
    'Littlemoor S & SC - A',
    'Littlemoor S & SC \'A\'',
    'Littlemoor S & SC B',
    'Littlemoor S & SC - B',
    'Littlemoor S & SC \'B\'',
]
displayTeamName = 'Littlemoor'

# Days played (add duplicate days for second teams suffixed with (A) or (B) etc.)
teamDays = [
    'Monday Bradford',
    'Monday AireWharfe',
    'Tuesday Mirfield (A)',
    'Tuesday Mirfield (B)',
    'Wednesday Spen Valley (A)',
    'Wednesday Spen Valley (B)',
    'Wednesday Half Holiday Bradford (A)',
    'Wednesday Half Holiday Bradford (B)',
    'Thursday Vets Bradford',
    'Saturday Bradford (A)',
    'Saturday Bradford (B)',
]

# Every player (lowercase)
# TODO add more players
players = [
    'john armitage',
    'paul bowes',
    'andy marshall',
    'alyssa randell',
    'jim moorin',
    'stewart watson',
    'martin fulton',
    'stuart potter',
    'phil thornton',
]

# Players with different spellings of name (lowercase). Also need to add to deduplicateNames function
# TODO add players to these
duplicatePlayerNames = [
    'phillip thornton',
    'philip thornton',
    'stuart watson',
    'andrew marshall',
    'james moorin'
]

# Add alternative names for players (lowercase)
def deduplicateNames(name):
    name = utils.standardiseName(name)
    if name == 'andrew marshall':
        name = 'andy marshall'
    if name == 'stuart watson':
        name = 'stewart watson'
    if name == 'james moorin':
        name = 'jim moorin'
    if name == 'philip thornton':
        name = 'phil thornton'
    if name == 'phillip thornton':
        name = 'phil thornton'
    return name

# Add players who play for other teams in leagues the team player in (lowercase)
# TODO add players to this
traitorPlayers = {
    'Monday Bradford': [''],
    'Monday AireWharfe': ['stewart watson', 'lee wider', 'paul jacques'],
    'Tuesday Mirfield': ['stewart watson'],
    'Wednesday Half Holiday Bradford': [''],
    'Wednesday Spen Valley': [''],
    'Thursday Vets Bradford': [''],
    'Saturday Bradford': ['robbie ellis'],
}

# Other leagues that players play in for other teams (lowercase)
otherLeagues = [
    'Tuesday AireWharfe',
    'Monday Combined Leeds',
    'Tuesday Vets Leeds',
    'Tuesday Leeds',
    'Wednesday Half Holiday Leeds',
    'Wednesday Pairs AireWharfe', 
    'Thursday Vets Leeds', 
    'Saturday Leeds',
]

# Other teams that players play for (lowercase)
otherTeams = [
]

allDays = teamDays + otherLeagues
teamsTracking = teamNames + otherTeams
