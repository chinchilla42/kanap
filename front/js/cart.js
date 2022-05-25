/* récupérer le contenu du local storage */
let cart = JSON.parse(localStorage.getItem("product"))
//console.table(cart)

/*boucle dans le panier pour traiter chaque produit*/
if (cart){
  for (let product of cart)
  {
    
    /*récupérer les info du produit dans le local storage*/
    let item =
    {
      id : product.id,
      color : product.color,
      quantity : product.quantity,
    }
    //console.log(item)

    /*aller chercher le produit correspondant dans l'api*/
    fetch("http://localhost:3000/api/products/" + item.id)
    .then(function(res) 
    {
        if (res.ok) 
        {
          return res.json();
        }
    })
    .then(function (product)
    {
      //console.table(product)

      /*afficher le produit*/
        let article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.className = "cart__item";
        article.setAttribute('data-id', item.id);
        article.setAttribute('data-color', item.color);

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
        color.innerText = item.color;

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
        quantity.setAttribute("type", "number");
        quantity.className = "itemQuantity";
        quantity.setAttribute("name", "itemQuantity");
        quantity.setAttribute("min", "1");
        quantity.setAttribute("max", "100");
        quantity.setAttribute("value", item.quantity);

        let settingDelete = document.createElement("div");
        settings.appendChild(settingDelete);
        settingDelete.className = "cart__item__content__settings__delete";

        let deleteItem = document.createElement("p");
        settingDelete.appendChild(deleteItem);
        deleteItem.className = "deleteItem";
        deleteItem.textContent = "Supprimer";
    })
  }
}

/* modif quantité */
let modifyQuantity = document.querySelectorAll ("#itemQuantity");
modifyQuantity.addeventlistener("change", function){

}

/*supprimer : 
let deleteItem = document.querySelector("#)
element.closest avec id et couleur


important : modifier DOM et local storage
*/

/*total
pour chaque article
prix * quantité
 ajouté à total général*/


 /*formulaire
 regex
 message d'erreur
 objet contact et tableau de produits
 */
