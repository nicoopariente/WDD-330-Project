// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product

}

export function renderListWithTemplate(templateFn, parentElement, products, position = "afterbegin", clear = true){
  if (clear){
      parentElement.innerHTML = "";
  }
  const htmlItems = products?.map((product) => templateFn(product));
  parentElement.insertAdjacentHTML(position, htmlItems);
}

export async function renderWithTemplate(templateFn, parentElement, data, position = "afterbegin", clear = true){
  if (clear){
      parentElement.innerHTML = "";
  }
  const htmlItems =  await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlItems);
}

export function loadTemplate(path){
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
    const html = await res.text();
    return html;
    }
};

}

export function loadHeaderFooter(){
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}