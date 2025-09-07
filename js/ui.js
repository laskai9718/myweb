// js/ui.js (FRISSÍTETT VERZIÓ)

export function initUI() {
    // Header zsugorítása
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('shrink', window.scrollY > 50);
        });
    }

    // --- INNEN KEZDŐDIK A MÓDOSÍTOTT RÉSZ ---

    // Vissza a tetejére gomb (ÚJ, GÖRGETÉSJELZŐS VERZIÓ)
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        const progressCircle = backToTopButton.querySelector('.progress-ring__circle');
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;

        const setProgress = (percent) => {
            const offset = circumference - (percent / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }

        window.addEventListener('scroll', () => {
            // Gomb megjelenítése/elrejtése
            backToTopButton.classList.toggle('show', window.scrollY > 300);

            // Folyamatjelző frissítése
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            setProgress(scrollPercent);
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- EDDIG TART A MÓDOSÍTOTT RÉSZ ---

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