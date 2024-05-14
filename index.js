const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require('fs');

app.use('/', express.static('dist'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.post('/save-measurement', (req, res) => {

    const file = path.resolve(__dirname, `./measurements/measurement_${Date.now()}.json`);

    req.body.meta.system = req.headers["user-agent"];

    const json = JSON.stringify(req.body);

    // Save the JSON file.
    fs.writeFile(file, json, 'utf-8', (err) => {

        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }

    });

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});