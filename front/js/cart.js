/* récupérer le contenu du local storage */
let cart = JSON.parse(localStorage.getItem("product"))

/*TODO : boucle dans le panier*/

/*récupérer l'ID*/
let productId = cart[product].id
/*aller chercher le produit correspondant dans l'api*/
fetch("http://localhost:3000/api/products/" + productId)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function (product){

    });

/*afficher le produit*/

    let article = document.createElement("article");
    document.querySelector("#cart_items").appendChild(article);
    article.className = "cart_item";
    article.setAttribute('data-id', productId);
    article.setAttribute('data-color', cart[product].color);

    let divImg = document.createElement("div");
    article.appendChild(divImg);
    divImg.className = "cart__item__img";

    let img = document.createElement("img");
    divImg.appendChild(img);
    img.src = product.imageUrl;
    img.alt = product.altTxt;

    let content = document.createElement("div");
    article.appendChild(content);
    content.className = "cart__item__content";

    let description = document.createElement("div");
    content.appendChild(description);
    content.className = "cart__item__content__description";

    let title = document.createElement("h2");
    description.appendChild(title);
    title.innerText = product.name;
    
    let color = document.createElement("p");
    description.appendChild(color);
    color.innerText = cart[product].color;

    let price = document.createElement("p");
    description.appendChild(price);
    price.innerText = product.price;

    let settings = document.createElement("div");
    content.appendChild(settings);
    settings.className = "cart__item__content__settings";

    let quantityDiv = document.createElement("div");
    settings.appendChild(quantityDiv);
    quantityDiv.className ="cart__item__content__settings__quantity";

    let quantityP = document.createElement("p");
    quantityDiv.appendChild(quantityP);
    quantityP.innerText = "Qté : ";

    let quantity = document.createElement("input");
    quantityDiv.appendChild(quantity);
    quantity = cart[product].quantity;
    quantity.className = "itemQuantity";
    quantity.setAttribute("type", "number");
    quantity.setAttribute("min", "1");
    quantity.setAttribute("max", "100");
    quantity.setAttribute("name", "itemQuantity");

    let settingDelete = document.createElement("div");
    settings.appendChild(settingDelete);
    settingDelete.className = "cart__item__content__settings__delete";

    let deleteItem = document.createElement("p");
    settingDelete.appendChild(deleteItem);
    deleteItem.className = "deleteItem";