import playerStatsHelper

teamNames = [
    "Stanningley",
    "Stanningley A",
    "Stanningley B",
    "Stanningley Park",
    "Stanningley Park A",
    "Stanningley Park B",
]
displayTeamName = "Stanningley"

# Days played (add duplicate days for second teams suffixed with (A) or (B) etc.)
teamDays = [
    "Monday Combined Leeds",
    "Tuesday Vets Leeds",
    "Tuesday Leeds",
    "Wednesday Half Holiday Leeds",
    "Wednesday Pairs AireWharfe",
    "Thursday Vets Leeds",
    "Saturday Leeds (A)",
    "Saturday Leeds (B)",
]

# Every player (lowercase)
players = [
    "andy marshall",
    "alyssa randell",
    "paul bowes",
    "andy waller",
    "john armitage",
    "clifford brogie",
    "donald shaw",
    "alison woodfine",
    "joey broadbent",
    "vanessa lancaster",
    "jim moorin",
    "duncan mcphail",
    "craig clarkson",
    "steve gardner",
    "neil porter",
    "stewart watson",
    "david eaton",
    "tracey marshall",
    "derek wilson",
    "peter crowther",
    "laila packer",
    "paul leonard",
    "malvin miller",
    "stuart potter",
    "colin haque",
    "ken green",
    "stephen tiernan",
    "phil sutcliffe",
    "martin fulton",
    "harvey leonard",
    "richard hodgson",
    "jim swailes",
    "rob packer",
    "nicola bona",
    "linda barrand",
    "phil thornton",
    "karl chapman",
]

# Players with different spellings of name (lowercase). Also need to add to deduplicateNames function
duplicatePlayerNames = [
    "duncan mc phail",
    "stuart watson",
    "andrew marshall",
    "andrew waller",
    "cliff brogie",
    "james moorin",
    "phillip thornton",
    "philip thornton",
    "jim swales",
]


# Add alternative names for players (lowercase)
def deduplicateNames(name):
    name = playerStatsHelper.standardiseName(name)
    if name == "duncan mc phail":
        name = "duncan mcphail"
    if name == "andrew marshall":
        name = "andy marshall"
    if name == "stuart watson":
        name = "stewart watson"
    if name == "cliff brogie":
        name = "clifford brogie"
    if name == "andrew waller":
        name = "andy waller"
    if name == "don shaw":
        name = "donald shaw"
    if name == "james moorin":
        name = "jim moorin"
    if name == "philip thornton":
        name = "phil thornton"
    if name == "phillip thornton":
        name = "phil thornton"
    if name == "jim swales":
        name = "jim swailes"
    return name


# Add players who play for other teams in leagues the team player in (lowercase)
traitorPlayers = {
    "Monday Combined Leeds": ["neil porter"],
    "Tuesday Vets Leeds": [],
    "Tuesday Leeds": ["neil porter"],
    "Wednesday Half Holiday Leeds": ["clifford brogie"],
    "Wednesday Pairs AireWharfe": [],
    "Thursday Vets Leeds": ["neil porter"],
    "Saturday Leeds": ["clifford brogie", "neil porter"],
}

# Other leagues that players play in for other teams (lowercase)
otherLeagues = [
    "Mirfield",
    "Spen Valley",
    "Monday AireWharfe",
    "Tuesday AireWharfe",
    "Monday Bradford",
    "Wednesday Half Holiday Bradford",
    "Thursday Vets Bradford",
    "Saturday Bradford",
]

# Other teams that players play for (lowercase)
otherTeams = [
    "pudsey",
    "burley",
    "littlemoor",
    "farsley",
    "new wortley",
    "wibsey",
    "bramley",
    "new armley",
]

allDays = teamDays + otherLeagues
teamsTracking = teamNames + otherTeams
