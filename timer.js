var started = false;
var running = false;
var duration = 25;
var timer = new easytimer.Timer();

function startPauseTimer() {

    if (!started) {


        timer.start({ countdown: true, startValues: { minutes: duration } });
        $("#pausestart").attr("src", "img/nav/pause.svg");

        timer.addEventListener('secondsUpdated', function(e) {
            $('#minutes').text(timer.getTimeValues().minutes);
            var seconds = timer.getTimeValues().seconds < 10 ? "0" + timer.getTimeValues().seconds : timer.getTimeValues().seconds;
            $('#seconds').text(seconds);
        });

        timer.addEventListener('reset', function(e) {
            $('#minutes').text(timer.getTimeValues().minutes);
            var seconds = timer.getTimeValues().seconds < 10 ? "0" + timer.getTimeValues().seconds : timer.getTimeValues().seconds;
            $('#seconds').text(seconds);
        });


        started = true;
    } else {
        if (timer.isRunning() == true) {
            timer.pause();
            $("#pausestart").attr("src", "img/nav/start.svg");
        } else {
            timer.start();
            $("#pausestart").attr("src", "img/nav/pause.svg");
        }
    }

}

function resetTimer() {
    if (timer.isRunning() == true) {
        running = true;
    } else {
        running = false;
    }
    timer.reset();

    if (running) {
        timer.start();
        $("#pausestart").attr("src", "img/nav/pause.svg");
    } else {
        timer.pause();
        $("#pausestart").attr("src", "img/nav/start.svg");
    }
}

document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    if (event.keyCode == 32) {
        if (!started) {

            timer.start({ countdown: true, startValues: { minutes: duration } });
            $("#pausestart").attr("src", "img/nav/pause.svg");

            timer.addEventListener('secondsUpdated', function(e) {
                $('#minutes').text(timer.getTimeValues().minutes);
                var seconds = timer.getTimeValues().seconds < 10 ? "0" + timer.getTimeValues().seconds : timer.getTimeValues().seconds;
                $('#seconds').text(seconds);
            });

            timer.addEventListener('reset', function(e) {
                $('#minutes').text(timer.getTimeValues().minutes);
                var seconds = timer.getTimeValues().seconds < 10 ? "0" + timer.getTimeValues().seconds : timer.getTimeValues().seconds;
                $('#seconds').text(seconds);
            });

            started = true;

        } else {
            if (timer.isRunning() == true) {
                timer.pause();
                $("#pausestart").attr("src", "img/nav/start.svg");
            } else {
                timer.start();
                $("#pausestart").attr("src", "img/nav/pause.svg");
            }
        }
    }
    event.preventDefault();
});






function startTimer2(duration) {
    var timer = duration,
        minutes, seconds;

    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
        console.log(minutes + ":" + seconds);
        if (--timer < 0) {
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
        }

    }, 1000);

}