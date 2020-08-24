const list = document.getElementById("to-do-list");
const compList = document.getElementById("complete-list");
const input = document.getElementById("to-do-input");
const sessions = document.getElementById("sessions-input");
const focusMins = document.getElementById("focus-input-mins");
const focusSecs = document.getElementById("focus-input-secs");
const breakMins = document.getElementById("break-input-mins");
const breakSecs = document.getElementById("break-input-secs");
const taskBar = document.querySelector('.sessions-notify');


const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, COMP, id;



//localStorage.removeItem("TODO");
//localStorage.removeItem("CTODO");
let data = localStorage.getItem("TODO");
let data2 = localStorage.getItem("CTODO")

if (data) {
    LIST = JSON.parse(data);
    id = localStorage.getItem("INDEX");; // set the id to the last one in the list
    loadList(LIST, false); // load the list to the user interface
} else {
    LIST = [];
    id = 0;
}

if (data2) {
    COMP = JSON.parse(data2);
    loadList(COMP, true); // load the list to the user interface

} else {
    COMP = [];
}

window.onload = function() {
    if ($("#to-do-list li").length == 0 && $("#complete-list li").length == 0) {
        $("#empty-task").show();
    } else {
        $("#empty-task").hide();
    }
    updateAll();

    // //there is data and task not complete
    // if (LIST.length != 0 && LIST[0].done == false) {
    //     updateAll();
    // } else {
    //     updateAll();
    //     $(".sessions-notify").css("display", "none");
    // }

}

function loadList(array, comp) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.started, item.done, item.taskSection, item.currentSession, item.maxSessions, item.focusM, item.focusS, item.breakM, item.breakS, comp);

    });
}





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
                    <span class="task-status-completed" id="${id}">Complete</span>
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

        const position = "beforeend";
        compList.insertAdjacentHTML(position, item);

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
                    <span class="task-status-completed" id="${id}">Complete</span>
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

function toDoAddToSystem() {
    const toDo = input.value;
    const sessionsVal = sessions.value;
    const focusMinsVal = focusMins.value;
    const focusSecsVal = focusSecs.value;
    const breakMinsVal = breakMins.value;
    const breakSecsVal = breakSecs.value;

    // if the input isn't empty
    if (toDo) {


        $("#empty-task").hide();

        addToDo(toDo, id, false, false, 0, 0, sessionsVal, focusMinsVal, focusSecsVal, breakMinsVal, breakSecsVal, false);

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

        // add item to localstorage ( this code must be added where the LIST array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        localStorage.setItem("INDEX", JSON.stringify(id));


        //Override default timer
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
    input.value = "";
}

document.addEventListener("keyup", function(even) {
    if (event.keyCode == 13) {
        toDoAddToSystem();
    }
});



function completeToDo(element) {
    // element.classList.toggle(CHECK);
    // element.classList.toggle(UNCHECK);
    // element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    // LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    //LIST[element.id].trash = true;
    var removeIndex = LIST.findIndex(({ id }) => id == element.id);
    console.log(removeIndex);
    LIST.splice(removeIndex, 1);

    localStorage.setItem("TODO", JSON.stringify(LIST));

    if ($("#to-do-list li").length == 0 && $("#complete-list li").length == 0) {
        $("#empty-task").show();
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

    // if (elementJob == "complete") {
    //     completeToDo(element);
    // } 

    if (elementJob == "delete") {
        removeToDo(element);
    }

    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

//prevent editing and deleting of sessions number
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



document.getElementById("to-do-add-button").addEventListener("click", function() {
    toDoAddToSystem();
});


function showTaskBar() {
    taskBar.classList.add('display');
}

function dismissTaskBar() {
    taskBar.classList.remove('display');
}

function dismissAndShowBar() {
    taskBar.classList.remove('display');
    taskBar.addEventListener(transitionEvent, showRemove);
}

var transitionEvent = whichTransitionEvent();

function showRemove(event) {
    taskBar.removeEventListener(transitionEvent, showRemove);
    //setTimeout(function() { taskBar.classList.remove('display'); }, 700);
    taskBar.classList.add('display');
}

function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}