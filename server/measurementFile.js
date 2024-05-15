const path = require("path");
const fs = require("fs");

const _baseDirectory = __dirname + `./../measurements/`

function saveAsLoadTimeMeasurement(req, onSuccess = null) {

    // Set the filename of the measurement.
    const dir = _baseDirectory + `/load_times/`;
    const file = dir + `load_time_measurement_${Date.now()}.json`;

    // Creates the folder if it does not exist.
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Add the data of the measurement.
    const json = JSON.stringify(req.body);

    // Add the meta to the measurement.
    req.body.meta.system = req.headers["user-agent"];

    // Attempts to save the file in base-directory.
    save(file, json, onSuccess);

}

function saveAsFrameTimeMeasurement(req, onSuccess = null) {

    // Set the filename of the measurement.
    const dir = _baseDirectory + `/frame_times/`;
    const file = dir + `frame_time_measurement_${Date.now()}.json`;

    // Creates the folder if it does not exist.
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Set the data.
    const data = req.body;
    data.meta = {};
    data.meta.system = req.headers["user-agent"];

    // Add the data of the measurement.
    const json = JSON.stringify(data);

    // Attempts to save the file in base-directory.
    save(file, json, onSuccess);

}

function save(filename, json, onSuccess = null) {

    // Save the JSON file.
    fs.writeFile(filename, json, 'utf-8', (err) => {

        if (err) {
            console.error(err);
            throw new Error("Could not save the measurement!");
        }

        if (onSuccess) {
            onSuccess(200);
        }

    });

}

module.exports = { saveAsLoadTimeMeasurement, saveAsFrameTimeMeasurement };