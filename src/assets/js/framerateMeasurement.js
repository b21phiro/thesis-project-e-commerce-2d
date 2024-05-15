const time = 10000, // 10 seconds.
      iterations = 3;

let measurement = {};

let frames = 0,
    seconds = 0,
    currentIteration = 0;

let intervalID = null,
    timeoutID = null,
    requestAnimationFrameID = null;

function start() {

    // Create the measurement if this is the first iteration.
    if (currentIteration <= 0) {
        seconds += 1;
        _createMeasurement();
    }

    // New iteration.
    currentIteration++;

    console.log(`[Iteration: (${currentIteration}/${iterations})] Start measuring FPS\n`);

    timeoutID = setTimeout(() => {

        // Stops recording.
        _stop();

        // Adds one additional second due to
        // correction.
        seconds++;

    }, time);

    // Records each second passed.
    intervalID = setInterval(() => {

        console.log(`Seconds passed: (${seconds}/${time / 1000})\n`);

        seconds++;

    }, 1000);

    // Begins collecting the frames
    // by requesting each frame from the browser.
    requestAnimationFrameID = window.requestAnimationFrame(() => loop());

}

function loop() {

    // Adds a frame to the heap as completed.
    frames++;

    // Requests for a new frame, and loops again.
    requestAnimationFrameID = window.requestAnimationFrame(() => loop());

}

function _createMeasurement() {

    measurement = {
        date: Date.now(),
        meta: {
            renderType: '2D'
        },
        data: []
    }
}

function _addDataToMeasurement(data) {
    measurement.data.push(data);
}

function reset() {
    frames = 0;
    seconds = 0;
    // Stops and resets all the intervals, timeouts and loops.
    clearTimeout(timeoutID);
    clearInterval(intervalID);
    cancelAnimationFrame(requestAnimationFrameID);
}

function _stop() {

    console.log(`Seconds passed: (${seconds}/${time / 1000})\n`);

    // Add the data to the measurement.
    _addDataToMeasurement({ fps: _calculateAverageFrameTime(frames, seconds)});

    // Resets the measurement timers.
    reset();

    if (currentIteration < iterations) {

        // Start next iteration.
        start();

    } else {

        // End the measurement.
        _sendToServer(measurement).then(() => {
            console.log("Sent measurement to the server!");
        });
    }

}

function _calculateAverageFrameTime(frames, seconds) {
    // The average frame-time is calculated such as =>
    // AverageFrameTime = NumberOfFrames / SecondsPassed.
    // Returns 0 if the seconds passed are 0, to avoid
    // division by 0.
    if (seconds <= 0) {
        return 0;
    } else {
        return frames / seconds;
    }
}

/**
 * Sends the measurement to the server.
 */
function _sendToServer(data) {

    // Send it.
    return fetch('/save-measurement-framerate', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

}

export { start };