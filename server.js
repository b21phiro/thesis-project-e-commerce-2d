const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { saveAsLoadTimeMeasurement} = require("./server/measurementFile");

app.use('/', express.static('dist'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.post('/save-measurement', (req, res) => {

    saveAsLoadTimeMeasurement(req);

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});