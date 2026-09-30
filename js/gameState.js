// ===========================================
// GAME QUIZ V3
// GAME STATE
// ===========================================

const GameState = {

    // ==========================
    // PLAYER
    // ==========================

    playerName : "",

    score : 0,

    // ==========================
    // QUESTION
    // ==========================

    currentQuestion : 0,

    answered : false,

    // ==========================
    // SCENE
    // ==========================

    currentVideo : "",

    repeatQuestionIndex : -1,

    // ==========================
    // MEDIA
    // ==========================

    mediaPlaying : false,

    repeatMode : false,

    // ==========================
    // AUDIO
    // ==========================

    bgmPlaying : false,

    narrationPlaying : false,

    // ==========================
    // GAME
    // ==========================

    gameStarted : false,

    gameFinished: false,
    correctAnswers: 0,
    wrongAnswers: 0

};