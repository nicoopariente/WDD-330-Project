import { findProductById } from "./productData.mjs";

import { setLocalStorage, getLocalStorage, updateCartCountHeader } from "./utils.mjs";
let productData = {};


export async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  let productDetails = await findProductById(productId)
  // once we have the product details we can render out the HTML
  if (productDetails){
    renderProductDetails(productDetails);
    // add a listener to Add to Cart button
  }else{
   wrongProductIdMessage();
  }


}

export function addProductToCart(product) {
  const savedProducts = getLocalStorage("cart");

  const foundItem = (savedProducts || [])?.find((item) => item.id == product.id);
  let result = savedProducts?.map(product => {

    const sum = foundItem?.id == product.id ? 1 : 0;
    
    return { ...product, Qty: (product?.Qty || 1) + sum };
  })

  const localStorageResult = foundItem ? result : (result || []).concat({ ...product, Qty: 1 });
  setLocalStorage("cart", localStorageResult);
  updateCartCountHeader(localStorageResult);

}

export function renderProductDetails(productDetails) {
  console.log(productDetails);
  document.querySelector("product-detail");
  document.querySelector("#productName").innerHTML = productDetails.title;
  document.querySelector("#productImage").src = productDetails.image;
  document.querySelector("#productFinalPrice").innerHTML = productDetails.price;
  document.querySelector("#rating").innerHTML = `Rate for this product: ${productDetails.rating.rate} out of ${productDetails.rating.count} reviews`;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = productDetails.description;
  if(productDetails.rating.rate > 4){
    document.querySelector("#notification").innerHTML = "This product has a very good Rating!!!";
  }

}

export function wrongProductIdMessage(){
  let h3 = document.createElement("h3");
    h3.innerHTML = "Oops! Its seems that the Product is not correct. Please check the Id.";
    let parentElement = document.querySelector(".product-detail");
    parentElement.innerHTML = "";
    parentElement.append(h3);

}