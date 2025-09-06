// js/theme.js (FRISSÍTETT VERZIÓ)

export function initThemeSwitcher() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeLabel = document.querySelector('.theme-label'); // ÚJ: Elérjük a szöveges címkét
    if (!themeToggleButton || !themeLabel) return;

    // 1. Alkalmazza a témát ÉS frissíti a szöveget
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeLabel.textContent = 'Világos Mód'; // ÚJ
        } else {
            document.body.classList.remove('dark-mode');
            themeLabel.textContent = 'Sötét Mód'; // ÚJ
        }
    };
    
    // 2. Betölti a mentett témát
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // 3. Eseményfigyelő a gombkattintásra
    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}