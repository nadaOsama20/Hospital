function switchLanguage(lang) {
    // تخزين اللغة المختارة
    localStorage.setItem("lang", lang);

    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
    }

    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        // نخزن النص العربي مرة واحدة فقط
        if (!el.getAttribute('data-ar')) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.type === 'submit' || el.type === 'button') {
                    el.setAttribute('data-ar', el.value);
                } else {
                    el.setAttribute('data-ar', el.placeholder);
                }
            } else {
                el.setAttribute('data-ar', el.textContent);
            }
        }

        // التبديل بين اللغات
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (el.type === 'submit' || el.type === 'button') {
                el.value = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-ar');
            } else {
                el.placeholder = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-ar');
            }
        } else if (el.tagName === 'OPTION') {
            el.textContent = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-ar');
        } else {
            el.textContent = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-ar');
        }
    });

    // محاذاة الحقول حسب اللغة
    document.querySelectorAll('input,textarea,select').forEach(f => {
        f.style.textAlign = (lang === 'ar') ? 'right' : 'left';
    });
}

// عند تحميل الصفحة نسترجع اللغة المحفوظة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem("lang") || "ar"; // الافتراضي عربي
    switchLanguage(savedLang);
});

// القائمة

// إظهار وإخفاء القائمة عند الضغط على أيقونة القائمة
function toggleMenu() {
    const menu = document.querySelector(".navbar ul");
    menu.classList.toggle("show");
}

// إخفاء القائمة عند الضغط على أي رابط داخلها
document.querySelectorAll(".navbar ul li a").forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.querySelector(".navbar ul");
        if (menu.classList.contains("show")) {
            menu.classList.remove("show");
        }
    });
});


// زر الصعود للأعلى
const scrollBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
    scrollBtn.style.display = (window.scrollY > 300) ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ----------------------------
// زر تسجيل الدخول - Modal
// ----------------------------
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const loginModal = document.getElementById('loginModal');

// فتح النافذة عند الضغط على زر تسجيل الدخول
openModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// إغلاق النافذة عند الضغط على زر الإغلاق
closeModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// إغلاق النافذة عند الضغط خارج المحتوى
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});