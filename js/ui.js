// js/ui.js (VÉGLEGES, OPTIMALIZÁLT ÉS SEO-BARÁT)

export function initUI() {
    // DOM elemek gyorsítótárazása a gyorsabb elérés érdekében
    const header = document.getElementById('main-header');
    const backToTopButton = document.getElementById('back-to-top');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavLinks = document.getElementById('main-nav-links');
    const modalOverlay = document.getElementById('privacy-modal-overlay');
    const consentBanner = document.getElementById('cookie-consent-banner');

    // --- 1. GÖRGETÉSSEL KAPCSOLATOS LOGIKA (Folyékony futás) ---
    let isScrolling = false;

    const handleScroll = () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Header animáció (shrink osztály)
                if (header) {
                    header.classList.toggle('shrink', scrollY > 50);
                }

                // Vissza a tetejére gomb megjelenítése
                if (backToTopButton) {
                    backToTopButton.classList.toggle('show', scrollY > 300);
                    updateProgress();
                }

                // Menüpontok automatikus kiemelése görgetéskor
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
            const sectionTop = sec.offsetTop - hHeight - 20;
            if (scrollY >= sectionTop) {
                currentId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${currentId}`);
        });
    };

    // Passive listener használata a jobb görgetési teljesítményért
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- 2. MOBIL MENÜ KEZELÉSE ---
    if (mobileMenuToggle && mainNavLinks) {
        const menuIcon = mobileMenuToggle.querySelector('i');
        
        const toggleMenu = (forceClose = false) => {
            const isOpen = forceClose ? false : mainNavLinks.classList.toggle('active');
            if (forceClose) mainNavLinks.classList.remove('active');
            
            // Ikon váltása (bars -> times)
            if (menuIcon) {
                menuIcon.classList.toggle('fa-times', isOpen);
                menuIcon.classList.toggle('fa-bars', !isOpen);
            }
            
            // Görgetés letiltása, ha nyitva a menü
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Menü bezárása kattintás után (navigációkor)
        mainNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
        
        // Kattintás kívülre bezárja a menüt
        document.addEventListener('click', (e) => {
            if (!mainNavLinks.contains(e.target) && mainNavLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });
    }

    // --- 3. ADATVÉDELMI MODAL (SEO JAVÍTÁSSAL) ---
    const openModalLink = document.getElementById('open-privacy-modal');
    if (openModalLink && modalOverlay) {
        const toggleModal = (show) => {
            modalOverlay.classList.toggle('show-modal', show);
            document.body.style.overflow = show ? 'hidden' : '';
        };

        // KRITIKUS: e.preventDefault() megakadályozza a PageSpeed SEO hibáját
        openModalLink.addEventListener('click', (e) => { 
            e.preventDefault(); 
            toggleModal(true); 
        });
        
        // Bezárás az overlay-re vagy a X gombra kattintva
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay || e.target.closest('#modal-close-button')) {
                toggleModal(false);
            }
        });

        // Bezárás ESC billentyűvel
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('show-modal')) {
                toggleModal(false);
            }
        });
    }

    // --- 4. SÜTI (COOKIE) SÁV KEZELÉSE ---
    if (consentBanner && !localStorage.getItem('cookieConsent')) {
        // 2 másodperc késleltetés a jobb Speed Index pontszámért
        setTimeout(() => {
            consentBanner.classList.add('show');
        }, 2000);

        const acceptBtn = document.getElementById('cookie-consent-accept');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                consentBanner.classList.remove('show');
                localStorage.setItem('cookieConsent', 'true');
            });
        }
    }

    // Vissza a tetejére gomb kattintás eseménye
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}