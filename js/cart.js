let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const item = records.find(r => r.id === id);
    if (item && !cart.some(c => c.id === id)) {
        cart.push({ ...item, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Товар додано в кошик!');
    }
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const counts = document.querySelectorAll('.cart-count');
    counts.forEach(count => {
        const quantity = cart.length;
        count.textContent = quantity;
        count.style.display = quantity > 0 ? 'flex' : 'none';  // ховаємо, якщо 0
    });
}

function renderCart() {
    const list = document.getElementById('cart-list');
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.title} - ${formatPrice(item.price)}
            <button onclick="removeFromCart('${item.id}')">Видалити</button>
        `;
        list.appendChild(li);
        total += item.price;
    });
    document.getElementById('cart-total').textContent = `Загальна сума: ${formatPrice(total)}`;
}

function submitOrder() {
    alert('Замовлення імітується! Дані не надсилаються.');
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
    updateCartCount();
}