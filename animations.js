const taskBar = document.querySelector('.sessions-notify');

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