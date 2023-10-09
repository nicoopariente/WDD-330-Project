import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";


export async function shoppingList(selector){

    let element = document.querySelector(selector);
    let products = await getData();
    renderListWithTemplate(cartItemTemplate, element, products);

}


export function cartItemTemplate(item) {
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