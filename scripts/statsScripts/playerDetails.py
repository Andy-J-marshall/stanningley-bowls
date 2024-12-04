import playerStatsHelper
import clubDetails

players = clubDetails.players  # TODO might want to add littlemoor players here too
duplicatePlayerNames = clubDetails.duplicatePlayerNames  # TODO figure this out


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


allDays = [
    "Monday Combined Leeds",
    "Tuesday Vets Leeds",
    "Tuesday Leeds",
    "Wednesday Half Holiday Leeds",
    "Wednesday Pairs AireWharfe",
    "Thursday Vets Leeds",
    "Saturday Leeds",
    "Mirfield",
    "Spen Valley",
    "Monday AireWharfe",
    "Tuesday AireWharfe",
    "Monday Bradford",
    "Wednesday Half Holiday Bradford",
    "Thursday Vets Bradford",
    "Saturday Bradford",
]

otherTeams = [
    "stanningley",
    "pudsey",
    "burley",
    "littlemoor",
    "farsley",
    "new wortley",
    "wibsey",
    "bramley",
    "new armley",
]

# TODO also include littlemoor?
teamsTracking = clubDetails.teamNames + otherTeams
