const product_name = "blueberries"

const url = `https://www.instacart.com/store/costco/s?k=${product_name}`


console.log(url)

const name_element_class = "e-1pnf8tv"

const price_element_class = "e-1x7s36o"

const product_selector = "[aria-label=Product]"

document.querySelectorAll(product_selector).forEach(product => {console.log({name: product.querySelector(`.${name_element_class}`).textContent, price: product.querySelector(`.${price_element_class}`).textContent})})