function solve(arr) {

    let products = new Map();

    for(let i = 0;i < arr.length; i++) {
        let data = arr[i].split(', ');

        let command = data[0];
        let brand = data[1];

        let obj = {
            "name":data[2],
            "expiration":data[3],
            "quantity":Number(data[4])
        };

        switch (command) {
            case 'IN': addCoffe(brand, obj); break;
            case 'OUT': removeCoffe(brand, obj); break;
            case 'REPORT': console.log(report()); break;
            case 'INSPECTION': console.log(inspection());  break;
        }
    }

    function inspection() {
        let result = `>>>>> INSPECTION! <<<<<\n`;
        for (let [key, value] of products.entries()) {
            result += 'Brand: ' + key + ':\n';
            for (let obj of value.sort((a,b) => b['quantity'] - a['quantity'])) {
                result += `-> ${obj.name} -> ${obj.expiration} -> ${obj.quantity}.\n`;
            }
        }
        return result.trim();

    }

    function report() {
        let result = `>>>>> REPORT! <<<<<\n`;
        for (let [key, value] of products.entries()) {
            result += 'Brand: ' + key + ':\n';
            for (let obj of value) {
                result += `-> ${obj.name} -> ${obj.expiration} -> ${obj.quantity}.\n`;
            }
        }
        return result.trim();
    }

    function removeCoffe(brand, obj) {
        if(products.has(brand)) {
            for(let i = 0;i < products.get(brand).length; i++) {
                if(products.get(brand)[i].name === obj.name) {
                    if(Date.parse(products.get(brand)[i].expiration) > Date.parse(obj.expiration)) {
                        if(products.get(brand)[i].quantity >= obj.quantity) {
                            products.get(brand)[i].quantity -= obj.quantity;
                        }
                    }
                }
            }
        }
    }

    function addCoffe(brand ,obj) {
        if(!products.has(brand)) {
            products.set(brand, []);
            products.get(brand).push(obj);
        }

        for(let i = 0; i < products.get(brand).length; i++) {
            if(products.get(brand)[i]['name'] === obj['name']) {
                if(Date.parse(obj['expiration']) > Date.parse(products.get(brand)[i]['expiration'])) {
                    products.get(brand)[i]['expiration'] = obj['expiration'];
                }else if(Date.parse(obj['expiration']) === Date.parse(products.get(brand)[i]['expiration'])) {
                    products.get(brand)[i]['quantity'] += obj['quantity'];
                }
            }else {
            }
        }
    }
}


solve([
        "IN, Batdorf & Bronson, Espresso, 2005-01-25, 15",
        "IN, Batdorf & Bronson, NotEspresso, 2025-06-15, 10",
        "IN, Batdorf & Bronson, NotEspresso, 2025-06-16, 25",
        "REPORT"
    ]
);