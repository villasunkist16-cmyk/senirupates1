// ===========================================
// GAME QUIZ V3
// APP
// ===========================================

console.log("================================");
console.log("GAME QUIZ ENGINE V3");
console.log("================================");

// ===========================================
// DOM READY
// ===========================================

document.addEventListener(
    "DOMContentLoaded",
    initGame
);

// ===========================================
// INIT GAME
// ===========================================

function initGame(){

    console.log("Init Engine V3");

    UI.init();

    AudioManager.init();

    resetGame();

    UI.showOpening();

}

// ===========================================
// RESET GAME
// ===========================================

function resetGame(){

    GameState.playerName = "";

    GameState.score = 0;

    GameState.currentQuestion = 0;

    GameState.currentVideo = "";

    GameState.repeatQuestionIndex = -1;

    GameState.answered = false;

    GameState.mediaPlaying = false;

    GameState.repeatMode = false;

    GameState.bgmPlaying = false;

    GameState.narrationPlaying = false;

    GameState.gameStarted = false;

    GameState.gameFinished = false;

}

// ===========================================
// RESTART GAME
// ===========================================

function restartGame(){

    AudioManager.stop();

    AudioManager.stopBGM();

    resetGame();

    UI.showOpening();

}