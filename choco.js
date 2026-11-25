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
    .from(".tape", { xPercent: -30, opacity: 0, duration: .9, ease: "power3.out" })
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



/* =========================================
   SPLIT TITLE INTO LETTERS
========================================= */

document.querySelectorAll(".title-line").forEach(line => {

    const text = line.textContent.trim();

    line.textContent = "";

    text.split(" ").forEach((word, i, arr) => {

        const w = document.createElement("span");
        w.className = "word";

        [...word].forEach(letter => {
            const c = document.createElement("span");
            c.className = "ch";
            c.textContent = letter;
            w.appendChild(c);
        });

        line.appendChild(w);

        if (i < arr.length - 1) line.appendChild(document.createTextNode(" "));
    });
});

// Letter pop-up when the hero title enters
gsap.from(".title-line .ch", {

    yPercent: 110,
    rotate: 10,
    opacity: 0,
    duration: 1,
    stagger: .03,
    delay: 3.2,
    ease: "power4.out"
});

// Letters hop when hovered
document.querySelectorAll(".ch").forEach(ch => {

    ch.addEventListener("mouseenter", () => {

        gsap.fromTo(ch, { y: 0 }, {
            y: -16, duration: .2, yoyo: true, repeat: 1,
            ease: "power2.out", overwrite: true
        });
    });
});


/* =========================================
   CONSTELLATION CANVAS (orange network)
========================================= */

const net = document.getElementById("net");
const ctx = net.getContext("2d");

let W, H, dots = [];
const mouse = { x: -999, y: -999 };

function resizeNet() {

    const ratio = window.devicePixelRatio || 1;

    W = window.innerWidth;
    H = window.innerHeight;

    net.width = W * ratio;
    net.height = H * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    dots = Array.from({ length: Math.min(75, Math.floor(W / 16)) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35
    }));
}

window.addEventListener("resize", resizeNet);
resizeNet();

function drawNet() {

    ctx.clearRect(0, 0, W, H);

    dots.forEach((p, i) => {

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);

        if (d < 140) {
            p.x += dx / d * 1.6;
            p.y += dy / d * 1.6;
        }

        ctx.fillStyle = "rgba(255,122,0,.65)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {

            const q = dots[j];
            const l = Math.hypot(p.x - q.x, p.y - q.y);

            if (l < 120) {
                ctx.strokeStyle = `rgba(255,140,30,${.2 * (1 - l / 120)})`;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(drawNet);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) drawNet();


/* =========================================
   CURSOR + WARNING SIGN PARALLAX
========================================= */

const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: .25, ease: "power3.out" });

    if (window.innerWidth > 768) {

        const x = (e.clientX / window.innerWidth - .5) * 2;

        gsap.to(".warning-sign", {
            x: x * 20, rotationY: x * 8,
            duration: 1, ease: "power2.out", overwrite: "auto"
        });
    }
});

document.querySelectorAll("a, .message, .time-box").forEach(el => {

    el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 1.8, duration: .3 }));
    el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, duration: .3 }));
});


/* =========================================
   SCROLL PROGRESS BAR
========================================= */

const bar = document.querySelector(".progress");

window.addEventListener("scroll", () => {

    const max = document.documentElement.scrollHeight - window.innerHeight || 1;

    bar.style.width = (window.scrollY / max * 100) + "%";
});


/* =========================================
   TAPE: duplicate content for a seamless loop
========================================= */

const tapeTrack = document.querySelector(".tape-track");

tapeTrack.innerHTML += tapeTrack.innerHTML;
