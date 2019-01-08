class Kitchen {

    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products) {

        if(products.length > 0) {
            for (let product of products) {
                let [productName, productQuantity, productPrice] = product.split(' ');

                productPrice = +productPrice;

                if(this.budget >= productPrice) {
                    if (this.productsInStock.hasOwnProperty(productName)) {
                        this.productsInStock[productName] += productQuantity;
                        this.budget -= productPrice;
                    } else {
                        this.productsInStock[productName] = productQuantity;
                        this.budget -= productPrice;
                    }
                    this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`)
                }else {
                    this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`)
                }
            }

            return this.actionsHistory.join('\n');
        }
    }

    addToMenu(meal, neededProducts, price) {
        //check for type

        if(!this.menu.hasOwnProperty(meal)) {
            this.menu[meal] = {};
            this.menu[meal]['price'] = +price;
            this.menu[meal]['products'] = neededProducts;

            return `"Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`
        }else {
            return `The ${meal} is already in the our menu, try something different.`;
        }

    }

    showTheMenu() {
        let output = '';

        let keys = Object.keys(this.menu)
        for (let meal of keys) {
            output += `${meal} - ${this.menu[meal]['price']}\n`
        }

        if(output === '') {
            return "Our menu is not ready yet, please come later..."
        }else {
           return output.trim();
        }
    }

    makeTheOrder(meal) {
        let isThisMealExists = Object.keys(this.menu).filter(m => m === meal);

        let output = '';

        if(isThisMealExists.length === 0) {
            output = `There is not ${meal} yet in our menu, do you want to order something else?`
        }else {

            let keys = Object.keys(this.productsInStock);
            let allProductsAreFound = true;

            for (let productName of keys) {
                if(this.menu[meal]['products'].includes(productName)) {

                }else {
                    allProductsAreFound = false;
                    break;
                }
            }

            if(allProductsAreFound) {

                output = `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal]['price']}.`;

                for (let prName of keys) {
                    if(this.productsInStock.includes(prName)) {
                        delete this.productsInStock[prName];
                    }
                }

                delete this.menu[meal]['products'];
                this.budget += +this.menu[meal]['price']
            }else {
                output = `For the time being, we cannot complete your order (${meal}), we are very sorry...`
            }
        }

        return output;
    }
}

let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));

kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55);

kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55);
console.log(kitchen.makeTheOrder('Pizza'));