// ===========================================
// GAME QUIZ V3
// QUESTION MANAGER
// ===========================================

// -------------------------------------------
// ELEMENT
// -------------------------------------------

const questionCounter =
document.getElementById("question-counter");

const scoreBox =
document.getElementById("score-box");

const questionText =
document.getElementById("question-text");

const questionImage =
document.getElementById("question-image");

const questionBox =
document.getElementById("question-box");

const questionBoxBg =
document.getElementById("question-box-bg");

const answersDiv =
document.getElementById("answers");

const repeatBtn =
document.getElementById("repeat-btn");

const nextBtn =
document.getElementById("quiz-next-btn");


// ===========================================
// LOAD QUESTION
// ===========================================

async function loadQuestion(){

    //----------------------------------------
    // Reset State
    //----------------------------------------

    GameState.answered = false;

    const q = currentQuestion();

    if(!q){

        finishGame();

        return;

    }

    //----------------------------------------
    // Update UI
    //----------------------------------------

    questionCounter.textContent =
        `${GameState.currentQuestion + 1}/${questions.length}`;

    scoreBox.textContent =
        formatScore(GameState.score);

    questionText.textContent =
        q.question;

    //----------------------------------------
    // Tombol
    //----------------------------------------

    nextBtn.classList.add("hidden");

    repeatBtn.classList.remove("hidden");

    //----------------------------------------
    // Bersihkan Jawaban Lama
    //----------------------------------------

    answersDiv.innerHTML = "";

   //----------------------------------------
// Gambar Soal
//----------------------------------------

if(q.image){

    questionImage.src = q.image;

    questionImage.classList.remove("hidden");

    questionBoxBg.src =
        "aset/icon/question-box-image.png";

    // Posisi teks untuk soal bergambar
    questionText.style.top = "72%";

}else{

    questionImage.classList.add("hidden");

    questionBoxBg.src =
        "aset/icon/question-box-text.png";

    // Posisi normal
    questionText.style.top = "52%";

}

    //----------------------------------------
    // Buat Pilihan Jawaban
    //----------------------------------------

    createAnswers(q);

    //----------------------------------------
    // Musik Background
    //----------------------------------------

    AudioManager.playBGM();

    
}

//
// ===========================================
// CREATE ANSWER
// ===========================================

function createAnswers(q){

    q.answers.forEach((answer,index)=>{

        const btn=document.createElement("div");

        btn.className="answer-btn";

        btn.dataset.index=index;

        btn.innerHTML=`

<img
class="answer-bg"
src="aset/icon/answer-yellow.png">

<span class="answer-text">

${answer}

</span>

`;

        btn.onclick=()=>{

            checkAnswer(btn,q);

        };

        answersDiv.appendChild(btn);

    });

}

// ===========================================
// CHECK ANSWER
// ===========================================

async function checkAnswer(btn, q){

    //----------------------------------------
    // Sudah dijawab?
    //----------------------------------------

    if(GameState.answered) return;

    GameState.answered = true;

    //----------------------------------------
// Stop narator soal dan TTS
//----------------------------------------

// Hentikan narator dan batalkan antrean pembacaan
AudioManager.stopSpeech();

// Hentikan audio MP3 yang sedang berjalan
AudioManager.stop();

    //----------------------------------------
    // Disable semua tombol jawaban
    //----------------------------------------

    const buttons =
        document.querySelectorAll(".answer-btn");

    buttons.forEach(item=>{

        item.style.pointerEvents = "none";

    });

    //----------------------------------------
    // Tampilkan warna jawaban
    //----------------------------------------

    let correctButton = null;

buttons.forEach((item,index)=>{

    const bg =
        item.querySelector(".answer-bg");

    if(index === q.correct){

        bg.src =
        "aset/icon/answer-green.png";

        correctButton = item;

    }

    if(item===btn &&
       index!==q.correct){

        bg.src =
        "aset/icon/answer-red.png";

    }

});

    //----------------------------------------
    // Sembunyikan tombol ulangi
    //----------------------------------------

    repeatBtn.classList.add("hidden");

    if(correctButton){

    correctButton.classList.add("answer-pulse");

}
       //----------------------------------------
    // Tambah skor dan hitung jawaban
    //----------------------------------------

    const selected =
        Number(btn.dataset.index);

    if(selected === q.correct){

        GameState.score += q.score;
        GameState.correctAnswers++;

        scoreBox.textContent =
            formatScore(GameState.score);

        await AudioManager.correct();

    }else{

        GameState.wrongAnswers++;

        await AudioManager.wrong();

    }

    //----------------------------------------
    // Bacakan jawaban yang benar
    //----------------------------------------

    await AudioManager.answer(q.id);

    
    //----------------------------------------
    // Tampilkan tombol NEXT
    //----------------------------------------

    nextBtn.classList.remove("hidden");

}

// ===========================================
// NEXT
// ===========================================

nextBtn.onclick = () => {

    nextQuestion();

};

// ===========================================
// REPEAT
// ===========================================

repeatBtn.onclick = async () => {

    const q = currentQuestion();

    if(q.media === "video"){

        repeatScene();

        return;

    }

    if(q.media === "audio"){

        repeatAudio();

        return;

    }

    await AudioManager.question(q.id);

};

// ===========================================
// START QUESTION
// ===========================================

async function startQuestion(){

    //----------------------------------------
    // Ambil soal aktif
    //----------------------------------------

    const q = currentQuestion();

    if(!q){

        finishGame();

        return;

    }

    //----------------------------------------
    // Reset status
    //----------------------------------------

    GameState.answered = false;

    //----------------------------------------
// VIDEO
//----------------------------------------

if(q.media=="video"){

    if(GameState.currentVideo!==q.video){

        GameState.currentVideo=q.video;

        await playScene(q);

    }

    else{

        UI.showQuiz();

        await loadQuestion();

        await AudioManager.question(q.id);

    }

    return;

}

    //----------------------------------------
    // AUDIO
    //----------------------------------------

    if(q.media === "audio"){

        await playAudio(q);

        return;

    }

    //----------------------------------------
    // IMAGE / TEXT
    //----------------------------------------

    UI.showQuiz();

    await loadQuestion();

    // Narator soal hanya untuk soal biasa
    await AudioManager.question(q.id);

}

// ===========================================
// CURRENT QUESTION
// ===========================================

function currentQuestion(){

    return questions[
        GameState.currentQuestion
    ];

}

// ===========================================
// FORMAT SCORE
// ===========================================

function formatScore(score){

    return score.toLocaleString("id-ID");

}

// ===========================================
// NEXT QUESTION
// ===========================================

function nextQuestion(){

    //----------------------------------------
    // Tambah nomor soal
    //----------------------------------------

    GameState.currentQuestion++;

    //----------------------------------------
    // Sudah soal terakhir?
    //----------------------------------------

    if(GameState.currentQuestion >= questions.length){

        finishGame();

        return;

    }

    //----------------------------------------
    // Mulai soal berikutnya
    //----------------------------------------

    startQuestion();

}

   

// ===========================================
// FINISH GAME
// ===========================================

function finishGame(){

    //----------------------------------------
    // Tandai game selesai
    //----------------------------------------

    GameState.gameFinished = true;

    //----------------------------------------
    // Stop semua audio
    //----------------------------------------

    AudioManager.stop();

    AudioManager.stopBGM();

    //----------------------------------------
    // Hook Bonus Game V4
    //----------------------------------------

    const ENABLE_BONUS_GAME = false;

    if(ENABLE_BONUS_GAME){

        // nanti:
        // startBonusGame();

        return;

    }

    //----------------------------------------
    // Closing
    //----------------------------------------

    UI.showClosing();

}