import { findProductById } from "./productData.mjs";

import { setLocalStorage } from "./utils.mjs";
let productData = {};


export async function productDetails(productId, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    let productDetails = await findProductById(productId)
    // once we have the product details we can render out the HTML
    renderProductDetails(productDetails)
    // add a listener to Add to Cart button
   
  }

export function addProductToCart(product) {
    setLocalStorage("so-cart", product);
  }

export function  renderProductDetails(productDetails){
    document.querySelector("product-detail");
    document.querySelector("#productName").innerHTML = productDetails.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerHTML = productDetails.NameWithoutBrand;
    document.querySelector("#productImage").src = productDetails.Image;
    document.querySelector("#productFinalPrice").innerHTML = productDetails.FinalPrice;
    document.querySelector("#productColorName").innerHTML = productDetails.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = productDetails.DescriptionHtmlSimple;

}