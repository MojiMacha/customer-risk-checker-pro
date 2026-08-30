// ==========================================
// 🔊 ระบบจัดการเสียงแจ้งเตือน
// Delivery Risk Pro
// ==========================================

const SoundSystem = {

    // ==========================================
    // 🎵 ตำแหน่งไฟล์เสียง
    // ==========================================

    paths: {

        // 🚨 ลูกค้าติด Blacklist
        blacklist: 'sounds/ghots.mp3',

        // 🔴 ความเสี่ยงสูง
        high_risk: 'sounds/ghots.mp3',

        // 🟠 ความเสี่ยงปานกลาง
        medium_risk: 'sounds/ohno.mp3',

        // 🟢 ความเสี่ยงต่ำ
        low_risk: 'sounds/meng.mp3',

        // ❌ PIN ไม่ถูกต้อง
        wrong_pin: 'sounds/stupid.mp3',

        // 🟢 ส่งสำเร็จ
        success: 'sounds/meng.mp3',

        // 🔴 ตีกลับ / ปฏิเสธ
        failed: 'sounds/ghots.mp3'
    },


    // ==========================================
    // 🔊 เล่นเสียง
    // ==========================================

    play(soundType) {

        const path = this.paths[soundType];

        // ตรวจสอบว่ามีประเภทเสียงหรือไม่
        if (!path) {

            console.warn(
                `[SoundSystem] ไม่พบเสียงประเภท: ${soundType}`
            );

            return;
        }


        try {

            const audio = new Audio();

            audio.src = path;

            audio.preload = 'auto';

            audio.currentTime = 0;


            const playPromise = audio.play();


            // Browser บางตัวจะคืน Promise
            if (playPromise !== undefined) {

                playPromise.catch(error => {

                    console.warn(
                        `[SoundSystem] ไม่สามารถเล่นเสียง ${soundType}:`,
                        error
                    );

                });

            }

        }
        catch (error) {

            console.error(
                `[SoundSystem] เกิดข้อผิดพลาดในการเล่นเสียง:`,
                error
            );

        }

    },


    // ==========================================
    // 🚨 เล่นเสียงตามระดับความเสี่ยง
    // ==========================================

    playByRisk(user, riskLevel) {

        if (!user) {
            console.warn(
                '[SoundSystem] ไม่พบข้อมูลลูกค้า'
            );

            return;
        }


        // 🚨 Blacklist มีความสำคัญสูงสุด
        if (user.isBlacklisted) {

            this.play('blacklist');

            return;
        }


        // 🔴 HIGH
        if (riskLevel === 'HIGH') {

            this.play('high_risk');

            return;
        }


        // 🟠 MEDIUM
        if (riskLevel === 'MEDIUM') {

            this.play('medium_risk');

            return;
        }


        // 🟢 LOW
        this.play('low_risk');

    }

};


// ==========================================
// 🔗 ฟังก์ชันสำหรับเรียกจาก HTML
// ==========================================

function playSound(type) {

    if (
        typeof SoundSystem !== 'undefined'
        &&
        typeof SoundSystem.play === 'function'
    ) {

        SoundSystem.play(type);

    }
    else {

        console.warn(
            '[SoundSystem] ระบบเสียงยังไม่พร้อมใช้งาน'
        );

    }

}
