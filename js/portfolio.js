// js/portfolio.js (OPTIMALIZÁLT VERZIÓ)

const projects = []; // Ide jöhetnek a projekt objektumok

const portfolioGrid = document.getElementById('portfolio-grid');
const portfolioFilters = document.getElementById('portfolio-filters');

function displayProjects(projectList) {
    // 1. Kis animációs hatás a tartalomváltáshoz
    portfolioGrid.style.opacity = '0';
    
    setTimeout(() => {
        const htmlContent = projectList.map(project => `
            <div class="portfolio-card" data-aos="fade-up">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/600x400?text=Kép+betöltése...'">
                <div class="portfolio-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            </div>
        `).join('');

        portfolioGrid.innerHTML = htmlContent;
        portfolioGrid.style.opacity = '1';

        // 2. AOS újraindítása, hogy az új kártyák is animáljanak
        if (window.AOS) {
            window.AOS.refreshHard();
        }
    }, 200);
}

export function initPortfolio() {
    if (!portfolioGrid || !portfolioFilters) return;

    if (projects.length === 0) {
        renderPlaceholder();
        return;
    }

    renderFilters();
    displayProjects(projects);
}

function renderFilters() {
    const categories = ['Összes', ...new Set(projects.map(p => p.category))];
    const fragment = document.createDocumentFragment();

    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = category;
        button.dataset.category = category;
        if (category === 'Összes') button.classList.add('active');
        fragment.appendChild(button);
    });

    portfolioFilters.innerHTML = '';
    portfolioFilters.appendChild(fragment);

    portfolioFilters.addEventListener('click', handleFilterClick);
}

function handleFilterClick(e) {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCategory = btn.dataset.category;
    const filteredProjects = selectedCategory === 'Összes'
        ? projects
        : projects.filter(p => p.category === selectedCategory);
    
    displayProjects(filteredProjects);
}

function renderPlaceholder() {
    portfolioFilters.innerHTML = '';
    portfolioGrid.innerHTML = `
        <div class="portfolio-placeholder" data-aos="zoom-in">
            <i class="fas fa-code-branch"></i>
            <h3>Új munkák hamarosan...</h3>
            <p>Jelenleg a portfólióm frissítése zajlik. Hamarosan láthatod itt a legújabb projektjeimet!</p>
        </div>
    `;
}