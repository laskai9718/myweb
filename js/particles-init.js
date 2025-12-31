// js/particles-init.js (PRÉMIUM OPTIMALIZÁLT VERZIÓ)

export function initParticles() {
    if (typeof tsParticles === 'undefined') return;

    // Segédfüggvény a színek kinyeréséhez a CSS-ből
    const getParticleColor = () => {
        const isDark = document.body.classList.contains('dark-mode');
        return isDark ? "#888888" : "#555555";
    };

    const commonOptions = {
        fpsLimit: window.innerWidth < 768 ? 40 : 60,
        detectRetina: true,
        fullScreen: { enable: false }, // Csak a kijelölt konténerben fusson
    };

    const particlesBase = {
        color: { value: getParticleColor() },
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: { min: 1, max: 3 } },
        move: { 
            enable: true, 
            speed: 0.8, 
            direction: "none", 
            out_mode: "out" 
        }
    };

    const desktopConfig = {
        ...commonOptions,
        particles: {
            ...particlesBase,
            number: { value: 60, density: { enable: true, area: 800 } },
            links: { 
                enable: true, 
                distance: 150, 
                color: getParticleColor(), 
                opacity: 0.3, 
                width: 1 
            }
        },
        interactivity: {
            events: { 
                onHover: { enable: true, mode: "repulse" }, 
                resize: true 
            },
            modes: { 
                repulse: { distance: 100, duration: 0.4 } 
            }
        }
    };

    const mobileConfig = {
        ...commonOptions,
        particles: {
            ...particlesBase,
            number: { value: 25, density: { enable: true, area: 800 } },
            links: { enable: false } // Mobilon tiltsd le a vonalakat!
        },
        interactivity: {
            events: { resize: true }
        }
    };

    // Betöltés a képernyőméret alapján
    const config = window.innerWidth < 768 ? mobileConfig : desktopConfig;
    
    tsParticles.load("tsparticles", config).then(container => {
        // Témafigyelő: Ha változik a sötét mód, frissítjük a színeket
        const observer = new MutationObserver(() => {
            const newColor = getParticleColor();
            container.options.particles.color.value = newColor;
            if (container.options.particles.links) {
                container.options.particles.links.color.value = newColor;
            }
            container.refresh(); // Frissítés újratöltés nélkül
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    });
}