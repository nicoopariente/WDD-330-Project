import { getData } from "./productData.mjs";
import { getParam, renderListWithTemplate } from "./utils.mjs";

const category = getParam("category");

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}&category=${category}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__discount">$${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)} OFF</p></a>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`
}   

export async function productList(selector, category = 'tents'){

    let element = document.querySelector(selector);
    
    let products = await getData(category);
    products = products.filter((product) => product.Id != "880RT" && product.Id != "989CG");
    renderListWithTemplate(productCardTemplate, element, products);
    document.querySelector(".title").innerHTML = category;

}