from datetime import date
import os
import utils
teamDays = utils.teamDays

year = str(date.today().year)

files = []
for team in teamDays:
    files.append(os.getcwd() + '/bowlsnetReports/' + year + '/' + team + '.txt')

for file in files:
    if os.path.exists(file):
        os.remove(file)
