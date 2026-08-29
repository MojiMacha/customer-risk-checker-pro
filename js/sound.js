// ==========================================
// 🔊 ระบบจัดการเสียงแจ้งเตือน (js/sound.js)
// ==========================================

const SoundSystem = {
    // 💡 กำหนด Path ของไฟล์เสียง .mp3 ในโฟลเดอร์ sounds/
    // (สามารถเปลี่ยนชื่อไฟล์ตรงนี้ได้ตามที่ตั้งไว้จริง)
  paths: {
    blacklist: 'sounds/blacklist.mp3',   // ส่งผีหรอไอ้ควาย.mp3
    high_risk: 'sounds/high_risk.mp3',   // ไอ้สัสทำงาน.mp3
    medium_risk: 'sounds/medium_risk.mp3', // เหี้ยละไอ้สัสเอ้ย.mp3
    low_risk: 'sounds/low_risk.mp3',     // เป้าหมายคือหมื่น.mp3
    wrong_pin: 'sounds/wrong_pin.mp3',   // โง่ชิบหาย.mp3
    success: 'sounds/success.mp3',
    failed: 'sounds/failed.mp3'
}

    // ฟังก์ชันสำหรับเล่นเสียง
    play(soundType) {
        const path = this.paths[soundType];
        if (path) {
            const audio = new Audio(path);
            audio.play().catch(err => {
                console.log('เบราว์เซอร์บล็อกการเล่นเสียงอัตโนมัติ:', err);
            });
        }
    },

    // ฟังก์ชันเล่นเสียงตามระดับความเสี่ยงของลูกค้า
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

// ฟังก์ชันทางลัด (Shortcut) สำหรับเรียกใช้จาก HTML ได้สะดวก
function playSound(type) {
    SoundSystem.play(type);
}
