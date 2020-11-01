document.addEventListener("click", function(evt) {
    var element = evt.target;

    if(element.classList.contains("toggle")) {
        toggle(element);
        evt.stopPropagation();
    }

    if(element.type && element.type === "checkbox") {
        checkReward(element);
        evt.stopPropagation();
    }

    if(element.id === "reset") {
        reset();
        evt.stopPropagation();
    }
});

document.getElementById("celsius").addEventListener("input", function(evt) {
    convertTemperature(evt.target);
});

document.getElementById("fahrenheit").addEventListener("input", function(evt) {
    convertTemperature(evt.target);
});

document.getElementById("difficulty").addEventListener("change", function(evt) {
    calculateReward(evt.target);
});

for(var select of document.querySelectorAll("#objectives select")) {
    select.addEventListener("change", function(evt) {
        getSibling(evt.target, false).checked = false;
        checkObjectiveOptions();
    });
}
