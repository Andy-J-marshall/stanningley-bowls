import webbrowser
import utils

htmlFiles = utils.findHtmlFiles()

for file in htmlFiles:
    webbrowser.open('file://' + file)
