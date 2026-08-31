```javascript
/* =========================================================
   DELIVERY RISK MARKET
   discounts.js
   ระบบคูปอง / ส่วนลดสินค้า
   ========================================================= */

/*
    รูปแบบส่วนลดที่รองรับ

    type: "fixed"
    = ลดเป็นจำนวนเงิน เช่น ลด 50 บาท

    type: "percent"
    = ลดเป็นเปอร์เซ็นต์ เช่น ลด 10%

    type: "shipping"
    = ส่วนลดค่าจัดส่ง / ส่งฟรี

    =========================================================
    ตัวอย่าง

    {
        code: "WELCOME50",
        name: "ส่วนลดสมาชิกใหม่",
        type: "fixed",
        value: 50,
        minimum: 300,
        maxDiscount: null,
        usageLimit: 100,
        usedCount: 0,
        expiresAt: "2026-12-31T23:59:59",
        active: true
    }
*/


const discounts = [

    /* =====================================================
       1. WELCOME50
       ลด 50 บาท
    ===================================================== */

    {
        code: "WELCOME50",
        name: "ส่วนลดสมาชิกใหม่",
        description: "ลดทันที 50 บาท เมื่อซื้อครบ 300 บาท",

        type: "fixed",

        value: 50,

        minimum: 300,

        maxDiscount: null,

        usageLimit: 1000,

        usedCount: 0,

        expiresAt: "2026-12-31T23:59:59",

        active: true
    },


    /* =====================================================
       2. SAVE10
       ลด 10%
    ===================================================== */

    {
        code: "SAVE10",
        name: "ลด 10%",
        description: "ลด 10% เมื่อซื้อครบ 500 บาท",

        type: "percent",

        value: 10,

        minimum: 500,

        maxDiscount: 300,

        usageLimit: 500,

        usedCount: 0,

        expiresAt: "2026-12-31T23:59:59",

        active: true
    },


    /* =====================================================
       3. SAVE100
       ลด 100 บาท
    ===================================================== */

    {
        code: "SAVE100",
        name: "ลด 100 บาท",
        description: "ลด 100 บาท เมื่อซื้อครบ 1,000 บาท",

        type: "fixed",

        value: 100,

        minimum: 1000,

        maxDiscount: null,

        usageLimit: 300,

        usedCount: 0,

        expiresAt: "2026-12-31T23:59:59",

        active: true
    },


    /* =====================================================
       4. FREESHIP
       ส่งฟรี
    ===================================================== */

    {
        code: "FREESHIP",
        name: "ส่งฟรี",
        description: "ฟรีค่าจัดส่ง เมื่อซื้อครบ 300 บาท",

        type: "shipping",

        value: 0,

        minimum: 300,

        maxDiscount: null,

        usageLimit: 1000,

        usedCount: 0,

        expiresAt: "2026-12-31T23:59:59",

        active: true
    },


    /* =====================================================
       5. NEWUSER
       ลด 15%
    ===================================================== */

    {
        code: "NEWUSER",
        name: "ส่วนลดผู้ใช้ใหม่",
        description: "ลด 15% สำหรับผู้ใช้ใหม่",

        type: "percent",

        value: 15,

        minimum: 200,

        maxDiscount: 200,

        usageLimit: 500,

        usedCount: 0,

        expiresAt: "2026-12-31T23:59:59",

        active: true
    },


    /* =====================================================
       6. MARKET50
       ลด 50 บาท
    ===================================================== */

    {
        code: "MARKET50",
        name: "Marketplace Deal",
        description: "ลด 50 บาท เมื่อซื้อครบ 700 บาท",

        type: "fixed",

        value: 50,

        minimum: 700,

        maxDiscount: null,

        usageLimit: 500,

        usedCount: 0,

        expiresAt: "2026-12-31T23:59:59",

        active: true
    }

];


/* =========================================================
   NORMALIZE CODE
   ========================================================= */

function normalizeDiscountCode(code) {

    return String(code || "")
        .trim()
        .toUpperCase();

}


/* =========================================================
   GET ALL DISCOUNTS
   ========================================================= */

function getDiscounts() {

    return Array.isArray(discounts)
        ? discounts
        : [];

}


/* =========================================================
   FIND DISCOUNT
   ========================================================= */

function getDiscountByCode(code) {

    const normalizedCode =
        normalizeDiscountCode(code);

    if (!normalizedCode) {
        return null;
    }

    return getDiscounts().find(
        discount =>
            normalizeDiscountCode(discount.code) ===
            normalizedCode
    ) || null;

}


/* =========================================================
   CHECK ACTIVE
   ========================================================= */

function isDiscountActive(discount) {

    if (!discount) {
        return false;
    }

    if (discount.active !== true) {
        return false;
    }

    /* ตรวจจำนวนครั้งที่ใช้ */

    if (
        Number(discount.usageLimit) > 0 &&
        Number(discount.usedCount || 0) >=
        Number(discount.usageLimit)
    ) {

        return false;

    }


    /* ตรวจวันหมดอายุ */

    if (discount.expiresAt) {

        const expiry =
            new Date(discount.expiresAt);

        if (
            !isNaN(expiry.getTime()) &&
            new Date() > expiry
        ) {

            return false;

        }

    }


    return true;

}


/* =========================================================
   VALIDATE DISCOUNT
   ========================================================= */

function validateDiscount(code, subtotal) {

    const normalizedCode =
        normalizeDiscountCode(code);

    const amount =
        Number(subtotal) || 0;


    /* ไม่มีโค้ด */

    if (!normalizedCode) {

        return {

            success: false,

            code: "EMPTY_CODE",

            message: "กรุณากรอกรหัสส่วนลด"

        };

    }


    /* หาโค้ด */

    const discount =
        getDiscountByCode(normalizedCode);


    if (!discount) {

        return {

            success: false,

            code: "NOT_FOUND",

            message: "ไม่พบรหัสส่วนลดนี้"

        };

    }


    /* ตรวจ Active / จำนวนใช้ / วันหมดอายุ */

    if (!isDiscountActive(discount)) {

        if (
            Number(discount.usageLimit) > 0 &&
            Number(discount.usedCount || 0) >=
            Number(discount.usageLimit)
        ) {

            return {

                success: false,

                code: "USAGE_LIMIT",

                message: "คูปองนี้ถูกใช้ครบจำนวนแล้ว"

            };

        }


        if (discount.expiresAt) {

            const expiry =
                new Date(discount.expiresAt);

            if (
                !isNaN(expiry.getTime()) &&
                new Date() > expiry
            ) {

                return {

                    success: false,

                    code: "EXPIRED",

                    message: "คูปองนี้หมดอายุแล้ว"

                };

            }

        }


        return {

            success: false,

            code: "INACTIVE",

            message: "คูปองนี้ไม่สามารถใช้งานได้"

        };

    }


    /* ตรวจยอดขั้นต่ำ */

    const minimum =
        Number(discount.minimum || 0);


    if (amount < minimum) {

        return {

            success: false,

            code: "MINIMUM_NOT_REACHED",

            message:
                `ต้องซื้อขั้นต่ำ ${formatDiscountMoney(minimum)} ` +
                `จึงจะใช้คูปองนี้ได้`,

            minimum: minimum,

            remaining:
                Math.max(0, minimum - amount)

        };

    }


    /* ผ่านทุกเงื่อนไข */

    return {

        success: true,

        code: "VALID",

        message: "ใช้คูปองได้",

        discount: discount

    };

}


/* =========================================================
   CALCULATE DISCOUNT
   ========================================================= */

function calculateDiscount(code, subtotal, shippingFee) {

    const amount =
        Number(subtotal) || 0;

    const shipping =
        Number(shippingFee) || 0;


    const validation =
        validateDiscount(
            code,
            amount
        );


    if (!validation.success) {

        return {

            success: false,

            discountAmount: 0,

            shippingDiscount: 0,

            totalDiscount: 0,

            finalShipping: shipping,

            finalTotal:
                amount + shipping,

            message:
                validation.message,

            validation: validation

        };

    }


    const discount =
        validation.discount;


    let discountAmount = 0;

    let shippingDiscount = 0;


    /* =====================================================
       FIXED
       ===================================================== */

    if (discount.type === "fixed") {

        discountAmount =
            Number(discount.value) || 0;


        /* ห้ามลดเกินราคาสินค้า */

        discountAmount =
            Math.min(
                discountAmount,
                amount
            );

    }


    /* =====================================================
       PERCENT
       ===================================================== */

    else if (discount.type === "percent") {

        const percent =
            Number(discount.value) || 0;


        discountAmount =
            amount *
            (percent / 100);


        /* จำกัดส่วนลดสูงสุด */

        if (
            discount.maxDiscount !== null &&
            discount.maxDiscount !== undefined
        ) {

            discountAmount =
                Math.min(
                    discountAmount,
                    Number(discount.maxDiscount) || 0
                );

        }

    }


    /* =====================================================
       SHIPPING
       ===================================================== */

    else if (discount.type === "shipping") {

        shippingDiscount =
            shipping;

    }


    /* ป้องกันค่าติดลบ */

    discountAmount =
        Math.max(
            0,
            Math.min(discountAmount, amount)
        );


    shippingDiscount =
        Math.max(
            0,
            Math.min(shippingDiscount, shipping)
        );


    const finalShipping =
        Math.max(
            0,
            shipping - shippingDiscount
        );


    const totalDiscount =
        discountAmount +
        shippingDiscount;


    const finalTotal =
        Math.max(
            0,
            amount -
            discountAmount +
            finalShipping
        );


    return {

        success: true,

        code: "VALID",

        message: "ใช้คูปองสำเร็จ",

        discount: discount,

        discountAmount:
            roundMoney(discountAmount),

        shippingDiscount:
            roundMoney(shippingDiscount),

        totalDiscount:
            roundMoney(totalDiscount),

        originalSubtotal:
            roundMoney(amount),

        originalShipping:
            roundMoney(shipping),

        finalShipping:
            roundMoney(finalShipping),

        finalTotal:
            roundMoney(finalTotal)

    };

}


/* =========================================================
   ROUND MONEY
   ========================================================= */

function roundMoney(value) {

    return Math.round(
        (Number(value) || 0) * 100
    ) / 100;

}


/* =========================================================
   FORMAT MONEY
   ========================================================= */

function formatDiscountMoney(value) {

    return '฿' +
        Number(value || 0)
            .toLocaleString('th-TH');

}


/* =========================================================
   GET DISCOUNT MESSAGE
   ========================================================= */

function getDiscountDescription(discount) {

    if (!discount) {
        return "";
    }


    if (discount.type === "fixed") {

        return `ลด ${formatDiscountMoney(discount.value)}`;

    }


    if (discount.type === "percent") {

        let text =
            `ลด ${discount.value}%`;

        if (
            discount.maxDiscount !== null &&
            discount.maxDiscount !== undefined
        ) {

            text +=
                ` สูงสุด ${formatDiscountMoney(discount.maxDiscount)}`;

        }

        return text;

    }


    if (discount.type === "shipping") {

        return "ฟรีค่าจัดส่ง";

    }


    return "";

}


/* =========================================================
   GET AVAILABLE DISCOUNTS
   ========================================================= */

function getAvailableDiscounts(subtotal) {

    const amount =
        Number(subtotal) || 0;


    return getDiscounts()
        .filter(
            discount =>
                isDiscountActive(discount) &&
                amount >=
                Number(discount.minimum || 0)
        );

}


/* =========================================================
   INCREASE USED COUNT
   =========================================================

   หมายเหตุ:
   ระบบนี้ใช้ localStorage เพื่อจำลองการใช้งานคูปอง
   หากภายหลังมี Backend จริง ควรย้ายการตรวจสอบ
   และเพิ่ม usedCount ไปทำบน Server
========================================================= */

function increaseDiscountUsage(code) {

    const discount =
        getDiscountByCode(code);

    if (!discount) {
        return false;
    }


    discount.usedCount =
        Number(discount.usedCount || 0) + 1;


    return true;

}


/* =========================================================
   DISCOUNT STORAGE
   ========================================================= */

const DISCOUNT_STORAGE_KEY =
    "appliedDiscount";


/* =========================================================
   SAVE APPLIED DISCOUNT
   ========================================================= */

function saveAppliedDiscount(data) {

    try {

        localStorage.setItem(
            DISCOUNT_STORAGE_KEY,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "[DISCOUNT] Cannot save:",
            error
        );

        return false;

    }

}


/* =========================================================
   LOAD APPLIED DISCOUNT
   ========================================================= */

function loadAppliedDiscount() {

    try {

        const saved =
            localStorage.getItem(
                DISCOUNT_STORAGE_KEY
            );


        if (!saved) {
            return null;
        }


        const parsed =
            JSON.parse(saved);


        if (!parsed || typeof parsed !== "object") {
            return null;
        }


        return parsed;

    } catch (error) {

        console.error(
            "[DISCOUNT] Cannot load:",
            error
        );

        return null;

    }

}


/* =========================================================
   CLEAR APPLIED DISCOUNT
   ========================================================= */

function clearAppliedDiscount() {

    try {

        localStorage.removeItem(
            DISCOUNT_STORAGE_KEY
        );

    } catch (error) {

        console.error(
            "[DISCOUNT] Cannot clear:",
            error
        );

    }

}


/* =========================================================
   DEBUG
===================================================== */

console.log(
    "[DISCOUNT] discounts.js loaded:",
    getDiscounts()
);
```
