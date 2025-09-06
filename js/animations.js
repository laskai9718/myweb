// js/animations.js (FRISSÍTETT VERZIÓ)

export function initAnimations() {
    // AOS inicializálása
    AOS.init({
        duration: 1000,
        easing: 'ease-out-quad',
        once: true
    });

    // Gépelő animáció
    function typingEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.classList.add('typing-done'); 
            }
        }, speed);
    }

    // Itt van a javítás: .hero-content helyett .hero-text
    const subtitleElement = document.querySelector('.hero-text .subtitle');
    if (subtitleElement) {
        const originalText = subtitleElement.textContent;
        setTimeout(() => typingEffect(subtitleElement, originalText), 600);
    }
}