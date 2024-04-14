import webbrowser
import utils

htmlFiles = utils.findHtmlFiles()
filesOpened = []

for file in htmlFiles:
    file = file.replace(' (A)', '').replace(' (B)', '')
    if file not in filesOpened:
        webbrowser.open('file://' + file)
    filesOpened.append(file)
