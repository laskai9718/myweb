// js/preloader.js (OPTIMALIZÁLT ÉS BIZTONSÁGOS VERZIÓ)

export function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Görgetés tiltása a betöltés alatt
    document.body.style.overflow = 'hidden';

    const hidePreloader = () => {
        preloader.classList.add('preloader-hidden');
        document.body.style.overflow = ''; // Görgetés visszaállítása

        // Eltávolítás a DOM-ból a teljesítményért
        preloader.addEventListener('transitionend', () => {
            preloader.remove();
        }, { once: true });
    };

    // 1. Biztonsági mentés: 3 mp után mindenképp tűnjön el (ha a JS elakadna)
    const backupTimeout = setTimeout(hidePreloader, 3000);

    // 2. Normál betöltési folyamat (pl. képek és erőforrások után)
    window.addEventListener('load', () => {
        // Minimum 500ms késleltetés, hogy ne legyen vibrálás (flickering)
        setTimeout(() => {
            clearTimeout(backupTimeout); // Töröljük a biztonsági időzítőt
            hidePreloader();
        }, 500);
    });
}