// ===========================================
// GAME QUIZ V3
// UI MANAGER
// ===========================================

const UI = {

    //------------------------------------------------
    // Semua Screen
    //------------------------------------------------

    screens:{

        opening:null,

        video:null,

        audio:null,

        quiz:null,

        closing:null

    },

    //------------------------------------------------
    // Init
    //------------------------------------------------

    init(){

        this.screens.opening =
        
            document.getElementById("opening-screen");

        this.screens.video =
            document.getElementById("video-screen");

        this.screens.audio =
            document.getElementById("audio-screen");

        this.screens.quiz =
            document.getElementById("quiz-screen");

        this.screens.closing =
            document.getElementById("closing-screen");

    },

    //------------------------------------------------
    // Hide Semua Screen
    //------------------------------------------------

    hideAll(){

        Object.values(this.screens)

        .forEach(screen=>{

            if(screen){

                screen.classList.add("hidden");

            }

        });

    },

    //------------------------------------------------
    // Opening
    //------------------------------------------------

    showOpening(){

        this.hideAll();

        this.screens.opening
            .classList.remove("hidden");

    },

    //------------------------------------------------
    // Video
    //------------------------------------------------

    showVideo(){

        this.hideAll();

        this.screens.video
            .classList.remove("hidden");

    },

    //------------------------------------------------
    // Audio
    //------------------------------------------------

    showAudio(){

        this.hideAll();

        this.screens.audio
            .classList.remove("hidden");

    },

    //------------------------------------------------
    // Quiz
    //------------------------------------------------

    showQuiz(){

        this.hideAll();

        this.screens.quiz
            .classList.remove("hidden");

    },

 
    //------------------------------------------------
    // Closing / SKOR AKHIR
    //------------------------------------------------

    showClosing(){

        // Buat layar penutup jika belum tersedia
        if(!this.screens.closing){

            const closingScreen = document.createElement("div");

            closingScreen.id = "closing-screen";

            closingScreen.className = "closing-screen";

            closingScreen.style.cssText =
    "position:absolute; inset:0; width:100%; height:100%; z-index:9999; overflow-y:auto;";

            document.getElementById("game").appendChild(closingScreen);

            this.screens.closing = closingScreen;

        }

        // Hitung skor maksimal
        const maxScore = questions.reduce((total, q) => {
            return total + (Number(q.score) || 0);
        }, 0);

        // Tampilkan hasil
        this.screens.closing.innerHTML = `
            <div style="
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 24px;
                box-sizing: border-box;
                font-family: 'Baloo 2', sans-serif;
                background: linear-gradient(180deg, #FFF4B8, #FFD6E7);
                color: #47336B;
            ">

                <div style="font-size: 64px;">
                    🏆
                </div>

                <h1 style="
                    font-family: 'Fredoka', sans-serif;
                    font-size: 32px;
                    margin: 8px 0;
                ">
                    Hebat! Permainan Selesai!
                </h1>

                <p style="
                    font-size: 22px;
                    margin: 8px 0;
                ">
                    SKOR AKHIR
                </p>

                <div style="
                    font-family: 'Fredoka', sans-serif;
                    font-size: 56px;
                    font-weight: bold;
                    color: #E85D75;
                    margin: 8px 0;
                ">
                    ${formatScore(GameState.score)}
                </div>

                <p style="font-size: 18px; margin: 8px 0 24px;">
                    Skor maksimal: ${formatScore(maxScore)}
                </p>
                <div style="
    font-size: 20px;
    margin: 8px 0 20px;
">
    <p style="color: #25834B; margin: 6px;">
        ✓ Jawaban Benar: ${GameState.correctAnswers}
    </p>

    <p style="color: #C83F58; margin: 6px;">
        ✗ Jawaban Salah: ${GameState.wrongAnswers}
    </p>
</div>

                <button
                    onclick="location.reload()"
                    style="
                        font-family: 'Fredoka', sans-serif;
                        font-size: 22px;
                        font-weight: bold;
                        padding: 14px 32px;
                        border: none;
                        border-radius: 18px;
                        background: #65C98A;
                        color: white;
                        cursor: pointer;
                        box-shadow: 0 5px 0 #39965D;
                    "
                >
                    KEMBALI KE PEMBUKA
                </button>

            </div>
        `;

        // Sembunyikan layar lain
        this.hideAll();

        // Tampilkan layar skor akhir
        this.screens.closing.classList.remove("hidden");
         // Narator membacakan skor akhir
        AudioManager.stopSpeech();
        AudioManager.stop();

        setTimeout(() => {

            const skor = GameState.score;
            const maksimal = maxScore;
            const benar = GameState.correctAnswers;
            const salah = GameState.wrongAnswers;

            const narasi =
                "Permainan selesai! " +
                "Kamu dapat " + skor + " rupiah. " +
                "Jawaban benar sebanyak " + benar + " soal. " +
                "Jawaban salah sebanyak " + salah + " soal. " +
                "Hebat! Terus semangat belajar bersama Apih Bobby!";

            AudioManager.speak(narasi);

        }, 800);

    }

};

