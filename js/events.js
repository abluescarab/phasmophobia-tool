document.getElementById("show-evidence").addEventListener("click", function(evt) {
    var newState = (evt.target.dataset.state === states.yes.data ?
        states.no : states.yes);

    evt.target.dataset.state = newState.data;
    evt.target.textContent = (newState.data === states.yes.data ? "hide evidence" : "show evidence");
    toggleEvidence(newState);
});

document.getElementById("reset").addEventListener("click", function(evt) {
    var buttons = document.getElementsByClassName("tristate");
    Array.prototype.forEach.call(buttons, function(b) {
        setState(b, states.empty);
    });
});
