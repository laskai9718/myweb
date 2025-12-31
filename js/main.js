// js/main.js (MAXIMÁLIS TELJESÍTMÉNYRE OPTIMALIZÁLT)

import { initAnimations } from './animations.js';
import { initContactForm } from './contact-form.js';
import { initPortfolio } from './portfolio.js';
import { initThemeSwitcher } from './theme.js';
import { initUI } from './ui.js';
import { initParticles } from './particles-init.js';
import { initPreloader } from './preloader.js';

/**
 * A modulok biztonságos inicializálása hibaellenőrzéssel
 */
const safeInit = (initFn, name) => {
    try {
        initFn();
    } catch (error) {
        console.error(`Hiba a(z) ${name} inicializálása során:`, error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Mobil eszköz detektálása (PageSpeed SI és LCP javításához kritikus)
    const isMobile = window.innerWidth < 768;

    // 1. KRITIKUS ELEMEK (Azonnali végrehajtás)
    // A Preloader-nek azonnal el kell tűnnie, ha a DOM kész, különben a robot 0 pontot ad
    safeInit(initPreloader, 'Preloader');
    safeInit(initThemeSwitcher, 'ThemeSwitcher');

    // 2. FUNKCIONÁLIS ALAPOK
    safeInit(initUI, 'UI Logic');
    safeInit(initPortfolio, 'Portfolio');
    safeInit(initContactForm, 'Contact Form');

    // 3. ERŐFORRÁS-IGÉNYES VIZUÁLIS ELEMEK (Feltételes betöltés)
    if (!isMobile) {
        // Részecskék: Mobilon kikapcsolva a CPU kímélése érdekében
        safeInit(initParticles, 'Particles');

        // Rellax (Parallax): Mobilon rángatná a képernyőt, csak asztalin futtatjuk
        if (typeof Rellax !== 'undefined') {
            try {
                new Rellax('.hero-text h1, .hero-text .subtitle, .hero-visual img', {
                    speed: -2,
                    round: true,
                    vertical: true,
                    horizontal: false
                });
            } catch (e) {
                console.warn("Rellax hiba:", e);
            }
        }
    }

    // 4. ANIMÁCIÓK (AOS)
    // Ha mobilon vagyunk, az AOS-t vagy kikapcsoljuk, vagy extra gyorsra állítjuk
    if (typeof AOS !== 'undefined') {
        try {
            AOS.init({
                duration: isMobile ? 0 : 800, // Mobilon nincs várakozás (FCP javítás)
                once: true,
                disable: isMobile, // Teljes kikapcsolás mobilon a jobb SI pontszámért
                startEvent: 'DOMContentLoaded'
            });
        } catch (e) {
            console.error("AOS hiba:", e);
        }
    } else {
        safeInit(initAnimations, 'Animations');
    }

    // Ha mobilon az AOS ki van kapcsolva, kényszerítjük a láthatóságot
    if (isMobile) {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.transition = "none";
        });
    }
});