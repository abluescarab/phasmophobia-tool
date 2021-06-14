const cookieNames = Object.freeze({
    cookiesAllowed: "phasmoToolCookiesAllowed",
    theme: "phasmoToolTheme",
    sectionStates: "phasmoToolSectionStates"
});

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
    oni: [evidence.emfLevel5, evidence.ghostWriting, evidence.spiritBox],
    hantu: [evidence.fingerprints, evidence.ghostOrbs, evidence.ghostWriting],
    yokai: [evidence.spiritBox, evidence.ghostOrbs, evidence.ghostWriting]
});
