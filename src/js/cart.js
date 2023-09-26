import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    let totalCart = total(cartItems);
    document.querySelector("#total").className = "cart-footershow";
    document.querySelector("#totalPrice").innerHTML = `Total: ${totalCart}`;
  } else {
    document.querySelector("#total").className = "cart-footerhide";
  }

  const htmlItems = cartItems?.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems?.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item?.Colors?.[0]?.ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Qty}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
function total(item) {
  let totalValue = 0;

  let numberOfItems = item.length;
  for (let i = 0; i < numberOfItems; i++) {
    totalValue = totalValue + item[i].FinalPrice * item[i].Qty;
  }
  return totalValue;
}

renderCartContents();
