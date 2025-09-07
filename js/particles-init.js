// js/particles-init.js (TELJES, OPTIMALIZÁLT KÓD)

export function initParticles() {

    // Asztali gépre szánt, teljes animáció beállításai
    const desktopOptions = {
        fpsLimit: 60,
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#555555" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            links: { enable: true, distance: 150, color: "#888888", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, direction: "none", out_mode: "out", bounce: false }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
        },
        detectRetina: true
    };

    // Mobilra szánt, egyszerűsített, "könnyített" animáció beállításai
    const mobileOptions = {
        fpsLimit: 40, // Alacsonyabb FPS limit
        particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } }, // Sokkal kevesebb részecske
            color: { value: "#555555" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 2, random: true },
            links: { enable: false }, // A legfontosabb: nincsenek összekötő vonalak
            move: { enable: true, speed: 1.2, direction: "none", out_mode: "out", bounce: false }
        },
        interactivity: {
            events: { onhover: { enable: false }, resize: true }, // Nincs interakció
            modes: {}
        },
        detectRetina: true
    };

    // Döntés: Melyik beállítást töltsük be a képernyőméret alapján?
    if (window.matchMedia("(min-width: 768px)").matches) {
        // Ha a képernyő szélesebb, mint 768px (asztali gép, tablet)...
        tsParticles.load("tsparticles", desktopOptions);
    } else {
        // Ha a képernyő keskenyebb (mobil)...
        tsParticles.load("tsparticles", mobileOptions);
    }
}