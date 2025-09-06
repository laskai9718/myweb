// js/portfolio.js

// A projekt adatok, most már itt, a saját moduljukban
const projects = [];

const portfolioGrid = document.getElementById('portfolio-grid');
const portfolioFilters = document.getElementById('portfolio-filters');

function displayProjects(projectList) {
    portfolioGrid.innerHTML = ''; 
    projectList.forEach(project => {
        const projectCard = `
            <div class="portfolio-card" data-aos="fade-up">
                <img src="${project.image}" alt="${project.title}">
                <div class="portfolio-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            </div>
        `;
        portfolioGrid.innerHTML += projectCard;
    });
}

// Ezt a funkciót fogjuk exportálni, hogy a main.js meghívhassa
// js/portfolio.js

export function initPortfolio() {
    if (!portfolioGrid || !portfolioFilters) return;

    // ELLENŐRIZZÜK, HOGY VAN-E PROJEKT
    if (projects.length === 0) {
        // Ha nincs projekt, megjelenítjük a placeholder kártyát
        portfolioFilters.innerHTML = ''; // A szűrő gombokat is elrejtjük
        portfolioGrid.innerHTML = `
            <div class="portfolio-placeholder" data-aos="zoom-in">
                <i class="fas fa-code"></i>
                <h3>Új munkák hamarosan...</h3>
                <p>Jelenleg a portfólióm feltöltés alatt áll. Nézz vissza később a legfrissebb projektekért!</p>
            </div>
        `;
    } else {
        // Ha van projekt, lefuttatjuk a normál logikát
        // Szűrő gombok létrehozása
        const categories = ['Összes', ...new Set(projects.map(p => p.category))];
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = category;
            button.dataset.category = category;
            if (category === 'Összes') button.classList.add('active');
            portfolioFilters.appendChild(button);
        });

        // Szűrő gombok eseménykezelője
        portfolioFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                const selectedCategory = e.target.dataset.category;
                
                const filteredProjects = selectedCategory === 'Összes'
                    ? projects
                    : projects.filter(p => p.category === selectedCategory);
                
                displayProjects(filteredProjects);
            }
        });

        // Kezdeti megjelenítés
        displayProjects(projects);
    }
}