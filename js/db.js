// ==========================================
// 📦 ระบบจัดการฐานข้อมูลจำลอง (js/db.js)
// ==========================================

const STORAGE_KEY = 'delivery_risk_db_v1';

// 📋 รายชื่อข้อมูลตั้งต้น (43 รายชื่อ)
const initialUserData = [
    { id: 1, name: "ธณกร", success: 28, failed: 27, total: 55, isBlacklisted: false, blacklistReason: "" },
    { id: 2, name: "นรินทร์", success: 59, failed: 16, total: 75, isBlacklisted: false, blacklistReason: "" },
    { id: 3, name: "ปาลิดา", success: 28, failed: 2, total: 30, isBlacklisted: false, blacklistReason: "" },
    { id: 4, name: "นฤบดินทร์", success: 140, failed: 0, total: 140, isBlacklisted: false, blacklistReason: "" },
    { id: 5, name: "เพชรทักษิณ", success: 41, failed: 21, total: 62, isBlacklisted: false, blacklistReason: "" },
    { id: 6, name: "มินติยา", success: 38, failed: 1, total: 39, isBlacklisted: false, blacklistReason: "" },
    { id: 7, name: "ญาณิณ", success: 1, failed: 1, total: 2, isBlacklisted: false, blacklistReason: "" },
    { id: 8, name: "อนันทพร", success: 32, failed: 4, total: 36, isBlacklisted: false, blacklistReason: "" },
    { id: 9, name: "ชลดา", success: 8, failed: 10, total: 18, isBlacklisted: false, blacklistReason: "" },
    { id: 10, name: "วรโชติ", success: 53, failed: 9, total: 62, isBlacklisted: false, blacklistReason: "" },
    { id: 11, name: "กิตติคุณ", success: 47, failed: 13, total: 60, isBlacklisted: false, blacklistReason: "" },
    { id: 12, name: "ปัณณิชาภรณ์", success: 1, failed: 0, total: 1, isBlacklisted: false, blacklistReason: "" },
    { id: 13, name: "พรเมธี", success: 12, failed: 23, total: 35, isBlacklisted: true, blacklistReason: "ปฏิเสธการชำระเงิน COD และปิดเครื่องใส่พนักงานขนส่ง 3 ครั้งติด" },
    { id: 14, name: "อารยา", success: 14, failed: 9, total: 23, isBlacklisted: false, blacklistReason: "" },
    { id: 15, name: "ชลธิศ", success: 28, failed: 19, total: 47, isBlacklisted: false, blacklistReason: "" },
    { id: 16, name: "ปิยะฉัตร", success: 20, failed: 7, total: 27, isBlacklisted: false, blacklistReason: "" },
    { id: 17, name: "จิรายุ", success: 36, failed: 16, total: 52, isBlacklisted: false, blacklistReason: "" },
    { id: 18, name: "แอลวิน", success: 0, failed: 13, total: 13, isBlacklisted: false, blacklistReason: "" },
    { id: 19, name: "เกศณี", success: 19, failed: 9, total: 28, isBlacklisted: false, blacklistReason: "" },
    { id: 20, name: "ระภีภัทร", success: 60, failed: 2, total: 62, isBlacklisted: false, blacklistReason: "" },
    { id: 21, name: "กีรติ", success: 23, failed: 4, total: 27, isBlacklisted: false, blacklistReason: "" },
    { id: 22, name: "ปิณณิชาภรณ์", success: 74, failed: 5, total: 79, isBlacklisted: false, blacklistReason: "" },
    { id: 23, name: "สิงหรัตน์", success: 44, failed: 8, total: 52, isBlacklisted: false, blacklistReason: "" },
    { id: 24, name: "ขติยา", success: 2, failed: 0, total: 2, isBlacklisted: false, blacklistReason: "" },
    { id: 25, name: "ธัญธร", success: 33, failed: 20, total: 53, isBlacklisted: false, blacklistReason: "" },
    { id: 26, name: "ธีรภัทร์", success: 30, failed: 8, total: 38, isBlacklisted: false, blacklistReason: "" },
    { id: 27, name: "จรรยาภรณ์", success: 64, failed: 9, total: 73, isBlacklisted: false, blacklistReason: "" },
    { id: 28, name: "กมลรัตน์", success: 10, failed: 9, total: 19, isBlacklisted: false, blacklistReason: "" },
    { id: 29, name: "อารยาพร", success: 24, failed: 15, total: 39, isBlacklisted: false, blacklistReason: "" },
    { id: 30, name: "ประภาพร", success: 45, failed: 15, total: 60, isBlacklisted: false, blacklistReason: "" },
    { id: 31, name: "นิภาพร", success: 24, failed: 24, total: 48, isBlacklisted: false, blacklistReason: "" },
    { id: 32, name: "อริษา", success: 25, failed: 13, total: 38, isBlacklisted: false, blacklistReason: "" },
    { id: 33, name: "มินทร์ลดา", success: 25, failed: 0, total: 25, isBlacklisted: false, blacklistReason: "" },
    { id: 34, name: "ปนัดดา", success: 41, failed: 0, total: 41, isBlacklisted: false, blacklistReason: "" },
    { id: 35, name: "บัญญพนธ์", success: 4, failed: 4, total: 8, isBlacklisted: false, blacklistReason: "" },
    { id: 36, name: "วันวิสา", success: 16, failed: 6, total: 22, isBlacklisted: false, blacklistReason: "" },
    { id: 37, name: "ณัฐนิชา", success: 16, failed: 12, total: 28, isBlacklisted: false, blacklistReason: "" },
    { id: 38, name: "ยาซีน", success: 14, failed: 35, total: 49, isBlacklisted: false, blacklistReason: "" },
    { id: 39, name: "ศุภวิชญ์", success: 20, failed: 17, total: 37, isBlacklisted: false, blacklistReason: "" },
    { id: 40, name: "พฤฒิตนัย", success: 20, failed: 12, total: 32, isBlacklisted: false, blacklistReason: "" },
    { id: 41, name: "ศุภชัย", success: 37, failed: 21, total: 58, isBlacklisted: false, blacklistReason: "" },
    { id: 42, name: "สิริกร", success: 1, failed: 1, total: 2, isBlacklisted: false, blacklistReason: "" },
    { id: 43, name: "คอปเปอร์", success: 100, failed: 0, total: 100, isBlacklisted: false, blacklistReason: "" }
];

const DB = {
    // 📖 ดึงข้อมูลทั้งหมด
    getAll() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            this.save(initialUserData);
            return initialUserData;
        }
        return JSON.parse(data);
    },

    // 💾 บันทึกข้อมูลลง LocalStorage
    save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    // 🔍 ค้นหาตามชื่อผู้รับ
    findByName(name) {
        const list = this.getAll();
        return list.find(u => u.name.trim().toLowerCase() === name.trim().toLowerCase());
    },

    // 📊 คำนวณระดับความเสี่ยงอัตโนมัติ
    calculateRisk(user) {
        if (!user) return { level: 'LOW', label: '🟢 ความเสี่ยงต่ำ', colorClass: 'bg-emerald-100 text-emerald-700 border-emerald-300' };

        if (user.isBlacklisted) {
            return { level: 'HIGH', label: '🔴 ติดแบล็กลิสต์', colorClass: 'bg-rose-100 text-rose-700 border-rose-300 font-bold' };
        }

        const total = user.total || (user.success + user.failed);
        if (total === 0) {
            return { level: 'LOW', label: '🟢 ความเสี่ยงต่ำ (ไม่มีประวัติ)', colorClass: 'bg-emerald-100 text-emerald-700 border-emerald-300' };
        }

        const failRate = (user.failed / total) * 100;

        if (failRate >= 40 || user.failed >= 10) {
            return { level: 'HIGH', label: '🔴 ความเสี่ยงสูง (High Risk)', colorClass: 'bg-rose-100 text-rose-700 border-rose-300 font-bold' };
        } else if (failRate >= 20 || user.failed >= 5) {
            return { level: 'MEDIUM', label: '🟡 ความเสี่ยงปานกลาง (Medium Risk)', colorClass: 'bg-amber-100 text-amber-700 border-amber-300' };
        } else {
            return { level: 'LOW', label: '🟢 ความเสี่ยงต่ำ (Low Risk)', colorClass: 'bg-emerald-100 text-emerald-700 border-emerald-300' };
        }
    },

    // 📝 อัปเดตประวัติการจัดส่ง (กดส่งสำเร็จ / ตีกลับ)
    recordDelivery(userName, type, orderId = '') {
        const list = this.getAll();
        let user = list.find(u => u.name.trim().toLowerCase() === userName.trim().toLowerCase());

        if (!user) {
            user = {
                id: Date.now(),
                name: userName,
                success: 0,
                failed: 0,
                total: 0,
                isBlacklisted: false,
                blacklistReason: '',
                logs: []
            };
            list.push(user);
        }

        if (!user.logs) user.logs = [];

        if (type === 'SUCCESS') {
            user.success++;
        } else if (type === 'FAILED') {
            user.failed++;
        }

        user.total = user.success + user.failed;

        // บันทึกประวัติ Timestamp
        user.logs.unshift({
            type: type,
            orderId: orderId || ('ORD-' + Date.now().toString().slice(-4)),
            timestamp: new Date().toLocaleString('th-TH')
        });

        this.save(list);
        return user;
    },

    // 🔄 รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น
    resetToDefault() {
        this.save(initialUserData);
        return initialUserData;
    }
};
