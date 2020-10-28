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
    var buttons = Array.prototype.slice.call(document.getElementsByClassName("tristate"));
    var elements = document.getElementsByClassName("ghost");

    Array.prototype.forEach.call(elements, function(elem) {
        var included = buttons.filter(b => ghosts[elem.id].includes(b.id));
        var excluded = buttons.filter(b => !included.includes(b));
        var isExcluded = false;

        for(var i = 0; i < excluded.length; i++) {
            if(excluded[i].dataset.state === states.yes.data) {
                isExcluded = true;
                break;
            }
        }

        if(isExcluded) {
            elem.style.display = "none";
        }

        if(!isExcluded) {
            for(var i = 0; i < included.length; i++) {
                if(included[i].dataset.state === states.no.data) {
                    isExcluded = true;
                    break;
                }
            }

            if(isExcluded) {
                elem.style.display = "none";
            }
            else {
                elem.style.display = "block";
            }
        }
    });
}

function toggleClasses(elementClass, state, shownDisplayValue) {
    var elements = document.getElementsByClassName(elementClass);

    Array.prototype.forEach.call(elements, function(element) {
        console.log(element);
        element.style.display = (state === states.yes ? shownDisplayValue : "none");
    });
}

function toggleId(elementId, state, shownDisplayValue) {
    var element = document.getElementById(elementId);
    element.style.display = (state === states.yes ? shownDisplayValue : "none");
}
