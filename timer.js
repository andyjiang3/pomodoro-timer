var started = false;

var timer = new easytimer.Timer();

var sectionIndex = 0;
var defaultTimer = false;

var durationMins = 25;
var durationSecs = 0;

/*
To Do:
    fixed switching to new task bug.                            FIXED
    duplicating tasks.                                          FIXED
    Update tabs (disappear when no task/all completed) on load  FIXED
    Update tabs when all completed
    Default timer when task is deleted
    Animations
    When task is all done               
    When no task                                    
    when adding task when it used to be empty 
    update session tab when adding 1st task                     FIXED
    loading it update
    prevent first task from being deleted if in progress.  
    fix bug with task not getting removed from lsit             FIXED                 
*/


function startPauseTimer() {

    if (!started) {

        timerSetup();

    } else {
        if (timer.isRunning() == true) {
            timer.pause();
            $("#pausestart").attr("src", "img/nav/startNew2.svg");
        } else {
            timer.start();
            $("#pausestart").attr("src", "img/nav/pauseNew2.svg");
        }
    }

}

function resetTimer() {
    if (started) {
        if (timer.isRunning() == true) {
            timer.reset();

            timer.start();
            $("#pausestart").attr("src", "img/nav/pauseNew2.svg");
        } else {
            timer.reset();

            timer.pause();
            $("#pausestart").attr("src", "img/nav/startNew2.svg");
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
        return;
    }

    if (event.keyCode == 32) {
        if (document.activeElement != document.getElementById('to-do-input')) {
            event.preventDefault();

            if (!started) {

                timerSetup();

            } else {
                if (timer.isRunning() == true) {
                    timer.pause();
                    $("#pausestart").attr("src", "img/nav/startNew2.svg");
                } else {
                    timer.start();
                    $("#pausestart").attr("src", "img/nav/pauseNew2.svg");
                }
            }
        }
    }

});

function timerSetup() {

    setTime();

    timer.start({ countdown: true, startValues: { minutes: durationMins, seconds: durationSecs }, target: { minutes: 0, seconds: 0 } });
    $("#pausestart").attr("src", "img/nav/pauseNew2.svg");

    //PROGRESS BAR
    $('#timer-progress').width("100%");

    started = true;
}

function setTime() {


    //change session tab info
    //change timer-section
    updateLabels();

    //New task, set times
    if (LIST.length != 0 && LIST[0].started == false) {

        durationMins = LIST[0].focusM * 1;
        durationSecs = LIST[0].focusS * 1;
        console.log("Duration: " + durationMins + ":" + durationSecs);
        LIST[0].started = true;

        localStorage.setItem("TODO", JSON.stringify(LIST));
    }

    //DEBUG
    //console.log("Duration Mins: " + LIST[0].focusM + ", Duration Secs: " + LIST[0].focusS + ", Task Name: " + LIST[0].name);
    //console.log("Duration Mins2: " + durationMins + ", Duration Secs2: " + durationSecs + ", Task Name2: " + LIST[0].name);

}

//Update Task Tab
function updateLabels() {
    if (LIST.length != 0 && LIST[0].done == false) {
        defaultTimer = false;
        $('#task-name').text(LIST[0].name);
        $('#sessions-current').text(LIST[0].currentSession);
        $('#sessions-max').text(LIST[0].maxSessions);
    } else if (defaultTimer == false) {
        $(".sessions-notify").css("display", "none");
        durationMins = 0;
        durationSecs = 30;
        sectionIndex = 0;
        $('#minutes').text(durationMins + "0");
        $('#seconds').text(durationSecs);
        defaultTimer = true;
    }
}

//Update Timer & Task Tab
function updateAll() {
    if (LIST.length != 0 && LIST[0].done == false) {
        defaultTimer = false;
        $(".sessions-notify").css("display", "block");

        $('#task-name').text(LIST[0].name);
        $('#sessions-current').text(LIST[0].currentSession);
        $('#sessions-max').text(LIST[0].maxSessions);

        if (LIST[0].taskSection == 0) {
            durationMins = LIST[0].focusM * 1;
            durationSecs = LIST[0].focusS * 1;
            $('#minutes').text(LIST[0].focusM);
            $('#seconds').text(LIST[0].focusS);
            $('#timer-section').text("FOCUS TIME");
        } else {
            durationMins = LIST[0].breakM * 1;
            durationSecs = LIST[0].breakS * 1;
            $('#minutes').text(LIST[0].breakM);
            $('#seconds').text(LIST[0].breakS);
            $('#timer-section').text("BREAK TIME");
        }
    } else {
        $(".sessions-notify").css("display", "none");
        durationMins = 0;
        durationSecs = 30;
        sectionIndex = 0;
        $('#minutes').text(durationMins + "0");
        $('#seconds').text(durationSecs);

    }
}

function updateTaskList() {
    $("#to-do-list").empty();
    loadList(LIST);
}

timer.addEventListener('secondsUpdated', function(e) {
    var minutes = timer.getTimeValues().minutes < 10 ? "0" + timer.getTimeValues().minutes : timer.getTimeValues().minutes;
    $('#minutes').text(minutes);
    var seconds = timer.getTimeValues().seconds < 10 ? "0" + timer.getTimeValues().seconds : timer.getTimeValues().seconds;
    $('#seconds').text(seconds);

    //PROGRESS BAR
    var totalTime = (timer.getTimeValues().minutes * 60) + timer.getTimeValues().seconds;
    var width = totalTime / ((durationMins * 60) + durationSecs);
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

    if (LIST.length != 0 && LIST[0].done == false) {

        //increment section
        LIST[0].taskSection++;

        if (LIST[0].taskSection > 1) {
            LIST[0].currentSession++;
            LIST[0].taskSection = 0;
            updateLabels();
            //task completed
            if (LIST[0].currentSession == LIST[0].maxSessions) {
                LIST[0].done = true;


                // $("ul#to-do-list li:first .task-status").text("Completed");
                // $("ul#to-do-list li:first .task-status").css("background-color", "#39eb6f");

                //Move task to end of list.
                LIST.push(LIST.splice(0, 1)[0]);

                localStorage.setItem("TODO", JSON.stringify(LIST));
                updateTaskList();
                updateLabels();

                if (LIST.length == 0 || LIST[0].done == true) {
                    defaultTimer = false;
                    updateLabels();
                }
            }
        }

        updateLabels();
        localStorage.setItem("TODO", JSON.stringify(LIST));

        if (LIST[0].taskSection == 0) { //even = focus
            durationMins = LIST[0].focusM * 1;
            durationSecs = LIST[0].focusS * 1;
            $('#timer-section').text("FOCUS TIME");
            // $('#focus').removeClass("section-inactive")
            // $('#break').addClass("section-inactive")

        } else { //odd = break
            $('#timer-section').text("BREAK TIME");
            durationMins = LIST[0].breakM * 1;
            durationSecs = LIST[0].breakS * 1;

            // $('#break').removeClass("section-inactive")
            // $('#focus').addClass("section-inactive")

        }
    } else {

        sectionIndex++;

        if (sectionIndex > 1) {
            sectionIndex = 0;
        }

        if (sectionIndex == 0) {
            durationMins = 0;
            durationSecs = 30;

        } else {
            durationMins = 0;
            durationSecs = 25;
        }
    }

    //set text
    var minutes = durationMins < 10 ? "0" + durationMins : durationMins;
    $('#minutes').text(minutes);
    var seconds = durationSecs < 10 ? "0" + durationSecs : durationSecs;
    $('#seconds').text(seconds);

    $("#pausestart").attr("src", "img/nav/startNew2.svg");
    //PROGRESS BAR
    $('#timer-progress').width("100%");

    started = false;

});