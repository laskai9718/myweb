// js/ui.js (TELJES, FRISSÍTETT VERZIÓ)

export function initUI() {
    // Header zsugorítása
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('shrink', window.scrollY > 50);
        });
    }

    // Vissza a tetejére gomb (GÖRGETÉSJELZŐS VERZIÓ)
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
            backToTopButton.classList.toggle('show', window.scrollY > 300);
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            setProgress(scrollPercent);
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

 // Mobil menü kezelése
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainNavLinks = document.getElementById('main-nav-links');
const menuIcon = mobileMenuToggle.querySelector('i'); // Az ikon kijelölése

if (mobileMenuToggle && mainNavLinks) {
    // Nyitás és zárás a gombbal
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Megállítjuk az eseményt, hogy ne fusson bele a lenti zárásba
        mainNavLinks.classList.toggle('active');
        
        // Ikon cseréje: bars -> times (X)
        if (mainNavLinks.classList.contains('active')) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Menü bezárása, ha rákattintunk egy konkrét linkre
    const navLinks = mainNavLinks.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNavLinks.classList.remove('active');
            menuIcon.classList.replace('fa-times', 'fa-bars');
        });
    });

    // Opcionális: Bezárás, ha a menün kívülre kattintunk
    document.addEventListener('click', (e) => {
        if (!mainNavLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mainNavLinks.classList.remove('active');
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });
}
    
    // Scrollspy (menüpont kiemelése)
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

    // === ÚJ RÉSZ: MODÁLIS ABLAK KEZELÉSE ===
    const openModalLink = document.getElementById('open-privacy-modal');
    const modalOverlay = document.getElementById('privacy-modal-overlay');
    const closeModalButton = document.getElementById('modal-close-button');

    if (openModalLink && modalOverlay && closeModalButton) {
        // A modál megnyitásakor:
        openModalLink.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('show-modal');
            document.body.style.overflow = 'hidden'; // Háttér görgetés letiltása
        });

        // A bezáráskor (minden bezáró eseménynél):
        const closeModal = () => {
            modalOverlay.classList.remove('show-modal');
            document.body.style.overflow = ''; // Visszaállítja az eredeti állapotot
        };

        // Eseményfigyelő a háttérre kattintásra: szintén bezárja a modált
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('show-modal');
            }
        });
    }
    // === EDDIG TART AZ ÚJ RÉSZ ===

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