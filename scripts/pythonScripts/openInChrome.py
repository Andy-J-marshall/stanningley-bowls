import webbrowser
import teamDetails

htmlFiles = teamDetails.findHtmlFiles()

for file in htmlFiles:
    webbrowser.open('file://' + file)
