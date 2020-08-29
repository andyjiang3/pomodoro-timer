const list = document.getElementById("to-do-list");
const compList = document.getElementById("complete-list");
const input = document.getElementById("to-do-input");
const sessions = document.getElementById("sessions-input");
const focusMins = document.getElementById("focus-input-mins");
const focusSecs = document.getElementById("focus-input-secs");
const breakMins = document.getElementById("break-input-mins");
const breakSecs = document.getElementById("break-input-secs");
const taskNum = $('.task-num');
const listTypeSpan = $('#list-type-span');
const taskEmptyTitle = $('#empty-task-title');
const taskEmptyDesc = $('#empty-task-desc');
const completedPopup = $('.task-popup-bg');
const taskName = $('.task-popup-name');



const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

var listType = 0;

let LIST, COMP, id;

//Empty Task and Completed Task arraylist. 
//localStorage.removeItem("TODO");
//localStorage.removeItem("CTODO");

let data = localStorage.getItem("TODO");
let data2 = localStorage.getItem("CTODO")

//Get incomplete & in-progress tasks from local storage
if (data) {
    LIST = JSON.parse(data);
    id = localStorage.getItem("INDEX");; // set the id to the last one in the list
    loadList(LIST, false); // load the list to the user interface
} else {
    LIST = [];
    id = 0;
}

//Get completed tasks from local storage
if (data2) {
    COMP = JSON.parse(data2);

} else {
    COMP = [];
}

//On window load - Get data from local storage and update labels
window.onload = function() {
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
    } else {
        if (COMP.length == 0) {
            taskEmptyTitle.text("NO COMPLETED TASKS");
            taskEmptyDesc.css("display", "none");
            $("#empty-task").show();
        } else {
            $("#empty-task").hide();
        }
    }

    updateAll();

}

//Load task list
function loadList(array, comp) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.started, item.done, item.taskSection, item.currentSession, item.maxSessions, item.focusM, item.focusS, item.breakM, item.breakS, comp);

    });
}

//Add task to list (with status and timer infos)
function addToDo(toDo, id, started, done, taskSection, currentSession, sessionsVal, focusMinsVal, focusSecsVal, breakMinsVal, breakSecsVal, comp) {


    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    focusMinsVal = focusMinsVal < 10 ? focusMinsVal * 1 + "m" : focusMinsVal + "m";
    breakMinsVal = breakMinsVal < 10 ? breakMinsVal * 1 + "m" : breakMinsVal + "m";

    focusSecsVal = focusSecsVal == 0 ? "" : focusSecsVal + "s";
    breakSecsVal = breakSecsVal == 0 ? "" : breakSecsVal + "s";

    var item = '';

    // <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    //                 <p class="text ${LINE}">

    //                 </p>

    if (comp) {
        console.log("Loading Completed Tasks");
        if (done) {
            item = `<li class="item">
                    <p class="text">
                    <span class="task-status-completed" id="${id}">Completed</span>
                    ${toDo}
                    <span class="timer-info">| ${sessionsVal} sets | ${focusMinsVal}${focusSecsVal} focus | ${breakMinsVal}${breakSecsVal} break</span>
                    </p>
                  </li>
                `;
        } else {
            item = `<li class="item">
                    <p class="text">
                    <span class="task-status" id="${id}">Incomplete</span>
                    ${toDo}
                    <span class="timer-info">| ${sessionsVal} sets | ${focusMinsVal}${focusSecsVal} focus | ${breakMinsVal}${breakSecsVal} break</span>
                    </p>
                  </li>
                `;

        }

        const position = "afterbegin";
        list.insertAdjacentHTML(position, item);

    } else {
        console.log("Loading Regular Tasks");
        if (LIST.length != 0 && LIST[0].id == id && LIST[0].started == true) {
            item = `<li class="item">
                    <p class="text">
                    <span class="task-status-inprogress" id="${id}">In Progress</span>
                    ${toDo}
                    <span class="timer-info">| ${sessionsVal} sets | ${focusMinsVal}${focusSecsVal} focus | ${breakMinsVal}${breakSecsVal} break</span>
                    </p>
                  </li>
                `;
        } else if (done) {
            item = `<li class="item">
                    <p class="text">
                    <span class="task-status-completed" id="${id}">Completed</span>
                    ${toDo}
                    <span class="timer-info">| ${sessionsVal} sets | ${focusMinsVal}${focusSecsVal} focus | ${breakMinsVal}${breakSecsVal} break</span>
                    </p>
                    <i class="fa fa-times-circle fa-lg de" job="delete" id="${id}"></i>
                  </li>
                `;
        } else {
            item = `<li class="item">
                    <p class="text">
                    <span class="task-status" id="${id}">Incomplete</span>
                    ${toDo}
                    <span class="timer-info">| ${sessionsVal} sets | ${focusMinsVal}${focusSecsVal} focus | ${breakMinsVal}${breakSecsVal} break</span>
                    </p>
                    <i class="fa fa-times-circle fa-lg de" job="delete" id="${id}"></i>
                  </li>
                `;

        }

        const position = "beforeend";
        list.insertAdjacentHTML(position, item);
    }
}

//Task system - Add new task to local storage and update task list 
function toDoAddToSystem() {
    const toDo = input.value;
    const sessionsVal = sessions.value;
    const focusMinsVal = focusMins.value;
    const focusSecsVal = focusSecs.value;
    const breakMinsVal = breakMins.value;
    const breakSecsVal = breakSecs.value;

    // if the input isn't empty
    if (toDo) {

        if (listType == 0) {
            $("#empty-task").hide();
        }

        //Maximum tasks check
        if (LIST.length >= 8) {
            taskNum.css("color", "#CB4E4E");
            return;
        }

        if (listType == 0) {
            addToDo(toDo, id, false, false, 0, 0, sessionsVal, focusMinsVal, focusSecsVal, breakMinsVal, breakSecsVal, false);
        }

        LIST.push({
            name: toDo,
            id: id,
            started: false,
            done: false,
            taskSection: 0,
            currentSession: 0,
            maxSessions: sessionsVal,
            focusM: focusMinsVal,
            focusS: focusSecsVal,
            breakM: breakMinsVal,
            breakS: breakSecsVal
        });

        //Update local storage
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        localStorage.setItem("INDEX", JSON.stringify(id));

        //Update list number label
        if (LIST.length >= 8) {
            taskNum.css("color", "#CB4E4E");
            taskNum.text(" (" + LIST.length + ")");
        } else {
            taskNum.css("color", "#A7A7A7");
            taskNum.text(" (" + LIST.length + ")");

        }

        //If new task is added to empty list, override default timer and start new task
        if (defaultTimer) {
            started = false;
            timer.stop();
            $("#pausestart").attr("src", "img/nav/startNew2.svg");
            updateAll();

        } else {
            if (LIST.length == 1) {
                updateAll();
            } else {
                updateLabels();
            }
        }

    }

    //Reset task name
    input.value = "";
}


$(document).ready(function() {
    $('#list-type').click(function() {
        listType = listType == 0 ? 1 : 0;

        if (listType == 0) {
            listTypeSpan.text("Recently Completed");

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
            listTypeSpan.text("In-Progress/Incomplete");

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
    });
});

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    var removeIndex = LIST.findIndex(({ id }) => id == element.id);
    console.log(removeIndex);
    LIST.splice(removeIndex, 1);

    localStorage.setItem("TODO", JSON.stringify(LIST));

    taskNum.css("color", "#A7A7A7");
    taskNum.text(" (" + LIST.length + ")");

    if (listType == 0) {
        if (LIST.length == 0) {
            taskEmptyTitle.text("EMPTY TASK LIST");
            taskEmptyDesc.css("display", "block");
            $("#empty-task").show();
        } else {
            $("#empty-task").hide();
        }
    } else {
        if (COMP.length == 0) {
            taskEmptyTitle.text("NO COMPLETED TASKS");
            taskEmptyDesc.css("display", "none");
            $("#empty-task").show();
        } else {
            $("#empty-task").hide();
        }
    }

    if ($("#to-do-list li").length == 0) {
        dismissTaskBar();
        updateAll();
    } else {
        updateAll();
    }
}

function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function formatNum(ele) {
    if ($(ele).val() < 10) {
        $(ele).val("0" + $(ele).val() * 1);
    }

}


list.addEventListener("click", function(event) {
    const element = event.target; // return the clicked element inside list
    var elementJob;
    if (element.hasAttribute('job')) {
        elementJob = element.attributes.job.value; // complete or delete
    }

    if (elementJob == "delete") {
        removeToDo(element);
    }

    //Update local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

//Prevent editing and deleting of sessions number
$("#sessions-input").keypress(function(evt) {
    evt.preventDefault();
}).keydown(function(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
        return false;
    }
});

$("#sessions-input").keypress(function(evt) {
    evt.preventDefault();
}).keydown(function(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
        return false;
    }
});

//"Enter" key support for adding task
document.addEventListener("keyup", function(even) {
    if (event.keyCode == 13) {
        toDoAddToSystem();
    }
});

document.getElementById("to-do-add-button").addEventListener("click", function() {
    toDoAddToSystem();
});

document.getElementById("newtask-button").addEventListener("click", function() {
    completedPopup.css("display", "none");
    openedTask = true;
    document.getElementById("taskMenu").style.width = "100%";
});

document.getElementById("close-button").addEventListener("click", function() {
    completedPopup.css("display", "none");
});