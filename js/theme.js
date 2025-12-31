// js/theme.js (OPTIMALIZÁLT VERZIÓ)

export function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.querySelector('.theme-label');
    if (!themeToggle) return;

    /**
     * Téma alkalmazása és UI elemek frissítése
     */
    const updateUI = (theme) => {
        const isDark = theme === 'dark';
        
        // CSS osztály frissítése
        document.body.classList.toggle('dark-mode', isDark);
        
        // Szöveges címke frissítése (ha létezik)
        if (themeLabel) {
            themeLabel.textContent = isDark ? 'Világos Mód' : 'Sötét Mód';
        }

        // Akadálymentesítés: gomb feliratának frissítése
        themeToggle.setAttribute('aria-label', isDark ? 'Váltás világos módra' : 'Váltás sötét módra');
    };

    /**
     * Kezdeti beállítás
     * Megjegyzés: A villanás elkerülése érdekében érdemes a localStorage 
     * ellenőrzést egy inline scriptben is elhelyezni a <head>-ben.
     */
    const getInitialTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    updateUI(getInitialTheme());

    /**
     * Eseménykezelő
     */
    themeToggle.addEventListener('click', () => {
        // Átmeneti animáció tiltása a villanás ellen (opcionális finomítás)
        document.documentElement.classList.add('theme-transitioning');
        
        const isDark = document.body.classList.contains('dark-mode');
        const newTheme = isDark ? 'light' : 'dark';
        
        updateUI(newTheme);
        localStorage.setItem('theme', newTheme);

        // Átmeneti osztály eltávolítása rövid idő után
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    });
}