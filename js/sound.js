// ==========================================
// 🔊 Delivery Risk Pro - Sound System
// js/sound.js
// ==========================================

const SoundSystem = {

    paths: {
        // 🔴 ความเสี่ยง / แบล็กลิสต์
        blacklist: 'sounds/ghots.mp3',
        high_risk: 'sounds/ghots.mp3',

        // 🟠 ความเสี่ยงปานกลาง
        medium_risk: 'sounds/ohno.mp3',

        // 🟢 ความเสี่ยงต่ำ
        low_risk: 'sounds/meng.mp3',

        // ❌ PIN ผิด
        wrong_pin: 'sounds/stupid.mp3',

        // ✅ ส่งสำเร็จ
        success: 'sounds/meng.mp3',

        // ❌ ตีกลับ / ปฏิเสธ
        failed: 'sounds/failed.mp3'
    },

    audioUnlocked: false,

    /**
     * ปลดล็อกเสียงจากการกระทำของผู้ใช้
     */
    initAudioContext() {

        try {

            if (
                window.AudioContext ||
                window.webkitAudioContext
            ) {

                const AudioContext =
                    window.AudioContext ||
                    window.webkitAudioContext;

                if (!this.audioContext) {
                    this.audioContext =
                        new AudioContext();
                }

                if (
                    this.audioContext.state === 'suspended'
                ) {

                    this.audioContext.resume();

                }

                this.audioUnlocked = true;

            }

        } catch (error) {

            console.warn(
                'ไม่สามารถเริ่ม AudioContext:',
                error
            );

        }

    },


    /**
     * เล่นเสียงตามประเภท
     */
    play(soundType) {

        const path =
            this.paths[soundType];

        if (!path) {

            console.warn(
                `ไม่พบประเภทเสียง: ${soundType}`
            );

            return;

        }

        console.log(
            `🔊 กำลังเล่นเสียง: ${soundType} → ${path}`
        );


        const audio =
            new Audio(path);


        audio.preload = 'auto';

        audio.volume = 1.0;


        audio.currentTime = 0;


        const playPromise =
            audio.play();


        if (
            playPromise !== undefined
        ) {

            playPromise
                .then(() => {

                    console.log(
                        `✅ เล่นเสียงสำเร็จ: ${path}`
                    );

                })
                .catch(error => {

                    console.warn(
                        `❌ เล่นเสียงไม่ได้: ${path}`,
                        error
                    );

                    console.warn(
                        'ตรวจสอบว่าไฟล์อยู่ในโฟลเดอร์ sounds หรือไม่'
                    );

                });

        }

    },


    /**
     * เล่นเสียงตามระดับความเสี่ยง
     */
    playByRisk(user, riskLevel) {

        if (!user) return;


        if (user.isBlacklisted) {

            this.play('blacklist');

        }

        else if (riskLevel === 'HIGH') {

            this.play('high_risk');

        }

        else if (riskLevel === 'MEDIUM') {

            this.play('medium_risk');

        }

        else {

            this.play('low_risk');

        }

    }

};


/**
 * ฟังก์ชันกลางสำหรับเรียกจาก HTML
 */
function playSound(type) {

    if (
        typeof SoundSystem !== 'undefined'
    ) {

        SoundSystem.play(type);

    }

}


/**
 * ปลดล็อกเสียงเมื่อผู้ใช้แตะ/คลิกครั้งแรก
 */
document.addEventListener(
    'click',
    function unlockSoundOnce() {

        if (
            typeof SoundSystem !== 'undefined'
        ) {

            SoundSystem.initAudioContext();

        }

        document.removeEventListener(
            'click',
            unlockSoundOnce
        );

    },
    {
        once: true
    }
);


/**
 * รองรับการกดแป้นพิมพ์
 */
document.addEventListener(
    'keydown',
    function unlockSoundKeyboard() {

        if (
            typeof SoundSystem !== 'undefined'
        ) {

            SoundSystem.initAudioContext();

        }

        document.removeEventListener(
            'keydown',
            unlockSoundKeyboard
        );

    },
    {
        once: true
    }
);
