// ===========================================
// GAME QUIZ V3
// PLAY SCENE FINAL
// ===========================================

const questionVideo =
document.getElementById("question-video");

const videoTransition =
document.getElementById("video-transition");

const transitionImage =
document.getElementById("transition-image");


// ===========================================
// PLAY VIDEO
// ===========================================

function playVideo(src){

    return new Promise((resolve,reject)=>{

        questionVideo.src = src;

        questionVideo.load();

        questionVideo.onloadedmetadata = ()=>{

            questionVideo.play();

        };

        questionVideo.onended = ()=>{

            resolve();

        };

        questionVideo.onerror = ()=>{

            reject("Video tidak ditemukan : "+src);

        };

    });

}


// ===========================================
// PLAY SCENE
// ===========================================

async function playScene(q){

    GameState.mediaPlaying = true;

    AudioManager.stop();

    AudioManager.stopBGM();

    UI.showVideo();

    //----------------------------------
    // Transisi awal
    //----------------------------------

    transitionImage.src =
    "aset/transisi/video-intro.jpg";

    videoTransition.classList.remove("hidden");

    await AudioManager.videoIntro();

    videoTransition.classList.add("hidden");

    //----------------------------------
    // Video
    //----------------------------------

    await playVideo(q.video);

    //----------------------------------
    // Transisi akhir
    //----------------------------------

    videoTransition.classList.remove("hidden");

    transitionImage.src =
    "aset/transisi/video-outro.jpg";

    await AudioManager.videoOutro();

    videoTransition.classList.add("hidden");

    //----------------------------------
    // Quiz
    //----------------------------------

    UI.showQuiz();

    AudioManager.playBGM();

    await loadQuestion();

    await AudioManager.question(q.id);

    GameState.mediaPlaying = false;

}


// ===========================================
// REPEAT VIDEO
// ===========================================

async function repeatScene(){

    AudioManager.stop();

    questionVideo.pause();

    questionVideo.currentTime = 0;

    const q = currentQuestion();

    GameState.mediaPlaying = true;

    AudioManager.stopBGM();

    UI.showVideo();

    videoTransition.classList.add("hidden");

    await playVideo(q.video);

    UI.showQuiz();

    AudioManager.playBGM();

    await AudioManager.question(q.id);

    GameState.mediaPlaying = false;

}