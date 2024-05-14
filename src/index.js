import './style.css';
import Product from "./assets/js/product";
import {title} from "./assets/js/title";
import {price} from "./assets/js/price";
import * as ResponseTimeJS from "./assets/js/responseTimeJS";

const responseTime = ResponseTimeJS;

responseTime.start();

// The amount of products that we want to display.
const amountOfProducts = 15;

// Measurement options.
const measurementKey = 'load-time-measurement',
      amountOfMeasurements = 2;

let currentMeasurementIndex = 0;

function resetMeasurement() {
    // Clear previous measurement.
    if (sessionStorage.getItem(measurementKey)) {
        sessionStorage.removeItem(measurementKey);
    }
}

function createMeasurement() {

    const measurement = {
        date: Date.now(),
        meta: {
            products: amountOfProducts
        },
        data: []
    }

    saveMeasurement(measurement);

}

function saveMeasurement(measurement) {
    resetMeasurement();
    const json = JSON.stringify(measurement);
    sessionStorage.setItem(measurementKey, json);
}

function getCurrentMeasurementDataArray() {

    const measurement = sessionStorage.getItem(measurementKey);

    if (!measurement) {
        return [];
    }

    return JSON.parse(measurement);
}

function initMeasurement() {

    if (sessionStorage.getItem(measurementKey)) {

        // Ongoing measurement...

    } else {

        // New measurement...

        createMeasurement();

    }

}

function addDataToMesurement(data) {

    // Get the current measurement array.
    const measurement = getCurrentMeasurementDataArray();

    // Insert the data.
    measurement.data.push(data);

    // Save it.
    saveMeasurement(measurement);

}

function getCurrentMeasurementIndex() {

    // Get the array.
    const measurement = getCurrentMeasurementDataArray();

    // Returns the current index.
    return measurement.data.length;

}

function sendMeasurementToServerAsJson() {

    const measurement = getCurrentMeasurementDataArray();

    return fetch('/save-measurement', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(measurement)
    });

}

initMeasurement();

window.onload = () => {

    // The HTML-list that holds the items.
    const items = document.getElementById('items');

    // Insert each item into the list.
    for (let i = 0; i < amountOfProducts; i++) {
        const product = new Product(i, title(), price()),
              li = document.createElement('LI');
        li.insertAdjacentHTML('afterbegin', product.html());
        items.appendChild(li);
    }


    responseTime.end();

    // Create the measurement data from the
    // response time during this instance.
    let data = { number: getCurrentMeasurementIndex() + 1, time: responseTime.duration() };

    // Insert the data.
    addDataToMesurement(data);

    // Go again?
    if (getCurrentMeasurementIndex() < amountOfMeasurements) {

        // Yes...

       window.location.reload();

    } else {

        // No...

        // Save and send the measurement to the server.
        sendMeasurementToServerAsJson()
            .then((res) => {
                // Clear the measurement.
                resetMeasurement();
            });

    }

};