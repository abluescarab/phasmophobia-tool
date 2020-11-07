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

document.getElementById("theme").addEventListener("click", function(evt) {
    var body = document.getElementsByTagName("body")[0];
    var remove = "light";
    var add = "dark";

    if(body.classList.contains(add + "-theme")) {
        remove = "dark";
        add = "light";
    }

    body.classList.remove(remove + "-theme");
    body.classList.add(add + "-theme");
});

for(var select of document.querySelectorAll("#objectives select")) {
    select.addEventListener("change", function(evt) {
        getSibling(evt.target, false).checked = false;
        checkObjectiveOptions();
    });
}
