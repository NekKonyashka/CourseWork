const filterButtons = document.querySelectorAll('.products-filter button');


filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const productItems = document.querySelectorAll('.products-list-item');
        const selectedCategory = button.dataset.category;

        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        productItems.forEach((item) => {
            const itemCategory = item.dataset.category;
            const showItem = selectedCategory === 'all' || itemCategory === selectedCategory;

            item.style.display = showItem ? '' : 'none';
        });
    });
});