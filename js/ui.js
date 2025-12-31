// js/ui.js (OPTIMALIZÁLT ÉS TELJES VERZIÓ)

export function initUI() {
    // DOM elemek gyorsítótárazása
    const header = document.getElementById('main-header');
    const backToTopButton = document.getElementById('back-to-top');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavLinks = document.getElementById('main-nav-links');
    const modalOverlay = document.getElementById('privacy-modal-overlay');
    const consentBanner = document.getElementById('cookie-consent-banner');

    // --- 1. GÖRGETÉSSEL KAPCSOLATOS LOGIKA (OPTIMALIZÁLT) ---
    let isScrolling = false;

    const handleScroll = () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Header zsugorítása
                if (header) header.classList.toggle('shrink', scrollY > 50);

                // Back to top & Progress circle
                if (backToTopButton) {
                    backToTopButton.classList.toggle('show', scrollY > 300);
                    updateProgress();
                }

                // Scrollspy
                highlightMenu(scrollY);

                isScrolling = false;
            });
            isScrolling = true;
        }
    };

    const updateProgress = () => {
        const progressCircle = backToTopButton.querySelector('.progress-ring__circle');
        if (!progressCircle) return;
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollHeight) * 100;
        const offset = circumference - (scrollPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    };

    const highlightMenu = (scrollY) => {
        const sections = document.querySelectorAll('main section[id]');
        const navLinks = document.querySelectorAll('.main-nav-links a');
        let currentId = '';
        const hHeight = header ? header.offsetHeight : 80;

        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop - hHeight - 10) {
                currentId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${currentId}`);
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- 2. MOBIL MENÜ ---
    if (mobileMenuToggle && mainNavLinks) {
        const menuIcon = mobileMenuToggle.querySelector('i');
        
        const toggleMenu = (forceClose = false) => {
            const isOpen = forceClose ? false : mainNavLinks.classList.toggle('active');
            if (forceClose) mainNavLinks.classList.remove('active');
            
            menuIcon.classList.toggle('fa-times', isOpen);
            menuIcon.classList.toggle('fa-bars', !isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        mainNavLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => toggleMenu(true)));
        
        document.addEventListener('click', (e) => {
            if (!mainNavLinks.contains(e.target) && mainNavLinks.classList.contains('active')) toggleMenu(true);
        });
    }

    // --- 3. MODÁLIS ABLAK ---
    const openModal = document.getElementById('open-privacy-modal');
    if (openModal && modalOverlay) {
        const toggleModal = (show) => {
            modalOverlay.classList.toggle('show-modal', show);
            document.body.style.overflow = show ? 'hidden' : '';
        };

        openModal.addEventListener('click', (e) => { e.preventDefault(); toggleModal(true); });
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay || e.target.closest('#modal-close-button')) toggleModal(false);
        });

        // Billentyűzet figyelés (ESC)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('show-modal')) toggleModal(false);
        });
    }

    // --- 4. SÜTI SÁV ---
    if (consentBanner && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => consentBanner.classList.add('show'), 2000);
        document.getElementById('cookie-consent-accept').addEventListener('click', () => {
            consentBanner.classList.remove('show');
            localStorage.setItem('cookieConsent', 'true');
        });
    }

    // Back to top click
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}