import { productCardTemplate, productListOriginal } from "./productList.mjs";
import {
  getParam,
  loadHeaderFooter,
  getLocalStorage,
  renderListWithTemplateOriginal,
} from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
productListOriginal(".product-list", category);

//setLocalStorageByCategory(category);
let count = 0;

let arrowone = document.getElementById("arrowone");
arrowone.addEventListener("click", changeProductBackward);

let arrowtwo = document.getElementById("arrowtwo");
arrowtwo.addEventListener("click", changeProductFoward);

function changeProductBackward() {
  const products = getLocalStorage(category);
  let element = document.querySelector(".product-list");
  if (count > 0) {
    count = count - 1;
  }
  renderListWithTemplateOriginal(productCardTemplate, element, products, count);
}

function changeProductFoward() {
  const products = getLocalStorage(category);
  let products_length = products.length - 1;
  let element = document.querySelector(".product-list");
  if (count < products_length) {
    count = count + 1;
  }
  renderListWithTemplateOriginal(productCardTemplate, element, products, count);
}
