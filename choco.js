/* =========================================
   LOADER
========================================= */

gsap.timeline()
    .to(".loader-progress", { width: "100%", duration: 1.8, ease: "power2.inOut" })
    .to(".loader-logo", { scale: 1.08, duration: .3, yoyo: true, repeat: 1 })
    .to(".loader", { yPercent: -100, duration: 1, ease: "power4.inOut" });


/* =========================================
   HERO ENTRANCE (starts as the loader slides away)
========================================= */

gsap.timeline({ delay: 2.6 })
    .from(".topbar", { y: -30, opacity: 0, duration: .8, ease: "power3.out" })
    .from(".eyebrow", { x: -50, opacity: 0, duration: .7, ease: "power3.out" })
    .from(".title-line", { y: 100, opacity: 0, duration: .9, stagger: .15, ease: "power4.out" })
    .from(".description", { y: 25, opacity: 0, duration: .7 })
    .from(".message", { y: 20, opacity: 0, scale: .95, duration: .6 })
    .from(".countdown-wrapper", { y: 20, opacity: 0, duration: .6 })
    .from(".launch-date", { opacity: 0, duration: .5 })
    .from(".character-area", { x: 100, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=1")
    .from(".footer", { y: 20, opacity: 0, duration: .6 });


/* =========================================
   AMBIENT ANIMATIONS
========================================= */

// Warning sign
gsap.to(".warning-sign", {
    rotation: 4, y: -8, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true
});

// Floating icons
gsap.utils.toArray(".floating-icon").forEach((icon, index) => {
    gsap.to(icon, {
        y: index % 2 === 0 ? -25 : 25,
        x: index % 2 === 0 ? 15 : -15,
        rotation: index % 2 === 0 ? 15 : -15,
        duration: 2 + index * .5,
        ease: "sine.inOut", repeat: -1, yoyo: true
    });
});

// Particles
gsap.utils.toArray(".particles span").forEach((particle, index) => {
    gsap.to(particle, {
        y: -100 - Math.random() * 150,
        x: (Math.random() - .5) * 100,
        opacity: 0,
        duration: 3 + Math.random() * 3,
        delay: index * .3,
        repeat: -1,
        ease: "none"
    });
});

// Orange glow
gsap.to(".character-glow", {
    scale: 1.2, opacity: .7, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true
});

// Brand dot pulse
gsap.to(".brand-dot", {
    scale: 1.6, opacity: .4, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut"
});


/* =========================================
   COUNTDOWN
========================================= */

// January 24, 2027 at midnight IST (+05:30), so everyone sees the same moment
const targetDate = new Date("2027-01-24T00:00:00+05:30").getTime();

const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
};

// Updates a number and plays the small flip animation only when it changes
function setValue(el, value) {

    if (el.textContent === value) return;

    el.textContent = value;

    gsap.fromTo(el,
        { y: -8, opacity: .5 },
        { y: 0, opacity: 1, duration: .25, overwrite: true }
    );
}

function updateCountdown() {

    const difference = targetDate - Date.now();

    if (difference <= 0) {

        Object.values(els).forEach(el => { el.textContent = "00"; });

        document.querySelector(".countdown-title").textContent = "WE ARE LIVE";

        clearInterval(countdownTimer);

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setValue(els.days, String(days).padStart(2, "0"));
    setValue(els.hours, String(hours).padStart(2, "0"));
    setValue(els.minutes, String(minutes).padStart(2, "0"));
    setValue(els.seconds, String(seconds).padStart(2, "0"));
}

const countdownTimer = setInterval(updateCountdown, 1000);

updateCountdown();


/* =========================================
   FOOTER YEAR
========================================= */

document.getElementById("year").textContent = new Date().getFullYear();


/* =========================================
   MOUSE PARALLAX
========================================= */

if (window.innerWidth > 768) {

    window.addEventListener("mousemove", (event) => {

        const x = (event.clientX / window.innerWidth - .5) * 2;
        const y = (event.clientY / window.innerHeight - .5) * 2;

        gsap.to(".character-glow", {
            x: x * 25, y: y * 15, duration: 1.2, ease: "power2.out", overwrite: "auto"
        });
    });
}


/* =========================================
   MESSAGE HOVER
========================================= */

const message = document.querySelector(".message");

message.addEventListener("mouseenter", () => {
    gsap.to(message, {
        scale: 1.03, borderColor: "rgba(255,122,0,.5)", duration: .3, ease: "power2.out"
    });
});

message.addEventListener("mouseleave", () => {
    gsap.to(message, {
        scale: 1, borderColor: "rgba(255,255,255,.08)", duration: .3
    });
});


/* =========================================
   RANDOM MICRO GLITCH
========================================= */

function microGlitch() {

    const title = document.querySelector(".accent");

    gsap.timeline()
        .to(title, { x: -3, duration: .04 })
        .to(title, { x: 4, duration: .04 })
        .to(title, { x: 0, duration: .04 });

    // Pick a fresh random delay each time
    setTimeout(microGlitch, 6000 + Math.random() * 4000);
}

setTimeout(microGlitch, 8000);


/* =========================================
   PAUSE ANIMATIONS WHEN TAB IS HIDDEN
========================================= */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});
