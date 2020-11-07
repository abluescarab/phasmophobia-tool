const states = Object.freeze({
    yes: {
        data: "yes",
        text: "\u2713"
    },
    no: {
        data: "no",
        text: "\u2715"
    },
    none: {
        data: "none",
        text: ""
    }
});

Array.prototype.forEach.call(document.getElementsByClassName("multistate"),
function(elem) {
    elem.addEventListener("click", nextState, false);
});

function nextState(evt) {
    var element = evt.target;
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
    element.textContent = state.text;
    element.dataset.state = state.data;
    checkGhosts();
}
