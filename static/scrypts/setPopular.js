(async() => {
    const response = await fetch("./static/products.xml");
    const xmlStr = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr,"text/xml");
                        
    let products = Array.from(xmlDoc.querySelectorAll("product"));
    console.log(products.length);
    
    products.sort((a, b) => {
        let priceA = Number(a.querySelector("price").textContent);
        let priceB = Number(b.querySelector("price").textContent);
        return priceB - priceA; 
    });
    
    const productList = document.getElementsByClassName("products-info")[0];
    productList.innerHTML = "";
    
    for(let i = 0; i < 4 && i < products.length; i++){
        const image = products[i].querySelector("imageSource").textContent;
        const name = products[i].querySelector("productName").textContent;
        const desc = products[i].querySelector("productDescription").textContent;
        const price = products[i].querySelector("price").textContent;

        const item = `
            <div class="products-item">
                <img src="${image}" alt="">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="products-item-footer">
                    <span>${price} BYN</span>
                    <div class="products-item-button">
                        <a href="#">Купить</a>
                    </div>
                </div>
            </div>
            `;
        productList.innerHTML += item;
    }
})();