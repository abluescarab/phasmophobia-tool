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
    ghostOrb: "ghost-orb",
    ghostWriting: "ghost-writing",
    dotsProjector: "dots-projector"
});

const ghosts = Object.freeze({
    spirit: [evidence.emfLevel5, evidence.spiritBox, evidence.ghostWriting],
    wraith: [evidence.emfLevel5, evidence.spiritBox, evidence.dotsProjector],
    phantom: [evidence.spiritBox, evidence.fingerprints, evidence.dotsProjector],
    poltergeist: [evidence.spiritBox, evidence.fingerprints, evidence.ghostWriting],
    banshee: [evidence.fingerprints, evidence.ghostOrb, evidence.dotsProjector],
    jinn: [evidence.emfLevel5, evidence.fingerprints, evidence.freezingTemperatures],
    mare: [evidence.spiritBox, evidence.ghostOrb, evidence.ghostWriting],
    revenant: [evidence.ghostOrb, evidence.ghostWriting, evidence.freezingTemperatures],
    shade: [evidence.emfLevel5, evidence.ghostWriting, evidence.freezingTemperatures],
    demon: [evidence.fingerprints, evidence.ghostWriting, evidence.freezingTemperatures],
    yurei: [evidence.ghostOrb, evidence.freezingTemperatures, evidence.dotsProjector],
    oni: [evidence.emfLevel5, evidence.freezingTemperatures, evidence.dotsProjector],
    hantu: [evidence.fingerprints, evidence.ghostOrb, evidence.freezingTemperatures],
    yokai: [evidence.spiritBox, evidence.ghostOrb, evidence.dotsProjector],
    goryo: [evidence.emfLevel5, evidence.fingerprints, evidence.dotsProjector],
    myling: [evidence.emfLevel5, evidence.fingerprints, evidence.ghostWriting]
});
