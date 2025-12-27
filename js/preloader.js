// js/preloader.js (JAVÍTVA ÉS TISZTÍTVA)

export function initPreloader() {
    const preloader = document.getElementById('preloader');

    if (!preloader) return;

    // FONTOS JAVÍTÁS: Nincs itt szükség a DOMContentLoaded-re, mert 
    // a main.js már DOMContentLoaded után hívja meg. 
    // Egyszerűen futtassa a késleltetést.
    
    // Minimum 500 ms várakozás, hogy az animáció ne csak egy pillanat legyen
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');

        // Opcionális: A DOM-ból is kitörölhetjük az animáció után
        preloader.addEventListener('transitionend', () => {
             preloader.remove(); 
        });

    }, 500); // 0.5 másodperces minimum megjelenés
}