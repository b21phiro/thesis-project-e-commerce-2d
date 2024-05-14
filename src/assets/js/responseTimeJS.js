let startTime,
    endTime;

function start() {
    startTime = window.performance.now();
}

function end() {
    endTime = window.performance.now();
}

function delta(time1, time2) {
    return time2 - time1;
}

function duration() {
    return delta(startTime, endTime);
}

function measure() {

    // Starts the measuring.
    start();

    return new Promise((resolve, reject) => {

        window.onload = (ev) => {

            // Ends the measuring
            end();

            // Resolves with the duration it took between start and end.
            // Includes the time as parameter.
            resolve(duration());

        };

    });

}

export {
    start,
    end,
    measure,
    duration,
    delta,
    startTime,
    endTime
}