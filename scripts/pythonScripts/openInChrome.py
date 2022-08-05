import webbrowser
import combinedPlayerDetails

htmlFiles = combinedPlayerDetails.findHtmlFiles()

for file in htmlFiles:
    webbrowser.open('file://' + file)
