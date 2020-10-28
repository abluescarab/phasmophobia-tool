document.getElementById("evidence-toggle").addEventListener("click", function(evt) {
    var newState = (evt.target.dataset.state === states.yes.data ?
        states.no : states.yes);

    evt.target.dataset.state = newState.data;
    evt.target.textContent = (newState.data === states.yes.data ? "hide evidence" : "show evidence");
    toggleEvidence(newState);
});

document.getElementById("reset").addEventListener("click", function(evt) {
    var buttons = document.getElementsByClassName("tristate");
    var checkboxes = document.querySelectorAll("input[type=checkbox]");

    document.getElementById("alone").checked = false;
    document.getElementById("everyone").checked = true;

    Array.prototype.forEach.call(buttons, function(b) {
        setState(b, states.empty);
    });

    Array.prototype.forEach.call(checkboxes, function(c) {
        c.checked = false;
    });
});
