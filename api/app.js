const express = require('express');
var cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3001;

// TODO refactor this
// TODO need to run api automatically for the website
// TODO will it work when run on the website?
// TODO e.g. localhost:3001/stats?name=jenny holiday&alternativeName&teams=meanwood&year=2024

// TODO use cors options?
var corsOptions = {
    origin: 'https://stanningleybowlsclub.co.uk',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());

app.get(`/stats`, (req, res) => {
    const name = req.query.name;
    const alternativeName = req.query.alternativeName;
    const teams = req.query.teams;
    const year = req.query.year;

    res.header('Access-Control-Allow-Origin', '*');
    exec(
        `python3 ./scripts/pythonScripts/anyPlayerSearch.py '${name}' '${alternativeName}' '${teams}' '${year}'`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(
                    `Error executing Python script: ${error.message}`
                );
                const errorResponse = { message: 'error generating stats' };
                res.status(500).json(errorResponse);
            }
            const stats = JSON.parse(stdout);
            res.status(200).json(stats);
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
