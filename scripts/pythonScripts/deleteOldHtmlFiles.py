import os
import combinedPlayerDetails

htmlFiles = combinedPlayerDetails.findHtmlFiles()

for file in htmlFiles:
    if os.path.exists(file):
        os.remove(file)
