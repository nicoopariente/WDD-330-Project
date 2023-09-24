import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  const savedProducts = getLocalStorage("so-cart");

  const foundItem = (savedProducts || [])?.find((item) => item.Id === product.Id);
  let result = savedProducts?.map(product => {
    const sum = foundItem?.Id === product.Id ? 1 : 0;
    return {...product, Qty: (product?.Qty || 1) + sum };
  })

  setLocalStorage("so-cart",  foundItem ? result : (result || []).concat({ ...product, Qty: 1 }) );
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
