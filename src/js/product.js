import { findProductById } from "./productData.mjs";

import { getParam } from "./utils.mjs";

import * as productDetails from "./productDetails.mjs";

import { loadHeaderFooter } from "./utils.mjs";

// add to cart button event handler

async function addToCartHandler() {
  const productGetId = getParam("product");
  const product = await findProductById(productGetId);

  productDetails.addProductToCart(product);
}

// add listener to Add to Cart button

document

  .getElementById("addToCart")

  .addEventListener("click", addToCartHandler);

const productId = getParam("product");

productDetails.productDetails(productId);


loadHeaderFooter();
