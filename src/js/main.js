//import { productList } from "./productList.mjs";
import { loadHeaderFooter, onSubmit } from "./utils.mjs";

//productList(".product-list");

loadHeaderFooter();


console.log(document.getElementById("form"));

document.getElementById("form")?.addEventListener("submit", onSubmit);