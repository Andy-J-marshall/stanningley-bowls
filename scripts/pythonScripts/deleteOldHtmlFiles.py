import os
import teamDetails

htmlFiles = teamDetails.findHtmlFiles()

for file in htmlFiles:
    if os.path.exists(file):
        os.remove(file)
