// js/ui.js (JAVÍTOTT VERZIÓ)

export function initUI() {
    // Header zsugorítása
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('shrink', window.scrollY > 50);
        });
    }

    // Vissza a tetejére gomb
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('show', window.scrollY > 300);
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobil menü
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavLinks = document.getElementById('main-nav-links');
    if (mobileMenuToggle && mainNavLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNavLinks.classList.toggle('active');
        });
        mainNavLinks.addEventListener('click', () => {
            if (mainNavLinks.classList.contains('active')) {
                mainNavLinks.classList.remove('active');
            }
        });
    }
    
    // Scrollspy (menüpont kiemelése) - JAVÍTVA
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.main-nav-links a');
    if (sections.length > 0 && navLinks.length > 0) {
        const highlightMenu = () => {
            let currentSectionId = '';
            const headerHeight = header ? header.offsetHeight : 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - headerHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5;
            if (isAtBottom) {
                const lastSection = sections[sections.length - 1];
                currentSectionId = lastSection.getAttribute('id');
            }
            
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active-link');
                }
            });
        };
        window.addEventListener('scroll', highlightMenu);
        highlightMenu();
    }

    // Süti sáv
    const consentBanner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('cookie-consent-accept');
    if (consentBanner && acceptButton) {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                consentBanner.classList.add('show');
            }, 2000);
        }
        acceptButton.addEventListener('click', () => {
            consentBanner.classList.remove('show');
            localStorage.setItem('cookieConsent', 'true');
        });
    }
}