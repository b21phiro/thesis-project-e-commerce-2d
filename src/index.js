import './style.css';
import Product from "./assets/js/product";
import {title} from "./assets/js/title";
import {price} from "./assets/js/price";

const amountOfProducts = 15;

window.onload = () => {

    // The HTML-list that holds the items.
    const items = document.getElementById('items');

    // Insert each item into the list.
    for (let i = 0; i < amountOfProducts; i++) {
        const product = new Product(i, title(), price()),
              li = document.createElement('LI');
        li.insertAdjacentHTML('afterbegin', product.html());
        items.appendChild(li);
    }

};