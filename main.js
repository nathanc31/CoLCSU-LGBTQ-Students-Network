/* ============================================================
   MAIN INITIALISATION
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------------
       CINEMATIC SCROLL ANIMATIONS
    ------------------------------------------------------------ */
    const animated = document.querySelectorAll(
        ".section, .block, .stagger-wide, .parallax"
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    animated.forEach(el => observer.observe(el));

    /* ------------------------------------------------------------
       TIME-RESTRICTED ACCESS FOR GAMES
    ------------------------------------------------------------ */
    checkAccessTime();
    setInterval(checkAccessTime, 60000);

    /* ------------------------------------------------------------
       MOBILE UI ENHANCEMENTS
    ------------------------------------------------------------ */
    applyMobileUI();

    /* ------------------------------------------------------------
       NAV SCROLL EFFECT
    ------------------------------------------------------------ */
    applyNavScrollEffect();

    /* ------------------------------------------------------------
       HAMBURGER MENU
    ------------------------------------------------------------ */
    const nav = document.querySelector("nav");
    const hamburger = document.querySelector(".hamburger");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }

    /* ------------------------------------------------------------
       SSN POPUP
    ------------------------------------------------------------ */
    const popup = document.getElementById("ssnPopup");

    if (popup) {

        if (localStorage.getItem("ssnRulesAccepted")) {
            popup.style.display = "none";
        } else {
            popup.style.display = "flex";
        }

    }

});


/* ============================================================
   TIME-RESTRICTED ACCESS FOR GAMES
============================================================ */

function checkAccessTime() {

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const games = document.getElementById("gamesSection");
    const blocked = document.getElementById("blockedMessage");

    if (!games || !blocked) return;

    const before9am = hour < 9;
    const lunchBreak = hour === 12;
    const after430pm = (hour > 16) || (hour === 16 && minute >= 30);

    if (before9am || lunchBreak || after430pm) {
        games.style.display = "block";
        blocked.style.display = "none";
    } else {
        games.style.display = "none";
        blocked.style.display = "block";
    }

}


/* ============================================================
   MOBILE UI ENHANCEMENTS
============================================================ */

function isMobileOrTablet() {
    return window.innerWidth <= 900;
}

function applyMobileUI() {

    if (!isMobileOrTablet()) return;

    document.body.classList.add("mobile-active");

    const nav = document.querySelector("nav");

    if (nav) {
        nav.classList.add("mobile-nav");
    }

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("mobile-card");
    });

}


/* ============================================================
   NAV SCROLL EFFECT
============================================================ */

function applyNavScrollEffect() {

    const nav = document.querySelector("nav");

    if (!nav) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {
            nav.classList.add("nav-scrolled");
        } else {
            nav.classList.remove("nav-scrolled");
        }

    });

}


/* ============================================================
   RESPONSIVE REACTIVITY
============================================================ */

window.addEventListener("resize", () => {
    applyMobileUI();
});


/* ============================================================
   POPUP CLOSE FUNCTION
============================================================ */

function closePopup() {

    localStorage.setItem("ssnRulesAccepted", "true");

    const popup = document.getElementById("ssnPopup");

    if (popup) {
        popup.style.display = "none";
    }

}
