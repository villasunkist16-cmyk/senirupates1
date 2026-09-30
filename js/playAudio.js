// ===========================================
// GAME QUIZ V3
// PLAY AUDIO QUESTION
// ===========================================

const audioTransition =
document.getElementById("audio-transition");

const speakerIcon =
document.getElementById("speakerIcon");

const audioTitle =
document.getElementById("audio-title");


// ===========================================
// PLAY SOUND EFFECT
// ===========================================

function playSound(file){

    return new Promise((resolve)=>{

        const sound = new Audio(file);

        sound.onended = ()=>{

            resolve();

        };

        sound.onerror = ()=>{

            console.log(
                "Sound tidak ditemukan:",
                file
            );

            resolve();

        };

        sound.play().catch(err=>{

        console.log(err);

        resolve();
    });

    });

}


// ===========================================
// PLAY AUDIO QUESTION
// ===========================================

async function playAudio(q){

    GameState.mediaPlaying = true;

    AudioManager.stopBGM();

    UI.showAudio();

    //----------------------------------------
    // TRANSISI AWAL
    //----------------------------------------

    audioTitle.textContent =
    "Dengarkan suara ini";

    audioTransition.classList.remove(
        "hidden"
    );

    await AudioManager.audioIntro();
    audioTransition.classList.add(
    "hidden"
    );


    //----------------------------------------
    // SOUND EFFECT
    //----------------------------------------

    await playSound(q.audio);

    //----------------------------------------
    // TRANSISI AKHIR
    //----------------------------------------

    audioTitle.textContent =
    "Suara apakah itu?";

    await AudioManager.audioOutro();

    //----------------------------------------

    audioTransition.classList.add(
        "hidden"
    );

    //----------------------------------------

    UI.showQuiz();

    await loadQuestion();

    await AudioManager.question(q.id);

    //----------------------------------------

    GameState.mediaPlaying = false;

}

// ===========================================
// REPEAT AUDIO
// ===========================================

async function repeatAudio(){

    const q = currentQuestion();

    if(q.media!="audio") return;

    GameState.mediaPlaying = true;

    AudioManager.stopBGM();

    UI.showAudio();

    //----------------------------------------
    // TANPA TRANSISI
    //----------------------------------------

    audioTransition.classList.add(
        "hidden"
    );

    //----------------------------------------

    await playSound(q.audio);

    //----------------------------------------

    UI.showQuiz();

    AudioManager.playBGM();

    //----------------------------------------
    // Putar lagi narator soal
    //----------------------------------------

  await AudioManager.question(q.id);

    GameState.mediaPlaying = false;

}

