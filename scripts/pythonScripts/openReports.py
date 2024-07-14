import webbrowser
import utils

files = utils.findReportFiles()
filesOpened = []

for file in files:
    file = file.replace(' (A)', '').replace(' (B)', '')
    if file not in filesOpened:
        webbrowser.open('file://' + file)
    filesOpened.append(file)
