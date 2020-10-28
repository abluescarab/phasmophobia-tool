// document.addEventListener("DOMContentLoaded", function(evt) {
//     var elements = document.getElementsByClassName("ghost");
//     var buttons = document.getElementsByClassName("tristate");

//     Array.prototype.forEach.call(elements, function(ghost) {
//         var evidences = ghosts[ghost.id];
//         var content = []

//         for(var i = 0; i < evidences.length; i++) {

//         }
//         // var content =
//         // // console.log(evidences);

//         // // Array.prototype.forEach.call(evidences, function(evidence) {
//         // //     var button = document.getElementById(evidence);
//         // //     console.log(button);
//         // // });
//     });

//     // for(var i = 0; i < elements.length; i++) {
//     //     var evidence = ghosts[elements[i].id];
//     //     var button = document.getElementById(evidence);
//     // }
// });

document.getElementById("show-evidence").addEventListener("click", function(evt) {
    var newState = (evt.target.dataset.state === states.yes.data ?
        states.no : states.yes);

    evt.target.dataset.state = newState.data;
    toggleEvidence(newState);
});

document.getElementById("reset").addEventListener("click", function(evt) {
    var buttons = document.getElementsByClassName("tristate");
    Array.prototype.forEach.call(buttons, function(b) {
        setState(b, states.empty);
    });
});
