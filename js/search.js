console.log("search.js завантажено");

// Знаходимо елементи на сторінці
const searchInput = document.querySelector('#search-input');
const productContainers = {
    index: document.getElementById('recommended-list'),
    catalog: document.getElementById('product-list')
};
const searchInfo = document.getElementById('search-info');
const searchCount = document.getElementById('search-count');
const noResults = document.getElementById('no-results');
const sectionTitle = document.getElementById('section-title');

// Визначаємо поточну сторінку
const isIndexPage = !!productContainers.index;
const currentContainer = isIndexPage ? productContainers.index : productContainers.catalog;

function performSearch(query) {
    console.log("Пошук за:", query);

    const container = document.getElementById('recommended-list');
    if (!container) {
        console.warn("Контейнер recommended-list не знайдено");
        return;
    }

    // Якщо запит порожній — показуємо рекомендації
    if (!query?.trim()) {
        sectionTitle.textContent = "Рекомендації та новинки";
        searchInfo.style.display = 'none';
        noResults.style.display = 'none';
        
        renderRecommendations(); 
        return;
    }

    const lowerQuery = query.toLowerCase().trim();

    const filtered = records.filter(r => {
        const titleMatch = r.title?.toLowerCase().includes(lowerQuery) || false;
        
        const artistMatch = (r.artistIds || []).some(aId => {
            const artist = artists.find(a => a.id === aId);
            return artist?.name?.toLowerCase().includes(lowerQuery) || false;
        });
        
        const trackMatch = (r.tracklist || []).some(t => 
            t.t?.toLowerCase().includes(lowerQuery) || false
        );

        return titleMatch || artistMatch || trackMatch;
    });

    console.log("Знайдено:", filtered.length);

    // Оновлюємо заголовок та інформацію
    sectionTitle.textContent = `Результати пошуку: "${query}"`;
    searchInfo.style.display = 'block';
    searchCount.textContent = filtered.length;

    // Показуємо/ховаємо повідомлення про відсутність результатів
    noResults.style.display = filtered.length === 0 ? 'block' : 'none';

    // Рендеримо знайдені товари!
    renderProductList(filtered, 'recommended-list');
}

// Показуємо/ховаємо елементи пошуку
function showSearchUI(count) {
    if (searchInfo) searchInfo.style.display = 'block';
    if (noResults) noResults.style.display = count === 0 ? 'block' : 'none';
}

function hideSearchUI() {
    if (searchInfo) searchInfo.style.display = 'none';
    if (noResults) noResults.style.display = 'none';
    if (isIndexPage && sectionTitle) {
        sectionTitle.textContent = 'Рекомендації та новинки';
    }
}

// Ініціалізація пошуку
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
} else {
    console.warn("Поле #search-input не знайдено");
}

// Експортуємо функції для інших скриптів
window.performSearch = performSearch;
window.isIndexPage = isIndexPage;