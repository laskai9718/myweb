// js/particles-init.js

export function initParticles() {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 80, // Részecskék száma
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#555555" // Részecskék színe
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
                color: "#888888", // Vonalak színe
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1, // Mozgás sebessége
                direction: "none",
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse" // Egeret taszítják a részecskék
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