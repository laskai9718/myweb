// js/main.js

// Importáljuk a funkciókat a többi modulból
import { initAnimations } from './animations.js';
import { initCalendar } from './calendar.js';
import { initContactForm } from './contact-form.js';
import { initPortfolio } from './portfolio.js';
import { initThemeSwitcher } from './theme.js';
import { initUI } from './ui.js';
import { initParticles } from './particles-init.js';
import { initPreloader } from './preloader.js';

// Fő eseményfigyelő, ami mindent elindít
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initAnimations();
    initCalendar();
    initContactForm();
    initPortfolio();
    initThemeSwitcher();
    initUI();
    initParticles();
});