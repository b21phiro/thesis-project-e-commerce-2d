import ProductImage from './../images/coffee.jpg';

class Product {

    id = null;

    title = undefined;

    price = 0;

    image = undefined;

    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = ProductImage;
    }

    html() {
        return `
        <article class="product">
            <a class="product--link" href="#${this.id}" title="Product"></a>
            <figure class="product--figure">
                <img class="product--figure--image" src="${this.image}" alt="${this.title}" />
            </figure>
            <section class="product--section">
                <h2 class="product--section--title">${this.title}</h2>
                <p class="product--section--price">
                    <span class="product--section--price--value">${this.price}</span>
                    <span class="product--section--price--currency">kr</span>
                </p>
                <button class="product--section--button-add">Add +</button>
            </section>
        </article>`;
    }

}

export default Product;