function coffeMachine(input) {
    let coffeeCaffeinePrice = 0.80;
    let coffeeDecaf = 0.90;
    let teaPrice = 0.80;
    let totalMoney = 0;

    for (let data of input) {
        data = data.split(', ');
        let coins = Number(data[0]);
        let typeOfDrink = data[1];
        let coffeeType = data[2];
        let isWithMilk = data[3];
        let sugarQuantity = Number(data.pop());

        let sum = 0;

        if(isWithMilk !== 'milk')
            isWithMilk = null;

        if(typeOfDrink === "coffee") {
            if(coffeeType === "caffeine") {
                sum += coffeeCaffeinePrice;
                if(isWithMilk) {
                    sum += 0.10;
                }
            }else {
                sum += coffeeDecaf;
                if(isWithMilk) {
                    sum +=  0.10;
                }
            }
        }else if(typeOfDrink === "tea") {
            sum += teaPrice;
            //coffeType is rather we have milk or not here
            if(coffeeType) {
                sum +=  0.10;
            }
        }

        if(sugarQuantity > 0) {
            sum += 0.10;
        }

        if(sum <= coins) {
            let change = coins - sum;
            totalMoney += sum;
            console.log(`You ordered ${typeOfDrink}. Price: ${sum.toFixed(2)}$ Change: ${change.toFixed(2)}$`)
        }else {
            let moneyNeeded = sum - coins;
            console.log(`Not enough money for ${typeOfDrink}. Need ${moneyNeeded.toFixed(2)}$ more.`)
        }
    }

    console.log(`Income Report: ${totalMoney.toFixed(2)}$`)
}

let data = ['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2',
    '1.00, coffee, decaf, 0']





coffeMachine(data)