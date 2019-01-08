class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName;
        this.creditCard = {};
        if(creditCard !== undefined) { //45/100 with my previous solution
            this.addCreditCardInfo(creditCard)
        }else {
            this.creditCard.cardNumber = 1111;
            this.creditCard.expirationDate = "";
            this.creditCard.securityNumber = 111;
        }
        this.idNumber = this.generateIDNumber();
        this.wishList = [];

    }


    generateIDNumber() {
        this.idNumber =  231 * this._fullName.firstName.charCodeAt(0) + 139 * this._fullName.middleName.length;
        let length = this._fullName.lastName.length;
        if(/[aeoiu]$/g.test(this._fullName.lastName[length - 1])) {
            this.idNumber += '8';
        }else {
            this.idNumber += '7';
        }

        return this.idNumber;
    }

    addCreditCardInfo(input) {
        if(input.length !== 3) {
            throw new Error("Missing credit card information");
        }
        if(typeof input[0] !== "number" || typeof input[2] !== "number") {
            throw new Error("Invalid credit card details");
        }
        this.creditCard.cardNumber = input[0];
        this.creditCard.expirationDate = input[1];
        this.creditCard.securityNumber = input[2];
    }


    addDestinationToWishList(destination) {
        if(!this.wishList.includes(destination)) {
            this.wishList.push(destination);
            this.wishList.sort((a, b) => a.length - b.length);
        }
    }

    getVacationerInfo() {
            return "Name: " + this.fullName.firstName + " " +  this.fullName.middleName + " " + this.fullName.lastName + "\n"+
            "ID Number: " + this.idNumber + "\n"+
            "Wishlist:\n" + (this.wishList.length === 0 ? 'empty' : this.wishList.join(', ')) + "\n"+
            "Credit Card:\n"+
            "Card Number: " + this.creditCard.cardNumber + "\n"+
            "Expiration Date: " + this.creditCard.expirationDate + "\n"+
            "Security Number: " + this.creditCard.securityNumber + "\n";

    }


    get fullName() {
        return this._fullName;
    }

    set fullName(values) {
        if(values.length === 3) {
            //test the pattern with forEach
            if (/^[A-Z]{1}[a-z]+$/g.test(values[0])
                && /^[A-Z]{1}[a-z]+$/g.test(values[1])
                && /^[A-Z]{1}[a-z]+$/g.test(values[2])) {
                //set properties with .
                this._fullName = {'firstName': values[0], 'middleName': values[1], 'lastName': values[2]};
            } else {
                throw new Error("Invalid full name");
            }
        }
        else {
            throw new Error("Name must include first name, middle name and last name");
        }
    }
}

// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"],
    [123456789, "10/01/2018", 777]);

// Should throw an error (Invalid full name)
try {
    let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
} catch (err) {
    console.log("Error: " + err.message);
}

// Should throw an error (Missing credit card information)
try {
    let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
    vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
} catch (err) {
    console.log("Error: " + err.message);
}

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');

// Return information about the vacationers
console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());


