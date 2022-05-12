function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter (p => p.id != product.id);
    saveCart(cart);
}

function changeQuantity (product, quantity){
    let cart = getCart();
    let foundProduct =cart.find(p.id == product.id);
    if(foundProduct != undefined){
      foundProduct.quantity += quantity;
      if(foundProduct.quantity <= 0){
        removeFromCart(foundProduct);
      }
      else{
        saveCart(cart);
      }
    }
}

function getTotalQuantity(){
    let cart = getCart();
    let totalQuantity = 0;
    for (let product of cart){
      totalQuantity += product.quantity;
    }
    return totalQuantity;
}

function getTotalPrice(){
    let cart = getCart();
    let total = 0;
    for (let product of cart){
      total += product.quantity * /*recupérer le prix dans API*/ price;
    }
    return total;
}