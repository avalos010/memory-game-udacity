/*===================================================
Borrowed from: https://github.com/vivekmarakana/stopwatch-js/blob/master/js/stopwatch.js
===================================================*/


/*Creating custom class function that can be used again*/
var Stopwatch = function(id) {
    var element = document.getElementById(id);
    element.innerHTML = "<span id='hour'></span>" +
        "<span id='minute'></span>" +
        "<span id='second'></span>" +
        "<span id='centisecond'></span>";

    var startAt = 0; // Last time. (0 if not running)
    var lapTime = 0; // Time on the clock when last stopped in milliseconds
    var running = false;
    var clocktimer;

    //to update the circles
    this.update = function(isOnce) {
        if (running || isOnce) {
            var h = m = s = ms = 0;
            var newTime = '';
            var time = this.time();

            h = Math.floor(time / (60 * 60 * 1000));
            time = time % (60 * 60 * 1000);
            m = Math.floor(time / (60 * 1000));
            time = time % (60 * 1000);
            s = Math.floor(time / 1000);
            cs = time % 100;
            drawCircles(h, m, s, cs);
        }
    };

    var now = function() {
        return (new Date()).getTime();
    };

    // Start or resume
    this.start = function() {
        startAt = startAt ? startAt : now();
        running = true;
    };

    // Pause the timer (Can be resumed from here)
    this.stop = function() {
        // If running, update elapsed time otherwise keep it
        lapTime = startAt ? lapTime + now() - startAt : lapTime;
        startAt = 0; // Paused
        running = false;
    };

    // Reset timer
    this.reset = function() {
        stop();
        lapTime = startAt = 0;
        this.update(true);
    };

    // Return the duration till now
    this.time = function() {
        return lapTime + (startAt ? now() - startAt : 0);
    };

    drawCircles(0, 0, 0, 0);
    this.update(true);
};

function drawCircles(hour, minute, second, centisecond) {
    drawCircle("hour", "#9C2B61", hour, 24);
    drawCircle("minute", "#BD0D0D", minute, 60);
    drawCircle("second", "#496D8D", second, 60);
    drawCircle("centisecond", "#569120", centisecond, 100);
}

function drawCircle(id, color, curVal, maxVal) {
    var myId = id || "none";
    var myColor = color || "#AA0";
    return new Circle({
        id: myId,
        width: 3,
        radius: 50,
        text: doPadding(curVal, 2),
        shadow: 5,
        fontsize: 60,
        fontcolor: myColor,
        lineheight: 110,
        values: [{
            percent: 100 * (1 - curVal / maxVal),
            color: myColor
        }, {
            percent: 100 * curVal / maxVal,
            color: "#eee"
        }]
    });
}

function doPadding(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}
