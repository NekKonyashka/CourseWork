const BASKET_EMPTY_HTML = '<p class="basket-empty">Корзина пуста</p>';

function formatPrice(value) {
    return `${value} BYN`;
}

function showEmptyBasket() {
    const container = document.querySelector('.basket-card');
    if (container) container.innerHTML = BASKET_EMPTY_HTML;
}

function renderBasket() {
    const container = document.querySelector('.basket-card');
    if (!container) return;

    const cart = getCart();

    if (!cart.length) {
        showEmptyBasket();
        return;
    }
    let total = 0;

    const itemsHtml = cart
        .map((item) => {
            total += item.price * item.quantity;
            return `
                <article class="card-item">
                    <img class="card-item__image" src="${item.image}" alt="${item.name}">
                    <div class="card-item__body">
                        <h3 class="card-item__name">${item.name}</h3>
                        <p class="card-item__price">${formatPrice(item.price)}</p>
                    </div>
                    <span class="card-item__quantity">${item.quantity} шт.</span>
                </article>
            `;
        })
        .join('');

    container.innerHTML = `
        <div class="basket-items">${itemsHtml}</div>
        <div class="basket-total">
            <span class="basket-total__label">Итого</span>
            <span class="basket-total__sum">${formatPrice(total)}</span>
        </div>
        <div class="basket-actions">
            <button type="button" class="basket-btn basket-btn--clear">Очистить корзину</button>
            <button type="button" class="basket-btn basket-btn--pay">Оплатить</button>
        </div>
    `;
}

function clearBasketView() {
    clearCart();
    showEmptyBasket();
}
document.querySelector('.basket-card')?.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('basket-btn--clear')) {
        clearBasketView();
        return;
    }

    if (target.classList.contains('basket-btn--pay')) {
        alert('Оплата прошла успешно!');
        clearBasketView();
    }
});

renderBasket();
