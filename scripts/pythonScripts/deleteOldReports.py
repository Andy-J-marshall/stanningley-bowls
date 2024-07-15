import os
import utils
teamDays = utils.teamDays

files = []
for team in teamDays:
    files.append(os.getcwd() + '/bowlsnetReports/' + team + '.txt')

for file in files:
    if os.path.exists(file):
        os.remove(file)
