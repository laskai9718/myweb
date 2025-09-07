// js/preloader.js

export function initPreloader() {
    const preloader = document.getElementById('preloader');

    if (!preloader) return;

    window.addEventListener('load', () => {
        // Amikor az oldal teljesen betöltődött, adjuk hozzá az elrejtő osztályt
        preloader.classList.add('preloader-hidden');

        // Opcionális: A DOM-ból is kitörölhetjük az animáció után
        // preloader.addEventListener('transitionend', () => {
        //     preloader.remove();
        // });
    });
}