document.addEventListener('DOMContentLoaded', () => {
    // 1. Оновлюємо лічильник кошика на всіх сторінках
    updateCartCount();

    // 2. Головна сторінка (index.html) — рекомендації
    const recommendedContainer = document.getElementById('recommended-list');
    if (recommendedContainer) {
        renderRecommendations();
    }

    // 3. Сторінка каталогу (catalog.html) — повний список
    const catalogContainer = document.getElementById('product-list');
    if (catalogContainer) {
        if (records && records.length > 0) {
            renderProductList(records, 'product-list');
            console.log(`Каталог завантажено: ${records.length} товарів`);
        } else {
            catalogContainer.innerHTML = '<p>Каталог порожній. Перевірте data.js</p>';
        }
    }

    // 4. Сторінка детального перегляду товару
    if (window.location.pathname.includes('product.html')) {
        loadProductDetails();
    }

    // 5. Сторінка кошика
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
});

// Рекомендації для головної сторінки
function renderRecommendations() {
    if (!records || records.length === 0) {
        const container = document.getElementById('recommended-list');
        if (container) {
            container.innerHTML = '<p>Наразі немає рекомендацій</p>';
        }
        return;
    }

    // Можна зробити розумнішу логіку рекомендацій
    // Зараз — просто 6 найдорожчих + випадковий порядок
    const recommendations = [...records]
        .sort((a, b) => b.price - a.price)     // найдорожчі першими
        .slice(0, 8)                           // 6–8 позицій
        .sort(() => Math.random() - 0.5);      // випадковий порядок

    renderProductList(recommendations, 'recommended-list');
    console.log(`Рекомендації завантажено: ${recommendations.length} товарів`);
}

// Універсальна функція рендерингу списку товарів
function renderProductList(items, containerId = 'product-list') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Контейнер з id="${containerId}" не знайдено`);
        return;
    }

    container.innerHTML = '';

    if (!items || items.length === 0) {
        container.innerHTML = '<p>За вашим запитом нічого не знайдено</p>';
        return;
    }

    items.forEach(item => {
        const artistsNames = (item.artistIds || [])
            .map(aId => {
                const artist = artists?.find?.(a => a.id === aId);
                return artist?.name || 'Невідомий виконавець';
            })
            .filter(name => name !== 'Невідомий виконавець') // прибираємо помилкові
            .join(', ') || 'Виконавець не вказаний';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${item.coverUrl || 'images/placeholder-vinyl.jpg'}" 
                 alt="${item.title}" 
                 loading="lazy"
                 onerror="this.src='images/placeholder-vinyl.jpg'">
            <h3>${item.title}</h3>
            <p class="artist-year">${artistsNames} • ${item.year}</p>
            <p class="pressing-info">Прес: ${item.pressingYear || '—'} • Матриця: ${item.matrixNumberSideA || '—'}</p>
            <p class="price">${formatPrice(item.price)}</p>
            <div class="actions">
                <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">В кошик</button>
                <a href="product.html?id=${item.id}" class="details-link">Деталі</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Допоміжна функція форматування ціни
function formatPrice(price) {
    return typeof price === 'number'
        ? price.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH' })
        : '—';
}