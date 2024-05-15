// Measurement options.
import * as responseTime from "./responseTimeJS";

// The key that will be used to access the measurement.
const measurementKey = 'load-time-measurement';

// The amount of measurements that should be done.
let amountOfMeasurements = 0;

/**
 * Resets the measurements by clearing the
 * session-storage based on the measurement key.
 */
function reset() {
    // Clear previous measurement.
    if (sessionStorage.getItem(measurementKey)) {
        sessionStorage.removeItem(measurementKey);
    }
}

/**
 * Creates a new measurement. Here is where the meta and
 * other data about the measurement can be added.
 */
function create(amountOfProducts) {

    const measurement = {
        date: Date.now(),
        meta: {
            products: amountOfProducts
        },
        data: []
    }

    save(measurement);

}

/**
 * Saves the measure in session.
 */
function save(measurement) {
    reset();
    const json = JSON.stringify(measurement);
    sessionStorage.setItem(measurementKey, json);
}

/**
 * Gets the measurement from session and returns
 * it as a JSON-array.
 */
function getData() {

    const measurement = sessionStorage.getItem(measurementKey);

    if (!measurement) {
        return [];
    }

    return JSON.parse(measurement);
}

/**
 * Adds the time for the current measurement into the
 * ongoing measurement-data-array.
 */
function addData(time) {

    // Get the current measurement array.
    const measurement = getData();

    // Insert the data.
    measurement.data.push({ time });

    // Save it.
    save(measurement);

}

/**
 * Retrieves the index/number of the current measurement
 * we are at. Can be used to determine if
 * the measurement should stop/continue.
 */
function getCurrentIndex() {

    // Get the array.
    const measurement = getData();

    // Returns the current index.
    return measurement.data.length;

}

/**
 * Sends the measurement to the server.
 */
function sendToServer(data) {

    console.log("Sending load-time-measurement to the server...")

    // Reset the measurement first.
    reset();

    // Send it.
    return fetch('/save-measurement-loadtime', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

}

/**
 * Takes the time-duration from start.
 * Determines if the measurement should keep on going or
 * if it should stop and send the measurement to the server.
 */
function end() {

    responseTime.end();

    // Insert the response time data.
    addData(responseTime.duration());

    // Go again?
    if (getCurrentIndex()< amountOfMeasurements) {
        // Yes...

        window.location.reload();

    } else {

        // No...

        // Get the measurement.
        const measurement = getData();

        // Save and send the measurement to the server.
        sendToServer(measurement)
            .then(() => {
                console.log("Sent!");
            });

    }

}

/**
 * Initialises a new measurement or
 * if one is ongoing, keeps the measurement going.
 *
 * Also takes the response-times-start measurement which
 * is used to calculate the duration of the response time later.
 *
 */
function init(total, amountOfItems = 0) {

    // Start the timer.
    responseTime.start();

    amountOfMeasurements = total;

    if (sessionStorage.getItem(measurementKey)) {

        // Ongoing measurement...

    } else {

        // New measurement...

        create(amountOfItems);

    }

}

export {
    init,
    end
}