function animateBuyButton(button) {
    const wrapper = button.closest('.products-item-button');
    if (!wrapper) return;

    wrapper.classList.remove('buy-btn--added');
    void wrapper.offsetWidth;
    wrapper.classList.add('buy-btn--added');

    window.setTimeout(() => {
        wrapper.classList.remove('buy-btn--added');
    }, 500);
}

document.addEventListener('click', (event) => {
    const button = event.target.closest('.buy-btn');
    if (!button) return;

    const card = button.closest('.products-list-item') || button.closest('.products-item');
    if (!card) return;

    const name = card.querySelector('h3')?.textContent.trim();
    const image = card.querySelector('img')?.getAttribute('src');
    const priceText = card.querySelector('.products-item-footer span')?.textContent;
    const price = parseFloat(priceText);

    if (!name || !image || Number.isNaN(price)) return;

    addToCart(name, image, price);
    animateBuyButton(button);
});
