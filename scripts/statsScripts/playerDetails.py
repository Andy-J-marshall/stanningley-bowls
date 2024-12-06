import playerStatsHelper
import stanningleyDetails
import littlemoorDetails
import pudseyDetails

players = list(
    set(stanningleyDetails.players + littlemoorDetails.players + pudseyDetails.players)
)
duplicatePlayerNames = list(
    set(
        stanningleyDetails.duplicatePlayerNames
        + littlemoorDetails.duplicatePlayerNames
        + pudseyDetails.duplicatePlayerNames
    )
)


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


allLeagues = [
    "Monday Combined Leeds",
    "Tuesday Vets Leeds",
    "Tuesday Leeds",
    "Half Holiday Leeds",
    "Wednesday Pairs AireWharfe",
    "Thursday Vets Leeds",
    "Saturday Leeds",
    "Mirfield",
    "Spen Valley",
    "Monday AireWharfe",
    "AireWharfe Vets",
    "Monday Bradford",
    "Half Holiday Bradford",
    "Bradford Vets",
    "Saturday Bradford",
]

allClubs = [
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
