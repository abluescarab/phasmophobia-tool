const states = Object.freeze({
    yes: {
        data: "yes",
        text: "\u2713",
        color: "green"
    },
    no: {
        data: "no",
        text: "\u2715",
        color: "red"
    },
    empty: {
        data: "none",
        text: "",
        color: "black"
    }
});

Array.prototype.forEach.call(document.getElementsByClassName("tristate"),
function(elem) {
    elem.addEventListener("click", nextState, false);
});

function nextState(evt) {
    element = evt.target;

    switch(element.dataset.state) {
        case states.empty.data:
            setState(element, states.yes);
            break;
        case states.yes.data:
            setState(element, states.no);
            break;
        case states.no.data:
        default:
            setState(element, states.empty);
            break;
    }
}

function setState(element, state) {
    element.textContent = state.text;
    element.style.color = state.color;
    element.dataset.state = state.data;

    checkGhosts();
}
