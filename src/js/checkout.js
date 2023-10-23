import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function getValuesOfForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipcode = document.getElementById('zipcode').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiration = document.getElementById('expiration').value;
    const securityCode = document.getElementById('securityCode').value;




    return { firstName, lastName, street, state, city, zipcode, cardNumber, securityCode, expiration };
}

document.getElementById('form').addEventListener("submit", onSubmit);


function onSubmit(event) {
    event.preventDefault();
    const formValues = getValuesOfForm();
    const numbers = loadAndReturnTotalValues();
    console.log(formValues);
    console.log(numbers);
    // checkout api.
    //{ 
    //    orderDate: '2021-01-27T18:18:26.095Z',
    //    fname: "John",
    //    lname: "Doe",
    //    street: "123 Main",
    //    city: "Rexburg",
    //    state: "ID",
    //    zip: "83440",
    //    cardNumber: "1234123412341234",
   //     expiration: "8/21",
   //     code: "123",
   //     items: [{
   //       id: "20CXG"
   //       name: "The North Face Pivoter 27 L Backpack"
   //       price: 39.99,
   //       quantity: 1
   //     }, {
   //       id: "14GVF",
   //       name: "Marmot 5°F Rampart Down Sleeping Bag - 650 Fill, Mummy (For Men and Women)",
   //       price: 229.99,
   //       quantity: 1
   //     }],
   //     orderTotal: "298.18",
   //     shipping: 12,
   //     tax: "16.20"
   //   }

    makeCheckout()
    
}

function loadAndReturnTotalValues() {
    const savedProducts = getLocalStorage("so-cart");
    
    const subtotal = total(savedProducts);
    const tax = subtotal * 0.06;
    const shipping = (2 * savedProducts.length) + 8;
    const total = (subtotal + tax + shipping).toFixed(2);
    document.getElementById('subtotal').innerHTML = total(savedProducts);
    document.getElementById('tax').innerHTML = tax.toFixed(2);
    document.getElementById('shipping').innerHTML = shipping;

    document.getElementById('total').innerHTML = total;


    return { savedProducts, subtotal, tax, shipping, total };
}

function makeCheckout(payload) {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }

      fetch('http://server-nodejs.cit.byui.edu:3000/checkout', options);
}


function total(item) {
    let totalValue = 0;

    let numberOfItems = item.length;
    for (let i = 0; i < numberOfItems; i++) {
        totalValue = totalValue + item[i].FinalPrice * item[i].Qty;
    }
    return totalValue;
}

loadAndReturnTotalValues();