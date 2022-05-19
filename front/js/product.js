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
.then(function(article){
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
    productColor.productColor = color;
    productColor.innerHTML = color;
  }
}
/*gestion du panier */
let addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", function() {

  let productAdded = {
    id: productId,
    color: document.querySelector("#colors").value,
    quantity: parseInt(document.querySelector("#quantity").value),
  }

  let cart = JSON.parse(localStorage.getItem("product"))


  const addProduct = () => {
    cart.push(productAdded);
    localStorage.setItem("product", JSON.stringify(cart));
  }

  /*si le panier existe déjà*/
  if(cart){
    const foundProduct = cart.find( (p) => p.id ==id && p.color == document.querySelector("#color").value)
    /*si le produit est déjà dans le panier*/
    if (foundProduct){
      let newQuantity = foundProduct.quantity + productAdded.quantity;
      foundProduct.quantity = newQuantity;
      addProduct();
    }
    /*si le produit n'est pas encore dans le panier*/
    else{
      addProduct();
    }
  }
  /*si le panier est vide*/
  else{
    cart = [];
    addProduct();
  }
  
})