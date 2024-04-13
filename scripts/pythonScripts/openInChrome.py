import webbrowser
import utils

htmlFiles = utils.findHtmlFiles()

for file in htmlFiles:
    # TODO check this works?
    file.replace(' (A)', '').replace(' (B)', '')
    webbrowser.open('file://' + file)
