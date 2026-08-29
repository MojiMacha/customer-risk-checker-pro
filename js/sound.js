// ==========================================
// 🔊 ระบบจัดการเสียงแจ้งเตือน (js/sound.js)
// ==========================================

const SoundSystem = {
    pathsว {
        blacklist: 'sounds/ghost.mp3',
        high_risk: 'sounds/ghost.mp3',
        medium_risk: 'sounds/ohno.mp3',
        low_risk: 'sounds/meng.mp3',
        wrong_pin: 'sounds/stupid.mp3',
        success: 'sounds/success.mp3',
        failed: 'sounds/failed.mp3'
    },

    play(soundType) {
        const path = this.paths[soundType];
        if (path) {
            const audio = new Audio(path);
            audio.play().catch(err => {
                console.log('เบราว์เซอร์บล็อกการเล่นเสียงอัตโนมัติ:', err);
            });
        } else {
            console.warn(`ไม่พบไฟล์เสียงสำหรับ: ${soundType}`);
        }
    },

    playByRisk(user, riskLevel) {
        if (!user) return;
        if (user.isBlacklisted) {
            this.play('blacklist');
        } else if (riskLevel === 'HIGH') {
            this.play('high_risk');
        } else if (riskLevel === 'MEDIUM') {
            this.play('medium_risk');
        } else {
            this.play('low_risk');
        }
    }
};

function playSound(type) {
    SoundSystem.play(type);
}
