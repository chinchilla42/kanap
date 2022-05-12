let url = new URL(window.location.href);
let productId = url.searchParams.get("id");
//console.log(productId);

/* récupérer le produit demandé grâce à son id passé en url */
fetch("http://localhost:3000/api/products/" + productId)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(product){
  article = product;
  if (article){
    display(article);
  }
})

/*afficher les informations sur le produit*/
function display(article){
  let productImage = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImage);
  productImage.src = article.imageUrl;
  productImage.alt = article.altTxt;
  
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

/*boucle pour récupérer et afficher les options de couleurs du produit*/
  for (let color of article.colors){
    //console.log(color);
    let productColor = document.createElement("option");
    document.querySelector("#colors").appendChild(productColor);
    productColor.value = color;
    productColor.innerHTML = color;
  }

}

/*gestion du panier*/
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  let cart = localStorage.getItem("cart");
  /*s'il n'y a pas de panier, le créer en retournant un tableau vide*/
  if (cart == null) {
    return [];
  }
  /*sinon, retourner le panier*/
  else {
    return JSON.parse(cart);
  }
}

function addToCart(product) {
  let cart = getCart();
  /*verifier la quantité du même prduit*/
  let foundProduct =cart.find(p => p.id == product.id);
  if (foundProduct != undefined){
    foundProduct.quantity++;
  }
  else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart(cart);
}

/*let product = {
  id: productId,
  name: productName,
  description: productDescription,
  img: productImage.src,
  altImg: productImage.alt,
  color: productColor.value,
  //quantity: ,
}
console.log(produit)*/

let addToCartButton = document.getElementById("addToCart");

/*addToCartButton.addEventListener("click"){
  addToCart(product);
};*/
