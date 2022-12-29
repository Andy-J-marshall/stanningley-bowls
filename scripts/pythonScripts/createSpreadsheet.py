import openpyxl
from pathlib import Path
import os
from datetime import date
import utils

teams = utils.teamDays
# TODO change back
# year = str(date.today().year)
year = "2023"
filename = str(Path.cwd()) + '/files/' + 'bowlsresults' + year + '.xlsx'

if os.path.exists(filename):
    print('Excel file already exists: ' + filename)
else:
    wb = openpyxl.Workbook()
    for team in teams:
        if teams.index(team) == 0:
            ws = wb.active
            ws.title = team
        else:
            wb.create_sheet(team)
    wb.save(filename)
    print(filename + ' created')
