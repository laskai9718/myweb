// js/animations.js (OPTIMALIZÁLT VERZIÓ)

export function initAnimations() {
    // 1. AOS Inicializálása extra finomhangolással
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,        // 1000-ről 800-ra, a dinamikusabb érzetért
            easing: 'ease-out',   // A böngészőnek könnyebb kiszámolni
            once: true,           // Csak egyszer fut le görgetéskor
            offset: 50,           // Picit előbb elindul az animáció
            disableMutationObserver: false // Figyeli a DOM változásokat (pl. sötét mód váltás)
        });
    }

    // 2. Optimalizált Gépelő Animáció
    function typingEffect(element, text, speed = 80) {
        let i = 0;
        element.textContent = '';
        element.style.visibility = 'visible'; // Megmutatjuk, ha elkezdődik

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('typing-done');
            }
        }
        type();
    }

    // 3. Intelligens indítás (Intersection Observer)
    const subtitleElement = document.querySelector('.hero-text .subtitle');
    
    if (subtitleElement) {
        const originalText = subtitleElement.textContent;
        // Alaphelyzetben láthatatlanná tesszük, hogy ne ugorjon a szöveg
        subtitleElement.textContent = ''; 
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Csak akkor gépel, ha a felhasználó látja a Hero-t
                    setTimeout(() => typingEffect(subtitleElement, originalText), 400);
                    observer.unobserve(entry.target); // Csak egyszer futtatjuk le
                }
            });
        }, { threshold: 0.5 }); // 50%-os láthatóságnál indul

        observer.observe(subtitleElement);
    }
}