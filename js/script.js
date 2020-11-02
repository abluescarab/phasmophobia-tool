const evidence = Object.freeze({
    emfLevel5: "emf-level-5",
    spiritBox: "spirit-box",
    freezingTemperatures: "freezing-temperatures",
    fingerprints: "fingerprints",
    ghostOrbs: "ghost-orbs",
    ghostWriting: "ghost-writing"
});

const ghosts = Object.freeze({
    spirit: [evidence.ghostWriting, evidence.fingerprints, evidence.spiritBox],
    wraith: [evidence.fingerprints, evidence.spiritBox, evidence.freezingTemperatures],
    phantom: [evidence.emfLevel5, evidence.freezingTemperatures, evidence.ghostOrbs],
    poltergeist: [evidence.fingerprints, evidence.spiritBox, evidence.ghostOrbs],
    banshee: [evidence.emfLevel5, evidence.fingerprints, evidence.freezingTemperatures],
    jinn: [evidence.emfLevel5, evidence.spiritBox, evidence.ghostOrbs],
    mare: [evidence.spiritBox, evidence.freezingTemperatures, evidence.ghostOrbs],
    revenant: [evidence.emfLevel5, evidence.ghostWriting, evidence.fingerprints],
    shade: [evidence.emfLevel5, evidence.ghostWriting, evidence.ghostOrbs],
    demon: [evidence.ghostWriting, evidence.spiritBox, evidence.freezingTemperatures],
    yurei: [evidence.ghostWriting, evidence.freezingTemperatures, evidence.ghostOrbs],
    oni: [evidence.emfLevel5, evidence.ghostWriting, evidence.spiritBox]
});

function checkGhosts() {
    var buttons = [].slice.call(document.querySelectorAll("#evidence .multistate"));
    var elements = [].slice.call(document.getElementsByClassName("ghost"));

    for(var element of elements) {
        var id = element.querySelector("button").id;
        var included = buttons.filter(b => ghosts[id].includes(b.id));
        var excluded = buttons.filter(b => !included.includes(b));
        var isExcluded = false;

        for(var i = 0; i < excluded.length; i++) {
            if(excluded[i].dataset.state === states.yes.data) {
                isExcluded = true;
                break;
            }
        }

        if(isExcluded) {
            element.style.display = "none";
        }

        if(!isExcluded) {
            for(var i = 0; i < included.length; i++) {
                if(included[i].dataset.state === states.no.data) {
                    isExcluded = true;
                    break;
                }
            }

            if(isExcluded) {
                element.style.display = "none";
            }
            else {
                element.style.display = "flex";
            }
        }
    }
}

function checkReward(element) {
    var checkedEvidence = false;
    var parent = element.parentElement.parentElement;

    if(parent.id === "objectives") {
        var select = getSibling(element);

        if(select.tagName === "SELECT") {
            var photoEvidence = document.getElementById(select.value);

            if(photoEvidence !== null &&
                element.checked &&
                !photoEvidence.checked) {
                photoEvidence.checked = true;
                checkedEvidence = true;
            }
        }
    }

    if(parent.id === "objectives" || parent.id === "photo-evidence")
        calculateReward(element, checkedEvidence);
}

function checkObjectiveOptions(reset = false) {
    var options = document.querySelectorAll("[id^=objective-] option[id]");
    var selectedOptions = [].slice.call(document.querySelectorAll("[id^=objective-] option[id]:checked"));
    var selectedOptionNames = selectedOptions.map(o => o.id);

    for(var option of options) {
        if(!reset &&
            selectedOptionNames.includes(option.id) &&
            !selectedOptions.includes(option)) {
            option.style.display = "none";
        }
        else {
            option.style.display = "block";
        }
    }
}

function toggle(element) {
    var textContent = element.textContent;
    var substring = textContent.substr(textContent.indexOf(" ") + 1);
    var newState = toggleState(element, substring);

    if(typeof element.dataset.toggleId !== "undefined") {
        toggleId(element.dataset.toggleId, newState, "block");
    }
    else if(typeof element.dataset.toggleClass !== "undefined") {
        toggleClasses(element.dataset.toggleClass, newState, "block");
    }
}

function toggleState(element, textAppend) {
    var newState = (element.dataset.state === states.yes.data ?
        states.no : states.yes);
    var firstWord = element.textContent.substr(0, element.textContent.indexOf(" "));

    element.dataset.state = newState.data;

    if(firstWord === "show" || firstWord === "hide") {
        element.textContent = (newState.data === states.yes.data ? "hide" : "show") + " " + textAppend;
    }

    return newState;
}

function toggleClasses(elementClass, state, shownDisplayValue) {
    var elements = document.getElementsByClassName(elementClass);

    Array.prototype.forEach.call(elements, function(element) {
        element.style.display = (state === states.yes ? shownDisplayValue : "none");
    });
}

function toggleId(elementId, state, shownDisplayValue) {
    var element = document.getElementById(elementId);
    element.style.display = (state === states.yes ? shownDisplayValue : "none");
}

function calculateReward(element, addExtra = false) {
    var difficulty = document.getElementById("difficulty");
    var rewardSpan = document.getElementById("reward");
    var reward = parseInt(rewardSpan.dataset.baseValue);
    var multiplier = parseInt(difficulty.value);

    if(element !== difficulty) {
        reward += (element.checked ? 10 : -10);

        if(addExtra) {
            reward += 10;
        }

        reward = Math.max(0, reward);
        rewardSpan.dataset.baseValue = reward;
    }

    rewardSpan.textContent = reward * multiplier;
}

function convertTemperature(element) {
    var otherElement = document.getElementById(element.id === "celsius" ? "fahrenheit" : "celsius");

    if(element.value === "") {
        otherElement.value = "";
        return;
    }

    if(element.id === "celsius") {
        document.getElementById("fahrenheit").value = ((element.value * 9/5) + 32).toFixed(1);
    }
    else {
        document.getElementById("celsius").value = ((element.value - 32) * 5/9).toFixed(1);
    }
}

function reset() {
    var buttons = document.getElementsByClassName("multistate");
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    var options = document.getElementsByTagName("select");
    var numberBoxes = document.querySelectorAll("input[type=number]");

    document.getElementById("ghost-name").value = "";
    document.getElementById("reward").textContent = 0;
    document.getElementById("reward").dataset.baseValue = 0;
    document.getElementById("alone").checked = false;
    document.getElementById("everyone").checked = true;

    for(var button of buttons) {
        setState(button, states.none);
    }

    for(var checkbox of checkboxes) {
        checkbox.checked = false;
    }

    for(var select of options) {
        select.selectedIndex = 0;
    }

    for(var numberBox of numberBoxes) {
        numberBox.value = "";
    }

    checkObjectiveOptions(true);
}

function getSibling(element, next = true) {
    var sibling = (next ? element.nextSibling : element.previousSibling);

    while(sibling && sibling.nodeType !== 1) {
        sibling = (next ? sibling.nextSibling : sibling.previousSibling);
    }

    return sibling;
}
