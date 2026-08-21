/* =========================================
   GSAP SETUP
========================================= */

gsap.registerPlugin();


/* =========================================
   LOADER
========================================= */

const loaderTimeline = gsap.timeline();


loaderTimeline
    .to(".loader-progress", {

        width: "100%",

        duration: 1.8,

        ease: "power2.inOut"

    })

    .to(".loader-logo", {

        scale: 1.08,

        duration: .3,

        yoyo: true,

        repeat: 1

    })

    .to(".loader", {

        yPercent: -100,

        duration: 1,

        ease: "power4.inOut"

    })

    .from(".construction-page", {

        opacity: 0,

        duration: .5

    });


/* =========================================
   HERO ENTRANCE
========================================= */

const heroTimeline = gsap.timeline({

    delay: 2.2

});


heroTimeline

    .from(".topbar", {

        y: -30,

        opacity: 0,

        duration: .8,

        ease: "power3.out"

    })

    .from(".eyebrow", {

        x: -50,

        opacity: 0,

        duration: .7,

        ease: "power3.out"

    })

    .from(".title-line", {

        y: 100,

        opacity: 0,

        duration: .9,

        stagger: .15,

        ease: "power4.out"

    })

    .from(".description", {

        y: 25,

        opacity: 0,

        duration: .7

    })

    .from(".message", {

        y: 20,

        opacity: 0,

        scale: .95,

        duration: .6

    })

    .from(".countdown-wrapper", {

        y: 20,

        opacity: 0,

        duration: .6

    })

    .from(".launch-date", {

        opacity: 0,

        duration: .5

    })

    .from(".character-area", {

        x: 100,

        opacity: 0,

        duration: 1.2,

        ease: "power4.out"

    }, "-=1")

    .from(".footer", {

        y: 20,

        opacity: 0,

        duration: .6

    });


/* =========================================
   WORKER IDLE ANIMATION
========================================= */

gsap.to(".worker", {

    y: -12,

    rotation: 1,

    duration: 2.2,

    ease: "sine.inOut",

    repeat: -1,

    yoyo: true

});


/* =========================================
   HELMET FLOAT
========================================= */

gsap.to(".helmet", {

    y: -4,

    duration: 1.5,

    ease: "sine.inOut",

    repeat: -1,

    yoyo: true

});


/* =========================================
   LEFT ARM
========================================= */

gsap.to(".arm-left", {

    rotation: 25,

    duration: 1.5,

    ease: "sine.inOut",

    repeat: -1,

    yoyo: true

});


/* =========================================
   RIGHT ARM
========================================= */

gsap.to(".arm-right", {

    rotation: -25,

    duration: 1.8,

    ease: "sine.inOut",

    repeat: -1,

    yoyo: true

});


/* =========================================
   TOOL MOVEMENT
========================================= */

gsap.to(".tool", {

    rotation: -52,

    duration: .8,

    ease: "power1.inOut",

    repeat: -1,

    yoyo: true

});


/* =========================================
   WARNING SIGN
========================================= */

gsap.to(".warning-sign", {

    rotation: 4,

    y: -8,

    duration: 2.5,

    ease: "sine.inOut",

    repeat: -1,

    yoyo: true

});


/* =========================================
   FLOATING ICONS
========================================= */

gsap.utils.toArray(".floating-icon").forEach((icon, index) => {

    gsap.to(icon, {

        y: index % 2 === 0 ? -25 : 25,

        x: index % 2 === 0 ? 15 : -15,

        rotation: index % 2 === 0 ? 15 : -15,

        duration: 2 + index * .5,

        ease: "sine.inOut",

        repeat: -1,

        yoyo: true

    });

});


/* =========================================
   PARTICLES
========================================= */

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


/* =========================================
   ORANGE GLOW
========================================= */

gsap.to(".character-glow", {

    scale: 1.2,

    opacity: .7,

    duration: 2.5,

    ease: "sine.inOut",

    repeat: -1,

    yoyo: true

});


/* =========================================
   COUNTDOWN
========================================= */

// December 3, 2026 at midnight
const targetDate = new Date("December 3, 2026 00:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = targetDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";

        document.getElementById("hours").textContent = "00";

        document.getElementById("minutes").textContent = "00";

        document.getElementById("seconds").textContent = "00";

        document.querySelector(".countdown-title").textContent =
            "WE ARE LIVE";

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );


    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );


    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   COUNTDOWN NUMBER ANIMATION
========================================= */

const countdownNumbers =
    document.querySelectorAll(".time-number");


countdownNumbers.forEach(number => {

    number.addEventListener("DOMSubtreeModified", () => {

        gsap.fromTo(
            number,

            {
                y: -8,
                opacity: .5
            },

            {
                y: 0,
                opacity: 1,
                duration: .25
            }
        );

    });

});


/* =========================================
   MOUSE PARALLAX
========================================= */

const characterArea =
    document.querySelector(".character-area");


if (window.innerWidth > 768) {

    window.addEventListener("mousemove", (event) => {

        const x =
            (event.clientX / window.innerWidth - .5) * 2;

        const y =
            (event.clientY / window.innerHeight - .5) * 2;


        gsap.to(".worker", {

            x: x * 12,

            rotationY: x * 5,

            rotationX: -y * 3,

            duration: .8,

            ease: "power2.out"

        });


        gsap.to(".warning-sign", {

            x: x * 20,

            y: y * 15,

            duration: 1,

            ease: "power2.out"

        });


        gsap.to(".character-glow", {

            x: x * 25,

            y: y * 15,

            duration: 1.2,

            ease: "power2.out"

        });

    });

}


/* =========================================
   MESSAGE HOVER
========================================= */

const message =
    document.querySelector(".message");


message.addEventListener("mouseenter", () => {

    gsap.to(message, {

        scale: 1.03,

        borderColor: "rgba(255,122,0,.5)",

        duration: .3,

        ease: "power2.out"

    });

});


message.addEventListener("mouseleave", () => {

    gsap.to(message, {

        scale: 1,

        borderColor: "rgba(255,255,255,.08)",

        duration: .3

    });

});


/* =========================================
   BRAND DOT PULSE
========================================= */

gsap.to(".brand-dot", {

    scale: 1.6,

    opacity: .4,

    duration: 1,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* =========================================
   RANDOM MICRO GLITCH
========================================= */

function microGlitch() {

    const title =
        document.querySelector(".accent");


    gsap.timeline()

        .to(title, {

            x: -3,

            duration: .04

        })

        .to(title, {

            x: 4,

            duration: .04

        })

        .to(title, {

            x: 0,

            duration: .04

        });

}


setInterval(
    microGlitch,
    6000 + Math.random() * 4000
);


/* =========================================
   VISIBILITY OPTIMIZATION
========================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            gsap.globalTimeline.pause();

        } else {

            gsap.globalTimeline.resume();

        }

    }
);