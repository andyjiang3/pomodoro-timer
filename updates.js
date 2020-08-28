function updateLabels() {
    if (LIST.length != 0 && LIST[0].done == false) {

        defaultTimer = false;
        $('#task-name').text(LIST[0].name);
        $('#sessions-current').text(LIST[0].currentSession);
        $('#sessions-max').text(LIST[0].maxSessions);

        showTaskBar();

        return;

    } else if (defaultTimer == false) {

        dismissTaskBar();

        durationMins = 0;
        durationSecs = 30;
        sectionIndex = 0;

        $('#minutes').text(durationMins + "0");
        $('#seconds').text(durationSecs);

        defaultTimer = true;
    }
}

function updateLabelsBetween() {
    if (LIST.length != 0 && LIST[0].done == false) {

        dismissAndShowBar();

        defaultTimer = false;
        $('#task-name').text(LIST[0].name);
        $('#sessions-current').text(LIST[0].currentSession);
        $('#sessions-max').text(LIST[0].maxSessions);

        return;

    } else if (defaultTimer == false) {

        dismissTaskBar();

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

        $('#task-name').text(LIST[0].name);
        $('#sessions-current').text(LIST[0].currentSession);
        $('#sessions-max').text(LIST[0].maxSessions);

        showTaskBar();

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
        dismissTaskBar();
        durationMins = 0;
        durationSecs = 30;
        sectionIndex = 0;
        $('#minutes').text(durationMins + "0");
        $('#seconds').text(durationSecs);

    }
}

function updateTaskList() {

    if (LIST.length >= 8) {
        taskNum.css("color", "#CB4E4E");
        taskNum.text(" (" + LIST.length + ")");
    } else {
        taskNum.css("color", "#A7A7A7");
        taskNum.text(" (" + LIST.length + ")");

    }

    if (listType == 0) {

        if (LIST.length == 0) {
            taskEmptyTitle.text("EMPTY TASK LIST");
            taskEmptyDesc.css("display", "block");
            $("#empty-task").show();
        } else {
            $("#empty-task").hide();
        }

        $("#to-do-list").empty();
        loadList(LIST, false);

    } else {

        if (COMP.length == 0) {
            taskEmptyTitle.text("NO COMPLETED TASKS");
            taskEmptyDesc.css("display", "none");
            $("#empty-task").show();
        } else {
            $("#empty-task").hide();
        }

        $("#to-do-list").empty();
        loadList(COMP, true);
    }
}