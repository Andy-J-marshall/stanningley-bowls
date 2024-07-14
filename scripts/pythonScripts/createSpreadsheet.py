import openpyxl
from pathlib import Path
import os
from datetime import date
import utils

teamDays = utils.teamDays

year = str(date.today().year)
filename = str(Path.cwd()) + '/files/' + 'bowlsresults' + year + '.xlsx'

if os.path.exists(filename):
    print('Excel file already exists, deleting: ' + filename)
    os.remove(filename)

wb = openpyxl.Workbook()
for teamName in teamDays:
    if teamDays.index(teamName) == 0:
        teamName = teamName.replace(' (A)', '').replace(' (B)', '')
        ws = wb.active
        ws.title = teamName
    else:
        teamName = teamName.replace(' (A)', '').replace(' (B)', '')
        wb.create_sheet(teamName)
wb.save(filename)
print(filename + ' created')
