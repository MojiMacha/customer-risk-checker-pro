/* =========================================================
   DELIVERY RISK MARKET
   AUTH SYSTEM
   File: js/auth.js

   Roles:
   - customer = ลูกค้า
   - staff    = พนักงาน / Admin

   Storage:
   - drm_current_user
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const AUTH_STORAGE_KEY = "drm_current_user";


/* =========================================================
   DEMO USERS
   ---------------------------------------------------------
   สำหรับระบบ Demo / โปรเจกต์โรงเรียน

   หมายเหตุ:
   ระบบจริงควรตรวจสอบบัญชีจาก Backend
========================================================= */

const DEMO_USERS = [

    {
        id: "CUS001",
        username: "customer",
        password: "1234",
        name: "ลูกค้าทดสอบ",
        role: "customer"
    },

    {
        id: "STF001",
        username: "staff",
        password: "1234",
        name: "พนักงาน Delivery Risk",
        role: "staff"
    }

];


/* =========================================================
   ROLE CONFIG
========================================================= */

const AUTH_ROLES = {

    CUSTOMER: "customer",

    STAFF: "staff"

};


/* =========================================================
   LOGIN
========================================================= */

function login(username, password) {

    username = String(username || "").trim();

    password = String(password || "");


    if (!username || !password) {

        return {
            success: false,
            message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน"
        };

    }


    const user = DEMO_USERS.find(

        account =>

            account.username === username &&
            account.password === password

    );


    if (!user) {

        return {
            success: false,
            message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
        };

    }


    const sessionUser = {

        id: user.id,

        username: user.username,

        name: user.name,

        role: user.role,

        loginAt: new Date().toISOString()

    };


    localStorage.setItem(

        AUTH_STORAGE_KEY,

        JSON.stringify(sessionUser)

    );


    return {

        success: true,

        message: "เข้าสู่ระบบสำเร็จ",

        user: sessionUser

    };

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem(

        AUTH_STORAGE_KEY

    );


    /*
       ถ้าต้องการล้างข้อมูลเฉพาะ Session
       สามารถเพิ่มตรงนี้ได้ในอนาคต
    */


    window.location.href = "login.html";

}


/* =========================================================
   GET CURRENT USER
========================================================= */

function getCurrentUser() {

    try {

        const savedUser =

            localStorage.getItem(

                AUTH_STORAGE_KEY

            );


        if (!savedUser) {

            return null;

        }


        const user =

            JSON.parse(savedUser);


        if (!user || !user.role) {

            return null;

        }


        return user;

    }

    catch (error) {

        console.error(

            "[AUTH] Cannot read current user:",

            error

        );


        localStorage.removeItem(

            AUTH_STORAGE_KEY

        );


        return null;

    }

}


/* =========================================================
   CHECK LOGIN
========================================================= */

function isLoggedIn() {

    return getCurrentUser() !== null;

}


/* =========================================================
   GET ROLE
========================================================= */

function getUserRole() {

    const user = getCurrentUser();


    if (!user) {

        return null;

    }


    return user.role;

}


/* =========================================================
   ROLE CHECK
========================================================= */

function hasRole(role) {

    const user = getCurrentUser();


    if (!user) {

        return false;

    }


    return user.role === role;

}


/* =========================================================
   CUSTOMER CHECK
========================================================= */

function isCustomer() {

    return hasRole(

        AUTH_ROLES.CUSTOMER

    );

}


/* =========================================================
   STAFF CHECK
========================================================= */

function isStaff() {

    return hasRole(

        AUTH_ROLES.STAFF

    );

}


/* =========================================================
   REQUIRE LOGIN
   ---------------------------------------------------------
   ใช้กับหน้าที่ต้อง Login
========================================================= */

function requireLogin() {

    const user = getCurrentUser();


    if (!user) {

        redirectToLogin();

        return false;

    }


    return true;

}


/* =========================================================
   REQUIRE CUSTOMER
   ---------------------------------------------------------
   ใช้กับ checkout.html
========================================================= */

function requireCustomer() {

    const user = getCurrentUser();


    if (!user) {

        redirectToLogin();

        return false;

    }


    if (user.role !== AUTH_ROLES.CUSTOMER) {

        showAccessDenied(

            "บัญชีพนักงานไม่สามารถสั่งซื้อสินค้าได้",

            "admin.html"

        );

        return false;

    }


    return true;

}


/* =========================================================
   REQUIRE STAFF
   ---------------------------------------------------------
   ใช้กับ admin.html
========================================================= */

function requireStaff() {

    const user = getCurrentUser();


    if (!user) {

        redirectToLogin();

        return false;

    }


    if (user.role !== AUTH_ROLES.STAFF) {

        showAccessDenied(

            "หน้านี้สำหรับพนักงานเท่านั้น",

            "shop.html"

        );

        return false;

    }


    return true;

}


/* =========================================================
   REDIRECT TO LOGIN
========================================================= */

function redirectToLogin() {

    const currentPage =

        window.location.pathname
            .split("/")
            .pop();


    const currentQuery =

        window.location.search || "";


    const redirectPage =

        currentPage + currentQuery;


    const loginURL =

        "login.html?redirect=" +

        encodeURIComponent(

            redirectPage

        );


    window.location.href = loginURL;

}


/* =========================================================
   ACCESS DENIED
========================================================= */

function showAccessDenied(

    message,

    redirectPage = "shop.html"

) {

    /*
       ป้องกัน Alert ซ้อนหลายครั้ง
    */

    if (window.__authRedirecting) {

        return;

    }


    window.__authRedirecting = true;


    alert(

        "⚠️ ไม่สามารถเข้าถึงหน้านี้ได้\n\n" +

        message

    );


    window.location.href =

        redirectPage;

}


/* =========================================================
   GET REDIRECT URL
   ---------------------------------------------------------
   ใช้หลัง Login สำเร็จ
========================================================= */

function getLoginRedirect() {

    const params =

        new URLSearchParams(

            window.location.search

        );


    const redirect =

        params.get("redirect");


    if (!redirect) {

        return "shop.html";

    }


    /*
       ป้องกันการ Redirect ออกไปยังเว็บไซต์อื่น
    */

    if (

        redirect.includes("://") ||

        redirect.startsWith("//")

    ) {

        return "shop.html";

    }


    return redirect;

}


/* =========================================================
   REDIRECT AFTER LOGIN
========================================================= */

function redirectAfterLogin() {

    const redirectPage =

        getLoginRedirect();


    window.location.href =

        redirectPage;

}


/* =========================================================
   USER DISPLAY
========================================================= */

function getUserDisplayName() {

    const user = getCurrentUser();


    if (!user) {

        return "ผู้เยี่ยมชม";

    }


    return user.name ||

        user.username ||

        "ผู้ใช้งาน";

}


/* =========================================================
   ROLE DISPLAY NAME
========================================================= */

function getRoleDisplayName(role) {

    switch (role) {

        case AUTH_ROLES.CUSTOMER:

            return "ลูกค้า";


        case AUTH_ROLES.STAFF:

            return "พนักงาน";


        default:

            return "ไม่ระบุ";

    }

}


/* =========================================================
   CURRENT USER INFO
========================================================= */

function getCurrentUserInfo() {

    const user = getCurrentUser();


    if (!user) {

        return {

            loggedIn: false,

            id: null,

            username: null,

            name: "ผู้เยี่ยมชม",

            role: null,

            roleName: "ไม่ระบุ"

        };

    }


    return {

        loggedIn: true,

        id: user.id || null,

        username: user.username || null,

        name: user.name || user.username || "ผู้ใช้งาน",

        role: user.role || null,

        roleName:

            getRoleDisplayName(

                user.role

            )

    };

}


/* =========================================================
   PROTECT CHECKOUT
   ---------------------------------------------------------
   เรียกใน checkout.html
========================================================= */

function protectCheckoutPage() {

    return requireCustomer();

}


/* =========================================================
   PROTECT ADMIN
   ---------------------------------------------------------
   เรียกใน admin.html
========================================================= */

function protectAdminPage() {

    return requireStaff();

}


/* =========================================================
   PROTECT CUSTOMER PAGE
   ---------------------------------------------------------
   สำหรับหน้า orders / tracking ในอนาคต
========================================================= */

function protectCustomerPage() {

    return requireCustomer();

}


/* =========================================================
   PROTECT STAFF PAGE
========================================================= */

function protectStaffPage() {

    return requireStaff();

}


/* =========================================================
   NAVIGATION HELPER
========================================================= */

function goToShop() {

    window.location.href = "shop.html";

}


function goToCheckout() {

    if (!requireCustomer()) {

        return;

    }


    window.location.href =

        "checkout.html";

}


function goToOrders() {

    if (!requireLogin()) {

        return;

    }


    window.location.href =

        "orders.html";

}


function goToTracking(orderId) {

    if (!requireLogin()) {

        return;

    }


    if (orderId) {

        window.location.href =

            "tracking.html?order=" +

            encodeURIComponent(orderId);

    }

    else {

        window.location.href =

            "tracking.html";

    }

}


function goToAdmin() {

    if (!requireStaff()) {

        return;

    }


    window.location.href =

        "admin.html";

}


/* =========================================================
   DEBUG
   ---------------------------------------------------------
   เปิด Console แล้วใช้:
   
   authStatus()

========================================================= */

function authStatus() {

    const user = getCurrentUser();


    console.log(

        "========== AUTH STATUS =========="

    );


    console.log(

        "Logged in:",

        !!user

    );


    console.log(

        "User:",

        user

    );


    if (user) {

        console.log(

            "Role:",

            getRoleDisplayName(

                user.role

            )

        );

    }


    console.log(

        "================================="

    );


    return user;

}


/* =========================================================
   AUTO USER INFO
========================================================= */

function updateAuthUI() {

    const user = getCurrentUser();


    /*
       ชื่อผู้ใช้
       element:
       #auth-user-name
    */

    const nameElement =

        document.getElementById(

            "auth-user-name"

        );


    if (nameElement) {

        nameElement.textContent =

            user

                ? getUserDisplayName()

                : "ผู้เยี่ยมชม";

    }


    /*
       Role
       element:
       #auth-user-role
    */

    const roleElement =

        document.getElementById(

            "auth-user-role"

        );


    if (roleElement) {

        roleElement.textContent =

            user

                ? getRoleDisplayName(

                    user.role

                )

                : "";

    }


    /*
       Login Button
       #login-button
    */

    const loginButton =

        document.getElementById(

            "login-button"

        );


    if (loginButton) {

        loginButton.classList.toggle(

            "hidden",

            !!user

        );

    }


    /*
       Logout Button
       #logout-button
    */

    const logoutButton =

        document.getElementById(

            "logout-button"

        );


    if (logoutButton) {

        logoutButton.classList.toggle(

            "hidden",

            !user

        );

    }


    /*
       Admin Button
       #admin-button
    */

    const adminButton =

        document.getElementById(

            "admin-button"

        );


    if (adminButton) {

        adminButton.classList.toggle(

            "hidden",

            !(user &&

              user.role ===

              AUTH_ROLES.STAFF)

        );

    }


    /*
       Checkout Button
       #checkout-button

       Staff จะเห็นไม่ได้
    */

    const checkoutButton =

        document.getElementById(

            "checkout-button"

        );


    if (checkoutButton) {

        checkoutButton.classList.toggle(

            "hidden",

            !(user &&

              user.role ===

              AUTH_ROLES.CUSTOMER)

        );

    }

}


/* =========================================================
   INITIALIZE AUTH UI
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    function() {

        updateAuthUI();

    }

);
