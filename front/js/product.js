let url = new URL(window.location.href);
let productId = url.searchParams.get("id");
//console.log(productId);

fetch("http://localhost:3000/api/products/" + productId)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then