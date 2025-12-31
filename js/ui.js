// js/ui.js (OPTIMALIZÁLT ÉS SEO-BARÁT)

export function initUI() {
    const header = document.getElementById('main-header');
    const backToTopButton = document.getElementById('back-to-top');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavLinks = document.getElementById('main-nav-links');
    const modalOverlay = document.getElementById('privacy-modal-overlay');
    const consentBanner = document.getElementById('cookie-consent-banner');

    // --- 1. GÖRGETÉS (requestAnimationFrame-el a sima futásért) ---
    let isScrolling = false;
    const handleScroll = () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (header) header.classList.toggle('shrink', scrollY > 50);
                if (backToTopButton) {
                    backToTopButton.classList.toggle('show', scrollY > 300);
                    updateProgress();
                }
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
        mobileMenuToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        mainNavLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => toggleMenu(true)));
        document.addEventListener('click', (e) => {
            if (!mainNavLinks.contains(e.target) && mainNavLinks.classList.contains('active')) toggleMenu(true);
        });
    }

    // --- 3. MODÁLIS ABLAK (SEO JAVÍTÁS) ---
    const openModal = document.getElementById('open-privacy-modal');
    if (openModal && modalOverlay) {
        const toggleModal = (show) => {
            modalOverlay.classList.toggle('show-modal', show);
            document.body.style.overflow = show ? 'hidden' : '';
        };

        // Itt a javítás: e.preventDefault() biztosítja, hogy a horgony ne ugorjon
        openModal.addEventListener('click', (e) => { 
            e.preventDefault(); 
            toggleModal(true); 
        });
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay || e.target.closest('#modal-close-button')) toggleModal(false);
        });

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

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}