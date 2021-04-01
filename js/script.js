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

        if(!isExcluded) {
            for(var i = 0; i < included.length; i++) {
                if(included[i].dataset.state === states.no.data) {
                    isExcluded = true;
                    break;
                }
            }
        }

        if(isExcluded) {
            element.style.display = "none";
        }
        else {
            element.style.display = "flex";

            // var checked = included.filter(i => i.dataset.state === states.yes.data);
            // var elems = [].slice.call(element.querySelectorAll("span")).filter(e => checked.contains(e.classList));
        }
    }
}

function checkReward(element) {
    var checkedEvidence = false;
    var parent = element.parentElement.parentElement;

    if(parent.id === "objectives-section") {
        var select = getSibling(element);

        if(select.tagName === "SELECT") {
            var photoEvidence = document.getElementById(select.value);

            if(photoEvidence !== null &&
                element.dataset.state === states.yes.data &&
                photoEvidence.dataset.state !== states.yes.data) {
                    setState(photoEvidence, states.yes);
                    checkedEvidence = true;
            }
        }
    }

    if(parent.id === "objectives-section" || parent.id === "photo-evidence-section")
        calculateReward(element, checkedEvidence);
}

function checkObjectiveOptions(reset = false) {
    var query = "[id^=objective-] option:not(:first-child)";
    var all = document.querySelectorAll(query);
    var selected = [].slice.call(document.querySelectorAll(query + ":checked"));
    var selectedNames = selected.map(o => o.classList[0]);

    for(var option of all) {
        if(!reset && selectedNames.includes(option.classList[0]) && !selected.includes(option)) {
            option.style.display = "none";
        }
        else {
            option.style.display = "block";
        }
    }
}

function toggle(element, newState = null) {
    var toggledState = (newState ? newState : getNewState(element));
    setElementState(element, toggledState);

    if(element.id === "toggle-all") {
        var toggles = [].slice.call(document.querySelectorAll("[data-toggle$='section']"));

        for(var toggle of toggles) {
            toggleElements(toggle.dataset.toggle, toggledState, "block");
            setElementState(toggle, toggledState);
        }
    }

    if(typeof element.dataset.toggle !== "undefined") {
        toggleElements(element.dataset.toggle, toggledState, "block");
    }
}

function getNewState(element) {
    return element.dataset.state === states.yes.data ? states.no : states.yes;
}

function setElementState(element, newState) {
    var substrings = element.textContent.split(/ (.+)/);

    element.dataset.state = newState.data;

    if(substrings[0] === "show" || substrings[0] === "hide") {
        element.textContent = (newState.data === states.yes.data ? "hide" : "show") + " " + substrings[1];
    }
}

function toggleElements(selectors, state, shownDisplayValue) {
    for(var selector of selectors.split(" ")) {
        var elements = document.querySelectorAll(selector);

        for(var element of elements) {
            element.style.display = (state === states.yes ? shownDisplayValue : "none");
        }
    }
}

function calculateReward(element, addExtra = false) {
    var difficulty = document.getElementById("difficulty");
    var rewardSpan = document.getElementById("reward");
    var reward = parseInt(rewardSpan.dataset.baseValue);
    var multiplier = parseInt(difficulty.value);

    if(element !== difficulty) {
        reward += (element.dataset.state === states.yes.data ? 10 : -10);

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
    var options = document.getElementsByTagName("select");
    var numberBoxes = document.querySelectorAll("input[type=number]");

    document.getElementById("ghost-name").value = "";
    document.getElementById("reward").textContent = 0;
    document.getElementById("reward").dataset.baseValue = 0;
    document.getElementById("alone").checked = false;
    document.getElementById("everyone").checked = false;
    document.getElementById("unknown").checked = true;

    for(var button of buttons) {
        setState(button, states.none);
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

function changeTheme(theme = "") {
    var body = document.getElementsByTagName("body")[0];
    var oldTheme = "light";
    var newTheme = "dark";

    if(theme !== "") {
        oldTheme = (theme === "light" ? "dark" : "light");
        newTheme = (theme === "light" ? "light" : "dark");
    }
    else if(body.classList.contains(newTheme + "-theme")) {
        oldTheme = "dark";
        newTheme = "light";
    }

    body.classList.remove(oldTheme + "-theme");
    body.classList.add(newTheme + "-theme");

    return newTheme;
}

// modified from https://stackoverflow.com/a/25490531
function getCookie(name) {
    var result = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]*)');

    if(result === null) {
        return null;
    }

    return result.pop();
}

// copied from https://stackoverflow.com/a/24103596
function setCookie(name, value, days) {
    var expires = "";

    if(days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
