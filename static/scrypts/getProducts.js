(async() => {
    const response = await fetch("./static/products.xml");
    const xmlStr = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr,"text/xml");
                        
    const products = xmlDoc.querySelectorAll("product");
    console.log(products.length);
    const productList = document.getElementsByClassName("products-list")[0];
    productList.innerHTML = "";

    products.forEach(product => {
    const category = product.getAttribute("category");
    const image = product.querySelector("imageSource").textContent;
    const name = product.querySelector("productName").textContent;
    const desc = product.querySelector("productDescription").textContent;
    const price = product.querySelector("price").textContent;

    const item = `
        <div class="products-list-item" data-category="${category}">
            <img src="${image}" alt="">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="products-item-footer">
                <span>${price} BYN</span>
                <div class="products-item-button">
                    <button type="button" class="buy-btn">Купить</button>
                </div>
            </div>
        </div>
        `;
    productList.innerHTML += item;
    });
})();                     