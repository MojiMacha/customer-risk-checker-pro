const DB = {
    init() {
        if (!localStorage.getItem(CONFIG.STORAGE_KEY)) {
            const initialData = [
                { id: '1', name: 'ธณกร', total: 52, failed: 27, success: 25, isBlacklisted: false, blacklistReason: '', logs: [] },
                { id: '2', name: 'นรินทร์', total: 75, failed: 16, success: 59, isBlacklisted: false, blacklistReason: '', logs: [] },
                { id: '3', name: 'พรเมธี', total: 35, failed: 23, success: 12, isBlacklisted: true, blacklistReason: 'ปฏิเสธชำระเงิน COD', logs: [] }
            ];
            this.save(initialData);
        }
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

        return { 
            scorePercent: Math.round(scoreRatio * 100), 
            level, 
            label, 
            colorClass, 
            total 
        };
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
