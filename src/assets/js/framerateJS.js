const time = 10000; // 10 seconds.

let frames = 0,
    seconds = 0;

let intervalID = null,
    timeoutID = null,
    requestAnimationFrameID = null;

function start(callOnCompletion = null) {

    timeoutID = setTimeout(() => {

        // Stops recording.
        stop();

        // Adds one additional second due to
        // correction.
        seconds++;

        // Calls on completion callback with the
        // average frame-time when done.
        if (callOnCompletion) {
            callOnCompletion(calculateAverageFrameTime(frames, seconds));
        }

    }, time);

    // Records each second passed.
    intervalID = setInterval(() => {
        seconds++;
    }, 1000);

    // Begins collecting the frames
    // by requesting each frame from the browser.
    requestAnimationFrameID = window.requestAnimationFrame(() => loop());

}

function loop() {

    // Adds a frame to te heap as completed.
    frames++;

    // Requests for a new frame, and loops again.
    requestAnimationFrameID = window.requestAnimationFrame(() => loop());

}

function stop() {
    // Stops and resets all the intervals, timeouts and loops.
    clearTimeout(timeoutID);
    clearInterval(intervalID);
    cancelAnimationFrame(requestAnimationFrameID);
}

function calculateAverageFrameTime(frames, seconds) {
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

export {
    calculateAverageFrameTime,
    start,
    stop
}