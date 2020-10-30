document.getElementById("difficulty").addEventListener("change", function(evt) {
    calculateReward(evt.target);
});

document.getElementById("reset").addEventListener("click", function(evt) {
    var buttons = document.getElementsByClassName("tristate");
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    var options = document.getElementsByTagName("select");

    document.getElementById("ghost-name").value = "";
    document.getElementById("reward").textContent = 0;
    document.getElementById("reward").dataset.baseValue = 0;
    document.getElementById("alone").checked = false;
    document.getElementById("everyone").checked = true;

    for(var button of buttons) {
        setState(button, states.empty);
    }

    for(var checkbox of checkboxes) {
        checkbox.checked = false;
    }

    for(var select of options) {
        select.selectedIndex = 0;
    }
    checkObjectiveOptions(true);
});

for(var toggle of document.getElementsByClassName("toggle")) {
    toggle.addEventListener("click", function(evt) {
        var textContent = evt.target.textContent;
        var substring = textContent.substr(textContent.indexOf(" ") + 1);
        var newState = toggleState(evt.target, substring);

        if(typeof evt.target.dataset.toggleId !== "undefined") {
            toggleId(evt.target.dataset.toggleId, newState, "block");
        }
        else if(typeof evt.target.dataset.toggleClass !== "undefined") {
            toggleClasses(evt.target.dataset.toggleClass, newState, "block");
        }
    });
}

for(var checkbox of document.querySelectorAll("input[type=checkbox]")) {
    checkbox.addEventListener("click", function(evt) {
        var checkedEvidence = false;
        var parent = evt.target.parentElement.parentElement;

        if(parent.id === "objectives") {
            console.log("checked");
            var select = getSibling(evt.target);

            if(select.tagName === "SELECT") {
                var photoEvidence = document.getElementById(select.value);

                if(photoEvidence !== null &&
                    evt.target.checked &&
                    !photoEvidence.checked) {
                    photoEvidence.checked = true;
                    checkedEvidence = true;
                }
            }
        }

        calculateReward(evt.target, checkedEvidence);
    });
}

for(var select of document.querySelectorAll("#objectives select")) {
    select.addEventListener("change", function(evt) {
        getSibling(evt.target, false).checked = false;
        checkObjectiveOptions();
    });
}
