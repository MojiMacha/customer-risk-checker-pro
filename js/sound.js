// ==========================================
// 🔊 ระบบจัดการเสียงแจ้งเตือน (js/sound.js)
// ==========================================

const SoundSystem = {
    audioContext: null,

    initAudioContext() {
        if (!this.audioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioContext = new AudioContext();
            }
        }
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    },

    play(type) {
        this.initAudioContext();

        let soundPath = '';

        if (type === 'SUCCESS' || type === 'success') {
            soundPath = 'meng.mp3';
        } else if (type === 'FAILED' || type === 'failed' || type === 'returned') {
            // สุ่มเลือกระหว่าง ghost.mp3 กับ working.mp3 (50/50)
            const sounds = ['ghost.mp3', 'working.mp3'];
            const randomIndex = Math.floor(Math.random() * sounds.length);
            soundPath = sounds[randomIndex];
        } else if (type === 'wrong_pin') {
            soundPath = 'ghost.mp3';
        }

        if (soundPath) {
            const audio = new Audio(soundPath);
            audio.play().catch(err => {
                console.warn(`ไม่สามารถเล่นไฟล์เสียง ${soundPath} ได้:`, err);
            });
        }
    }
};

function playSound(type) {
    SoundSystem.play(type);
}
