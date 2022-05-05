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