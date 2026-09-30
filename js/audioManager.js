
// ===========================================
// GAME QUIZ V3
// AUDIO MANAGER
// ===========================================

const AudioManager = {

    currentAudio : null,

    bgm : null,

    initialized : false,
    // Kontrol narator TTS
    speechSession : 0,
    currentUtterance : null,
    currentSpeechResolve : null,

    //------------------------------------------------
    // INIT
    //------------------------------------------------

    init(){

        if(this.initialized) return;

        this.bgm = new Audio(CONFIG.AUDIO.bgm);

        this.bgm.loop = true;

        this.bgm.volume =
            CONFIG.VOLUME.bgm;

        this.initialized = true;

    },

    //------------------------------------------------
    // STOP CURRENT AUDIO
    //------------------------------------------------

    stop(){

    if(this.currentAudio){

        this.currentAudio.pause();

        this.currentAudio.currentTime = 0;

        this.currentAudio = null;

    }

},

    //------------------------------------------------
    // PLAY FILE
    //------------------------------------------------

    play(file){

    return new Promise((resolve)=>{

        this.stop();

        this.currentAudio = new Audio(file);

        this.currentAudio.volume =
            CONFIG.VOLUME.effect;

        this.currentAudio.onended = ()=>{

            resolve();

        };

        this.currentAudio.onerror = ()=>{

            console.log(
                "Audio tidak ditemukan:",
                file
            );

            resolve();

        };

        this.currentAudio.play().catch(err=>{

            console.log(
                "Play audio gagal:",
                err
            );

            resolve();

        });

    });

},

    //------------------------------------------------
    // PLAY BGM
    //------------------------------------------------

    playBGM(){

        if(!this.bgm) return;

        if(GameState.bgmPlaying) return;

        this.bgm.volume =
            CONFIG.VOLUME.bgm;

        this.bgm.play();

        GameState.bgmPlaying = true;

    },

    //------------------------------------------------
    // STOP BGM
    //------------------------------------------------

    stopBGM(){

        if(!this.bgm) return;

        this.bgm.pause();

        this.bgm.currentTime = 0;

        GameState.bgmPlaying = false;

    },

    //------------------------------------------------
    // VIDEO INTRO
    //------------------------------------------------

    async videoIntro(){

        await this.play(
            CONFIG.AUDIO.videoIntro
        );

    },

    //------------------------------------------------
    // VIDEO OUTRO
    //------------------------------------------------

    async videoOutro(){

        await this.play(
            CONFIG.AUDIO.videoOutro
        );

    },

    //------------------------------------------------
    // AUDIO INTRO
    //------------------------------------------------

    async audioIntro(){

        await this.play(
            CONFIG.AUDIO.audioIntro
        );

    },

    //------------------------------------------------
    // AUDIO OUTRO
    //------------------------------------------------

    async audioOutro(){

        await this.play(
            CONFIG.AUDIO.audioOutro
        );

    },

    //------------------------------------------------
    // BENAR
    //------------------------------------------------

    async correct(){

        await this.play(
            CONFIG.AUDIO.correct
        );

    },

    //------------------------------------------------
    // SALAH
    //------------------------------------------------

    async wrong(){

        await this.play(
            CONFIG.AUDIO.wrong
        );

    },

    //------------------------------------------------
// STOP TTS NARATOR
//------------------------------------------------

stopSpeech(){

    // Batalkan sesi pembacaan sebelumnya
    this.speechSession++;

    // Hentikan narator TTS
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    this.currentUtterance = null;

    // Lepaskan proses yang sedang menunggu
    if (this.currentSpeechResolve) {
        const resolve = this.currentSpeechResolve;
        this.currentSpeechResolve = null;
        resolve();
    }

},

    //------------------------------------------------
    // TTS BAWAAN HP / BROWSER
    //------------------------------------------------

    speak(text){

    return new Promise((resolve)=>{

        if (!("speechSynthesis" in window)) {
            resolve();
            return;
        }

        // Selesaikan pembacaan sebelumnya jika masih menunggu
        if (this.currentSpeechResolve) {
            const oldResolve = this.currentSpeechResolve;
            this.currentSpeechResolve = null;
            oldResolve();
        }

        window.speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(text);

        utterance.lang = /[\u0600-\u06FF]/.test(text) ? "ar-SA" : "id-ID";
        utterance.rate = 0.85;
        utterance.pitch = 1;
        utterance.volume = 1;

        let selesai = false;

        const finish = () => {
            if (selesai) return;
            selesai = true;

            if (this.currentUtterance === utterance) {
                this.currentUtterance = null;
                this.currentSpeechResolve = null;
            }

            resolve();
        };

        this.currentUtterance = utterance;
        this.currentSpeechResolve = finish;

        utterance.onend = finish;
        utterance.onerror = finish;

        window.speechSynthesis.speak(utterance);

    });

},

    //------------------------------------------------
    // TTS SOAL DAN PILIHAN JAWABAN
    //------------------------------------------------

    async question(id){

    const q = currentQuestion();

    if (!q) return;

    const session = this.speechSession;

    // Bacakan soal
    await this.speak(q.question);

    if (session !== this.speechSession) return;

    // Jeda singkat
    await new Promise(resolve =>
        setTimeout(resolve, 400)
    );

    if (session !== this.speechSession) return;

    // Bacakan A, B, C
    const huruf = ["A", "B", "C"];

    for (let i = 0; i < q.answers.length; i++) {

        if (session !== this.speechSession) return;

        await this.speak(
            huruf[i] + ". " + q.answers[i]
        );

        if (session !== this.speechSession) return;

        await new Promise(resolve =>
            setTimeout(resolve, 250)
        );

    }

},

    //------------------------------------------------
    // TTS JAWABAN YANG BENAR
    //------------------------------------------------

    async answer(id){

        const q = currentQuestion();

        if(!q) return;

        const huruf = ["A", "B", "C"];

        const teksJawaban =
            "Jawaban yang benar adalah " +
            huruf[q.correct] +
            ". " +
            q.answers[q.correct];

        await this.speak(teksJawaban);

    }
};

AudioManager.init();