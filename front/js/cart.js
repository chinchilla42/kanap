/* récupérer le contenu du local storage */
const cart = JSON.parse(localStorage.getItem("product"));
//console.table(cart)

/*boucle dans le panier pour traiter chaque produit*/
async function displayCart() 
{
  /*si le panier contient quelque chose*/
  if (cart)
  {
    let totalCartPrice = 0;

    for (let product of cart) 
    {
      /*récupérer les informations du produit dans le local storage*/
      let item =
      {
        id: product.id,
        color: product.color,
        quantity: product.quantity,
      }
      //console.log(item)

      /*aller chercher le produit correspondant dans l'api*/
      fetch("http://localhost:3000/api/products/" + item.id)
        .then(function (res) 
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
          price.innerText = product.price + " €";
          let productPrice = product.price;
          //console.log(productPrice);

          let settings = document.createElement("div");
          content.appendChild(settings);
          settings.className = "cart__item__content__settings";

          let quantityDiv = document.createElement("div");
          settings.appendChild(quantityDiv);
          quantityDiv.className = "cart__item__content__settings__quantity";

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


          quantity.addEventListener("change", (f) =>
          {
            f.preventDefault();
            let idToChange = item.id;
            let colorToChange = item.color;
            cartContent = cart.find((p) => p.id === idToChange)  && cart.find((p) => p.color === colorToChange);
            //console.log(cartContent);
              if (cartContent)
             {
              //console.log(cartContent.quantity);
              //console.log(Number(quantity.value)); 
              cartContent.quantity = Number(quantity.value);
              //console.log(cartContent.quantity);
              //console.log(cartContent); 
              localStorage.setItem("product", JSON.stringify(cart));
             }
             else
             {
              cart.push(product);
              localStorage.setItem("product", JSON.stringify(cart));
             }
             reloadPage();
          })

          let settingDelete = document.createElement("div");
          settings.appendChild(settingDelete);
          settingDelete.className = "cart__item__content__settings__delete";

          let deleteItem = document.createElement("p");
          settingDelete.appendChild(deleteItem);
          deleteItem.className = "deleteItem";
          deleteItem.textContent = "Supprimer";
      
           /*supprimer un article du panier*/
           deleteItem.addEventListener("click", (e) => 
           {
              e.preventDefault();
              let idToDelete = item.id;
              let colorToDelete = item.color;
              //console.log(idToDelete);
              //console.log(colorToDelete);
              cartContent = cart.filter(el => el.id != idToDelete || el.color != colorToDelete);
              e.target.closest(".cart__item").remove();
              localStorage.setItem("product", JSON.stringify(cartContent));
              reloadPage();
            });
          //console.log(quantity.value);
          //console.log(productPrice);
          totalCartPrice += quantity.value * productPrice;
          //console.log(totalCartPrice);
          let totalPrice = document.getElementById("totalPrice");
          totalPrice.innerText = totalCartPrice;
        })
    }
  }
}
displayCart();


function reloadPage()
{
  document.location.reload();
}

/*calculer le nombre total d'articles dans le panier*/
async function getTotals() 
{
  let articleQuantity = cart;
  let totalArticles = 0;

  for (let product of articleQuantity) 
  {
    totalArticles += Number(product.quantity);
  }
    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalArticles;
}
getTotals();

/*formulaire

/*regex
let nameRegex = /^[a-zA-Z\-\’]+$/;
let addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
let emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

/*messages d'erreur
let firstNameError = document.getElementById("firstNameErrorMsg");
let lastNameError = document.getElementById("lastNameErrorMsg");
let addressError = document.getElementById("addressErrorMsg");
let cityError = document.getElementById("cityErrorMsg")
let emailError = document.getElementById("emailErrorMsg");


let form = document.querySelector(".cart__order__form");


form.firstName.addEventListener("change", () => 
{
  if (nameRegex.test(firstName).value == false) 
  {
    firstNameError.innerText = "Le prénom doit commencer par une majuscule, contenir uniquement des lettres et au moins 2 caratères";
  }

})

form.firstName.addEventListener("change", () => 
{
  if (nameRegex.test(lastName).value == false) 
  {
    lastNameError.innerText = "Le nom doit commencer par une majuscule, contenir uniquement des lettres et au moins 2 caratères"
  }
})

form.address.addEventListener("change", () => 
{
  if (addressRegex.test(address).value == false) 
  {
    addressError.innerText = "Format d'adresse invalide";
  }
})

form.city.addEventListener("change", () => 
{
  if (nameRegex.test(city).value == false) 
  {
    cityError.innerText = "nom de ville inconnu";
  }
})

form.email.addEventListener("change", () => 
{
  if (emailRegex.test(email).value == false) 
  {
    emailError.innerText = "format d'email invalide";
  }
})*/

let submitButton = document.getElementById('order');


//console.log(submitButton);
submitButton.addEventListener("click", function (c) 
{
  c.preventDefault();
  let orderProducts = [];
  for (product of cart) 
  {
    orderProducts.push(product.id);
  }

  /*objet contact et tableau de produits*/
  let myOrder =
  {
    contact:
    {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value
    },
    products: orderProducts,
  };
  console.log(myOrder);

  const options =
  {
    method: "POST",
    headers:
    {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myOrder),
  };
  //console.log(options);

  fetch("http://localhost:3000/api/products/order", options)

    .then((res) => res.json())
    .then((data) => 
    {
      console.log(data);
      document.location.href = 'confirmation.html?orderId=' + data.orderId;
    })
    .catch(error => console.log('error', error));
})


