const DB = {
    init() {
        if (!localStorage.getItem(CONFIG.STORAGE_KEY)) {
            this.resetToDefault();
        }
    },

    // ชุดข้อมูล 43 รายชื่อจริงของคุณ
    resetToDefault() {
        const initialData = [
            { id: '1', name: "ธณกร", total: 52, failed: 27, success: 25, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '2', name: "นรินทร์", total: 75, failed: 16, success: 59, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '3', name: "ปาลิดา", total: 30, failed: 2, success: 28, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '4', name: "นฤบดินทร์", total: 140, failed: 0, success: 140, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '5', name: "เพชรทักษิณ", total: 62, failed: 21, success: 41, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '6', name: "มินติยา", total: 39, failed: 1, success: 38, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '7', name: "ญาณิณ", total: 2, failed: 1, success: 1, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '8', name: "อนันทพร", total: 36, failed: 4, success: 32, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '9', name: "ชลดา", total: 18, failed: 10, success: 8, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '10', name: "วรโชติ", total: 62, failed: 9, success: 53, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '11', name: "กิตติคุณ", total: 60, failed: 13, success: 47, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '12', name: "ปัณณิชาภรณ์", total: 1, failed: 0, success: 1, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '13', name: "พรเมธี", total: 35, failed: 23, success: 12, isBlacklisted: true, blacklistReason: "ปฏิเสธการชำระเงิน COD และปิดเครื่องใส่พนักงานขนส่ง 3 ครั้งติด", logs: [] },
            { id: '14', name: "อารยา", total: 23, failed: 9, success: 14, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '15', name: "ชลธิศ", total: 47, failed: 19, success: 28, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '16', name: "ปิยะฉัตร", total: 27, failed: 7, success: 20, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '17', name: "จิรายุ", total: 52, failed: 16, success: 36, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '18', name: "แอลวิน", total: 13, failed: 13, success: 0, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '19', name: "เกศณี", total: 28, failed: 9, success: 19, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '20', name: "ระภีภัทร", total: 62, failed: 2, success: 60, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '21', name: "กีรติ", total: 27, failed: 4, success: 23, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '22', name: "ปิณณิชาภรณ์", total: 79, failed: 5, success: 74, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '23', name: "สิงหรัตน์", total: 52, failed: 8, success: 44, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '24', name: "ขติยา", total: 2, failed: 0, success: 2, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '25', name: "ธัญธร", total: 53, failed: 20, success: 33, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '26', name: "ธีรภัทร์", total: 38, failed: 8, success: 30, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '27', name: "จรรยาภรณ์", total: 73, failed: 9, success: 64, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '28', name: "กมลรัตน์", total: 19, failed: 9, success: 10, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '29', name: "อารยาพร", total: 39, failed: 15, success: 24, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '30', name: "ประภาพร", total: 60, failed: 15, success: 45, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '31', name: "นิภาพร", total: 48, failed: 24, success: 24, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '32', name: "อริษา", total: 38, failed: 13, success: 25, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '33', name: "มินทร์ลดา", total: 25, failed: 0, success: 25, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '34', name: "ปนัดดา", total: 41, failed: 0, success: 41, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '35', name: "บัญญพนธ์", total: 8, failed: 4, success: 4, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '36', name: "วันวิสา", total: 22, failed: 6, success: 16, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '37', name: "ณัฐนิชา", total: 28, failed: 12, success: 16, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '38', name: "ยาซีน", total: 49, failed: 35, success: 14, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '39', name: "ศุภวิชญ์", total: 37, failed: 17, success: 20, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '40', name: "พฤฒิตนัย", total: 32, failed: 12, success: 20, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '41', name: "ศุภชัย", total: 58, failed: 21, success: 37, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '42', name: "สิริกร", total: 2, failed: 1, success: 1, isBlacklisted: false, blacklistReason: "", logs: [] },
            { id: '43', name: "คอปเปอร์", total: 100, failed: 0, success: 100, isBlacklisted: false, blacklistReason: "", logs: [] }
        ];
        this.save(initialData);
        return initialData;
    },

    getAll() {
        return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)) || [];
    },

    save(data) {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
    },

    findByName(name) {
        const list = this.getAll();
        return list.find(item => item.name.trim().toLowerCase() === name.trim().toLowerCase());
    },

    addUser(name, successCount = 0, failedCount = 0) {
        const list = this.getAll();
        const exists = list.find(u => u.name.trim().toLowerCase() === name.trim().toLowerCase());
        if (exists) return { success: false, message: 'มีรายชื่อนี้ในระบบแล้ว' };

        const newUser = {
            id: Date.now().toString(),
            name: name.trim(),
            total: Number(successCount) + Number(failedCount),
            success: Number(successCount),
            failed: Number(failedCount),
            isBlacklisted: false,
            blacklistReason: '',
            logs: []
        };
        list.push(newUser);
        this.save(list);
        return { success: true, user: newUser };
    },

    calculateRisk(user) {
        const total = user.success + user.failed;
        const scoreRatio = total > 0 ? (user.failed / total) : 0;
        
        let level = 'LOW';
        let label = '🟢 ความเสี่ยงต่ำ (Low Risk)';
        let colorClass = 'bg-emerald-600 text-white';

        if (user.isBlacklisted || scoreRatio >= CONFIG.RISK_THRESHOLDS.HIGH) {
            level = 'HIGH';
            label = '🔴 ความเสี่ยงสูง (High Risk)';
            colorClass = 'bg-rose-600 text-white';
        } else if (scoreRatio >= CONFIG.RISK_THRESHOLDS.MEDIUM) {
            level = 'MEDIUM';
            label = '🟡 ความเสี่ยงปานกลาง (Medium Risk)';
            colorClass = 'bg-amber-500 text-white';
        }

        return { scorePercent: Math.round(scoreRatio * 100), level, label, colorClass, total };
    },

    recordDelivery(userName, type, orderId) {
        const list = this.getAll();
        const user = list.find(u => u.name === userName);
        if (!user) return null;

        if (type === 'SUCCESS') user.success += 1;
        if (type === 'FAILED') user.failed += 1;
        user.total = user.success + user.failed;

        user.logs.unshift({
            orderId: orderId || 'N/A',
            type: type,
            timestamp: new Date().toLocaleString('th-TH')
        });

        this.save(list);
        return user;
    }
};

DB.init();
