function ATM(input) {
    let bankotes = [];
    let totalCashInATM = 0;
    for (let arr of input) {
        if(arr.length > 2) {
            let insertedCash = arr.reduce((a,b) => a+b);
            totalCashInATM += insertedCash;
            bankotes = bankotes.concat(arr);
            console.log(`Service Report: ${insertedCash}$ inserted. Current balance: ${totalCashInATM}$.`)
        }else if (arr.length === 2) {
            let currBalance = Number(arr[0]);
            let moneyToWithdraw = Number(arr[1]);


            if(currBalance < moneyToWithdraw) {
                console.log(`Not enough money in your account. Account balance: ${currBalance}$.`)
            }else if(totalCashInATM <= 0) {
                console.log(`ATM machine is out of order!`);
            }else {
                let index = 0;
                let sortedbankotes = bankotes.sort((a,b) => b - a)
                while(sortedbankotes !== []) {
                    moneyToWithdraw -= +sortedbankotes[index];
                    if (moneyToWithdraw < 0) {
                        moneyToWithdraw = Number(arr[1]);
                        index++
                        continue
                    }else if(moneyToWithdraw === 0) {
                        currBalance -= Number(arr[1]);
                        totalCashInATM -=  Number(arr[1]);
                        console.log(`You get ${Number(arr[1])}$. Account balance: ${currBalance}$. Thank you!`)
                    }
                    bankotes.splice(index, 1);
                }
            }

        }else if (arr.length === 1) {
            let banknote = arr[0];
            let banknoteCount = bankotes.filter(b => b === banknote);
            console.log(`Service Report: Banknotes from ${banknote}$: ${banknoteCount.length}.`)
        }
    }
}

let input = [
    [50, 50, 100, 10, 500],
    [500, 200]
]

ATM(input)