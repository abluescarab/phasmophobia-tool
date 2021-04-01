const states = Object.freeze({
    yes: {
        data: "yes",
        text: "done"
    },
    no: {
        data: "no",
        text: "close"
    },
    none: {
        data: "none",
        text: ""
    }
});

document.addEventListener("click", function(evt) {
    var element = evt.target;

    if(element.classList.contains("multistate")) {
        nextState(element);
    }
});

function nextState(element) {
    var allStates = [states.yes.data, states.no.data, states.none.data];

    if(typeof(element.dataset.states) !== "undefined") {
        allStates = element.dataset.states.split(" ");
    }

    var nextIndex = allStates.indexOf(element.dataset.state) + 1;

    if(nextIndex >= allStates.length)
        nextIndex = 0;

    setState(element, states[allStates[nextIndex]]);
}

function setState(element, state) {
    element.innerHTML = state.text;
    element.dataset.state = state.data;
    checkGhosts();
}
