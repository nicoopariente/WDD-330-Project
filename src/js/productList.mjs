import { getData } from "./productData.mjs";
import { getParam, renderListWithTemplate, setLocalStorage, getLocalStorage, renderListWithTemplateOriginal } from "./utils.mjs";

const category = getParam("category");

export function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.id}&category=${category}">
    <img
      src="${product.image}"
      alt="Image of ${product.title}"
    />
    <h2 class="card__name">${product.title}</h2>
    <p class="product-card__price">$${product.price}</p></a>
  </li>`
}   


export async function productListOriginal(selector, category = 'electronics'){

  let element = document.querySelector(selector);
  
  await setLocalStorageByCategory(category);

  const products = getLocalStorage(category);
  



  renderListWithTemplateOriginal(productCardTemplate, element, products);
  document.querySelector(".title").innerHTML = category;

}

export async function setLocalStorageByCategory(category = 'electronics'){
  
  if (localStorage.getItem(category) == null){
    let products = await getData(category);
    console.log(products);
    setLocalStorage(category, products);
  }
  

  
}


