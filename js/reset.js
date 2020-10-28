document.getElementById("reset").addEventListener("click", resetButtons, false);

function resetButtons() {
    var buttons = document.getElementsByClassName("tristate");
    Array.prototype.forEach.call(buttons, function(b) {
        setState(b, states.empty);
    });
}
