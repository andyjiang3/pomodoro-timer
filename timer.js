var started = false;
var timer = new easytimer.Timer();

function startPauseTimer(duration) {
    if (!started) {


        timer.start({ countdown: true, startValues: { minutes: duration } });
        $("#pausestart").attr("src", "img/nav/pause2.png");

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
            $("#pausestart").attr("src", "img/nav/start2.png");
        } else {
            timer.start();
            $("#pausestart").attr("src", "img/nav/pause2.png");
        }
    }

}


function resetTimer() {
    timer.reset();
}

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