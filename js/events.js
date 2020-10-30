Array.prototype.forEach.call(document.getElementsByClassName("toggle"), function(toggle) {
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
});

Array.prototype.forEach.call(document.querySelectorAll("#objectives input[type=checkbox]"), function(checkbox) {
    checkbox.addEventListener("click", function(evt) {
        var select = checkbox.nextSibling;

        while(select && select.nodeType !== 1) {
            select = select.nextSibling;
        }

        if(select.tagName === "SELECT") {
            var photoEvidence = document.getElementById(select.value);

            if(photoEvidence !== null && checkbox.checked) {
                photoEvidence.checked = true;
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", function(evt) {
    var buttons = document.getElementsByClassName("tristate");
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    var selects = document.getElementsByTagName("select");

    document.getElementById("ghost-name").value = "";
    document.getElementById("alone").checked = false;
    document.getElementById("everyone").checked = true;

    Array.prototype.forEach.call(buttons, function(b) {
        setState(b, states.empty);
    });

    Array.prototype.forEach.call(checkboxes, function(c) {
        c.checked = false;
    });

    Array.prototype.forEach.call(selects, function(s) {
        s.selectedIndex = 0;
    });
});

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
