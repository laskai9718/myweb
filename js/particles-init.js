// js/particles-init.js - TELJES, JAVÍTOTT KÓD

export function initParticles() {

    // Ellenőrizzük, hogy a képernyő szélessége nagyobb-e, mint 768 pixel
    if (window.matchMedia("(min-width: 768px)").matches) {
        
        // Ha igen (tehát nem mobil), akkor elindítjuk az animációt a te beállításaiddal.
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#555555"
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.5,
                    random: true,
                },
                size: {
                    value: 3,
                    random: true,
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#888888",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            detectRetina: true
        });
    }
    
    // Ha a képernyő kisebb, ez a kód le sem fut, és nem lassítja a telefont.
}