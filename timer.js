var started = false;

var sectionIndex = 0;
var session = 0;
var sections = ["Focus", "Break", "Focus", "Break"];
//                 0        1        2         3        (even = focus, odd = break)

var duration = 2;

var focusDuration = 2;
var breakDuration = 1;

var timer = new easytimer.Timer();

function startPauseTimer() {

    if (!started) {

        timerSetup();

    } else {
        if (timer.isRunning() == true) {
            timer.pause();
            $("#pausestart").attr("src", "img/nav/start2.svg");
        } else {
            timer.start();
            $("#pausestart").attr("src", "img/nav/pause2.svg");
        }
    }

}

function resetTimer() {
    if (timer.isRunning() == true) {
        timer.reset();

        timer.start();
        $("#pausestart").attr("src", "img/nav/pause2.svg");
    } else {
        timer.reset();

        timer.pause();
        $("#pausestart").attr("src", "img/nav/start2.svg");
    }
}

document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
        return;
    }

    if (event.keyCode == 32) {
        if (document.activeElement != document.getElementById('task-list')) {
            event.preventDefault();

            if (!started) {

                timerSetup();

            } else {
                if (timer.isRunning() == true) {
                    timer.pause();
                    $("#pausestart").attr("src", "img/nav/start2.svg");
                } else {
                    timer.start();
                    $("#pausestart").attr("src", "img/nav/pause2.svg");
                }
            }
        }
    }

});

function timerSetup() {
    timer.start({ countdown: true, startValues: { minutes: duration }, target: { minutes: 0, seconds: 0 } });
    $("#pausestart").attr("src", "img/nav/pause2.svg");

    //PROGRESS BAR
    $('#timer-progress').width("100%");

    started = true;
}

timer.addEventListener('secondsUpdated', function(e) {
    var minutes = timer.getTimeValues().minutes < 10 ? "0" + timer.getTimeValues().minutes : timer.getTimeValues().minutes;
    $('#minutes').text(minutes);
    var seconds = timer.getTimeValues().seconds < 10 ? "0" + timer.getTimeValues().seconds : timer.getTimeValues().seconds;
    $('#seconds').text(seconds);

    //PROGRESS BAR
    var totalTime = (timer.getTimeValues().minutes * 60) + timer.getTimeValues().seconds;
    var width = totalTime / (duration * 60);
    $('#timer-progress').width(width * 100 + "%");

});

timer.addEventListener('reset', function(e) {
    var minutes = timer.getTimeValues().minutes < 10 ? "0" + timer.getTimeValues().minutes : timer.getTimeValues().minutes;
    $('#minutes').text(minutes);
    var seconds = timer.getTimeValues().seconds < 10 ? "0" + timer.getTimeValues().seconds : timer.getTimeValues().seconds;
    $('#seconds').text(seconds);

    //PROGRESS BAR
    $('#timer-progress').width("100%");
});

timer.addEventListener('targetAchieved', function(e) {

    sectionIndex++;

    if (sectionIndex > 2) {
        session++;
    } else if (sectionIndex > 3) {
        session++;
        sectionIndex = 0;
    }

    if (sectionIndex % 2 == 0) { //even = focus
        duration = focusDuration;
        $('#focus').removeClass("section-inactive")
        $('#break').addClass("section-inactive")

    } else { //odd = break
        console.log("BREAK TIME")
        duration = breakDuration;
        $('#break').removeClass("section-inactive")
        $('#focus').addClass("section-inactive")

    }

    var minutes = duration < 10 ? "0" + duration : duration;
    $('#minutes').text(minutes);

    $("#pausestart").attr("src", "img/nav/start2.svg");
    //PROGRESS BAR
    $('#timer-progress').width("100%");

    started = false;

});