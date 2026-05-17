const CART_STORAGE_KEY = 'basket';

function getCart() {
    try {
        const data = localStorage.getItem(CART_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function updateBasketBadge() {
    const count = getCartCount();
    document.querySelectorAll('.basket').forEach((el) => {
        el.setAttribute('data-text', String(count));
    });
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateBasketBadge();
}

function addToCart(name, image, price) {
    const cart = getCart();
    const existing = cart.find((item) => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name,
            image,
            price: Number(price),
            quantity: 1,
        });
    }

    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateBasketBadge();
}

updateBasketBadge();

window.addEventListener('storage', (event) => {
    if (event.key === CART_STORAGE_KEY) {
        updateBasketBadge();
    }
});
