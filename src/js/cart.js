import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter, onSubmit } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("cart");
  if (cartItems) {
    if(cartItems.length > 0){
      let totalCart = total(cartItems);
    document.querySelector("#total").className = "cart-footershow";
    document.querySelector("#totalPrice").innerHTML = `Total: ${totalCart}. After clicking in Checkout, we will continue the buying process directly by email`;
    }else {
      document.querySelector("#total").className = "cart-footerhide";
    }
  } else {
    document.querySelector("#total").className = "cart-footerhide";
  }
  const htmlItems = cartItems?.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems?.length
    ? htmlItems?.join("")
    : `<p>Your cart looks empty!</p>`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.image
      }"
      alt="${item.title}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.title}</h2>
  </a>
  <p class="cart-card__quantity">qty: ${item.Qty}</p>
  <button id="${item.id}" class="Delete">X</button>
  <p class="cart-card__price">$${item.price}</p>
</li>`;

  return newItem;
}
function total(item) {
  let totalValue = 0;

  let numberOfItems = item.length;
  for (let i = 0; i < numberOfItems; i++) {
    totalValue = totalValue + item[i].price * item[i].Qty;
  }
  return totalValue;
}

renderCartContents();
loadHeaderFooter();


console.log(document.getElementById("form"));

document.getElementById("form")?.addEventListener("submit", onSubmit);

document.getElementById("Delete")?.addEventListener("click", DeleteFunction);
[...document.querySelectorAll('.Delete')].forEach(function(item) {
  item.addEventListener('click', DeleteFunction);
   });

function DeleteFunction(event){
  event.preventDefault();

  let products = getLocalStorage("cart")


  
  let productPosition = products.findIndex((item) => item.id == this.id);
  console.log(productPosition);
  console.log(products);

  if(products[productPosition].Qty == 1){
    products.splice(productPosition, 1)
    setLocalStorage("cart", products);
    console.log("hi");

  }else{
    console.log(products[productPosition]);
  products[productPosition].Qty =  products[productPosition].Qty - 1;
  setLocalStorage("cart", products);
  }
  
  
  renderCartContents();

  document.getElementById("Delete")?.addEventListener("click", DeleteFunction);
[...document.querySelectorAll('.Delete')].forEach(function(item) {
  item.addEventListener('click', DeleteFunction);
   });

}