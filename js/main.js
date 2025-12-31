// js/main.js (STABIL ÉS OPTIMALIZÁLT)

import { initAnimations } from './animations.js';
import { initContactForm } from './contact-form.js';
import { initPortfolio } from './portfolio.js';
import { initThemeSwitcher } from './theme.js';
import { initUI } from './ui.js';
import { initParticles } from './particles-init.js';
import { initPreloader } from './preloader.js';

/**
 * A modulok biztonságos inicializálása
 */
const safeInit = (initFn, name) => {
    try {
        initFn();
    } catch (error) {
        console.error(`Hiba a(z) ${name} inicializálása során:`, error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. KRITIKUS: Preloader és Téma (azonnal látszódniuk kell)
    safeInit(initPreloader, 'Preloader');
    safeInit(initThemeSwitcher, 'ThemeSwitcher');

    // 2. VIZUÁLIS ALAPOK
    safeInit(initUI, 'UI Logic');
    safeInit(initParticles, 'Particles');
    
    // 3. TARTALOM ÉS FUNKCIÓK
    safeInit(initPortfolio, 'Portfolio');
    safeInit(initContactForm, 'Contact Form');

    // 4. ANIMÁCIÓK ÉS KÜLSŐ KÖNYVTÁRAK
    safeInit(initAnimations, 'Animations');

    // Rellax (Parallax) inicializálása
    if (typeof Rellax !== 'undefined' && window.innerWidth >= 768) {
        try {
            // Tipp: Érdemesebb egy közös osztályt (.rellax) használni a HTML-ben
            new Rellax('.hero-text h1, .hero-text .subtitle, .hero-visual img', {
                speed: -2,
                center: false,
                wrapper: null,
                round: true,
                vertical: true,
                horizontal: false
            });
        } catch (e) {
            console.warn("Rellax inicializálási hiba:", e);
        }
    }
});