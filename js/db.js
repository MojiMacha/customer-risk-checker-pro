// 📦 ข้อมูลลูกค้ารวม 43 คน อัปเดตจากไฟล์ CSV ล่าสุด
const DEFAULT_CUSTOMERS = [
    { name: "ธณกร", success: 28, failed: 27, total: 55, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "นรินทร์", success: 59, failed: 16, total: 75, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ปาลิดา", success: 28, failed: 2, total: 30, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "นฤบดินทร์", success: 140, failed: 0, total: 140, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "เพชรทักษิณ", success: 41, failed: 21, total: 62, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "พิชชาภา", success: 85, failed: 15, total: 100, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "สุรเชษฐ์", success: 12, failed: 18, total: 30, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ชลธิชา", success: 95, failed: 5, total: 100, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "กิตติพงษ์", success: 3, failed: 12, total: 15, isBlacklisted: true, blacklistReason: "ปฏิเสธการชำระเงิน COD หลายครั้ง", logs: [] },
    { name: "ณิชารีย์", success: 60, failed: 4, total: 64, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ภานุวัฒน์", success: 110, failed: 2, total: 112, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ศิริพร", success: 45, failed: 15, total: 60, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "อนันดา", success: 30, failed: 30, total: 60, isBlacklisted: true, blacklistReason: "ติดต่อไม่ได้ ตีกลับบ่อยครั้ง", logs: [] },
    { name: "วรรณิสา", success: 88, failed: 12, total: 100, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ธีรเดช", success: 200, failed: 5, total: 205, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "พรทิพย์", success: 15, failed: 35, total: 50, isBlacklisted: true, blacklistReason: "ยกเลิกออเดอร์กลางทางบ่อยครั้ง", logs: [] },
    { name: "เอกชัย", success: 72, failed: 8, total: 80, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "กนกวรรณ", success: 50, failed: 50, total: 100, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ชัยวัฒน์", success: 130, failed: 10, total: 140, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "มณีรัตน์", success: 40, failed: 3, total: 43, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ปรีชา", success: 9, failed: 21, total: 30, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ศิรินทิพย์", success: 105, failed: 15, total: 120, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "สมชาย", success: 500, failed: 20, total: 520, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "วิภาวี", success: 18, failed: 2, total: 20, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "เกียรติศักดิ์", success: 250, failed: 0, total: 250, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "อารยา", success: 320, failed: 5, total: 325, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ณเดชน์", success: 180, failed: 10, total: 190, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "อุรัสยา", success: 210, failed: 0, total: 210, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "มาริโอ้", success: 95, failed: 15, total: 110, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ดาวิกา", success: 160, failed: 2, total: 162, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "พัชราภา", success: 400, failed: 1, total: 401, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ปริญ", success: 85, failed: 25, total: 110, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ราณี", success: 290, failed: 3, total: 293, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "จิรายุ", success: 175, failed: 12, total: 187, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ธนภพ", success: 65, failed: 5, total: 70, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "พุฒิชัย", success: 120, failed: 18, total: 138, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "พิธา", success: 350, failed: 10, total: 360, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "แพทองธาร", success: 230, failed: 20, total: 250, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "อนุทิน", success: 140, failed: 30, total: 170, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "ชลน่าน", success: 45, failed: 35, total: 80, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "สุรชัย", success: 190, failed: 8, total: 198, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "จินตหรา", success: 80, failed: 2, total: 82, isBlacklisted: false, blacklistReason: "", logs: [] },
    { name: "พงษ์สิทธิ์", success: 310, failed: 15, total: 325, isBlacklisted: false, blacklistReason: "", logs: [] }
];

const DB = {
    KEY: 'delivery_risk_db_v2',

    getAll() {
        const data = localStorage.getItem(this.KEY);
        if (!data) {
            // ถ้าไม่เจอข้อมูล ให้ดึงชุดข้อมูล 43 คนล่าสุดไปใช้ทันที
            this.save(DEFAULT_CUSTOMERS);
            return DEFAULT_CUSTOMERS;
        }
        return JSON.parse(data);
    },

    save(data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    },

    resetToDefault() {
        this.save(DEFAULT_CUSTOMERS);
        return DEFAULT_CUSTOMERS;
    },

    findByName(name) {
        const users = this.getAll();
        return users.find(u => u.name.trim().toLowerCase() === name.trim().toLowerCase());
    },

    calculateRisk(user) {
        if (!user || user.total === 0) return { label: 'ไม่มีข้อมูล', level: 'LOW', colorClass: 'bg-slate-100 text-slate-600' };
        if (user.isBlacklisted) return { label: 'แบล็กลิสต์ (เสี่ยงสูงสุด)', level: 'CRITICAL', colorClass: 'bg-rose-600 text-white font-bold' };
        
        const failRate = (user.failed / user.total) * 100;
        if (failRate >= 40 || user.failed >= 20) return { label: 'เสี่ยงสูง (High Risk)', level: 'HIGH', colorClass: 'bg-rose-100 text-rose-700 font-bold' };
        if (failRate >= 15 || user.failed >= 5) return { label: 'เสี่ยงปานกลาง (Medium Risk)', level: 'MEDIUM', colorClass: 'bg-amber-100 text-amber-700 font-bold' };
        return { label: 'เสี่ยงต่ำ (Low Risk)', level: 'LOW', colorClass: 'bg-emerald-100 text-emerald-700 font-bold' };
    },

    recordDelivery(userName, type, orderId = '', extra = {}) {
        const users = this.getAll();
        const user = users.find(u => u.name === userName);
        if (!user) return;

        if (type === 'SUCCESS') user.success++;
        else if (type === 'FAILED') user.failed++;
        user.total = user.success + user.failed;

        if (!user.logs) user.logs = [];
        user.logs.unshift({
            id: orderId,
            type: type,
            date: new Date().toLocaleString('th-TH'),
            gps: extra.gps || null,
            podImg: extra.podImg || null
        });

        this.save(users);
    }
};
