import { getParam } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;
const category = getParam("category");

export async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}


export async function getData(category = "tents") {
  const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}
  
export async function findProductById(id) {
  const products = await getData(category);
  return products.find((item) => item.Id === id);
}
