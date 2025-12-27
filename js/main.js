// js/main.js (JAVÍTVA)

// Importáljuk a funkciókat a többi modulból
import { initAnimations } from './animations.js';
import { initContactForm } from './contact-form.js';
import { initPortfolio } from './portfolio.js';
import { initThemeSwitcher } from './theme.js';
import { initUI } from './ui.js';
import { initParticles } from './particles-init.js';
import { initPreloader } from './preloader.js'; // Ezt fogjuk javítani a következő lépésben

// Fő eseményfigyelő, ami mindent elindít
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initAnimations();
    initContactForm();
    initPortfolio();
    initThemeSwitcher();
    initUI();
    initParticles();
    
    // ÚJ: Parallax (Rellax) inicializálása
    if (window.innerWidth >= 768) { 
        // A teljes Hero szöveges konténer (h1, p.subtitle) és a kép megkapja a Parallax-ot.
        new Rellax('.hero-text h1, .hero-text .subtitle, .hero-text p:not(.subtitle), .hero-visual img', {
            // A sebességeket a data-rellax-speed attribútumokból veszi
        });
    }
});