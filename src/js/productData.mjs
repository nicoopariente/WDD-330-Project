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




export async function findProductById(id) {
  const products = await getData(category);
  return products.find((item) => item.id == id);
}

// my coding
export async function getData(category2 = "electronics") {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  };
  const response = await fetch("https://fakestoreapi.com/" + `products/category/${category2}`, options);
    const data = await convertToJson(response);
    console.log(data);
    return data;
}
  

