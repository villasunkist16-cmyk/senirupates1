// ===========================================
// GAME QUIZ V3
// START GAME
// ===========================================

// Tombol mulai
const startButton =
document.getElementById("start-btn");

// Input nama (boleh belum ada di HTML)
const playerNameInput =
document.getElementById("player-name");


// ===========================================
// START GAME
// ===========================================

function startGame(){

    console.log("===== START GAME =====");

    //----------------------------------------
    // Reset seluruh game
    //----------------------------------------

    resetGame();

    //----------------------------------------
    // Nama pemain
    //----------------------------------------

    if(playerNameInput){

        GameState.playerName =
            playerNameInput.value.trim();

    }

    if(GameState.playerName==""){

        GameState.playerName="Player";

    }

    //----------------------------------------

    GameState.gameStarted=true;

    //----------------------------------------

    AudioManager.stop();

    AudioManager.stopBGM();

    //----------------------------------------

    startQuestion();

}


// ===========================================
// BUTTON
// ===========================================

if(startButton){

    startButton.onclick=()=>{

        startGame();

    };

}