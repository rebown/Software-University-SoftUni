function solve(lostFight, helmet, sword, shield, armor) {
let lostFightCount = lostFight;
let helmetPrice = Number(helmet);
let swordPrice = Number(sword);
let shieldPrice = Number(shield);
let armorPrice = Number(armor);
let isHelmetBroken = false;
let isSwordBroken = false;
let shildBreakCount = 0;

    let expenses = 0;

    for (let i = 0; i < Number(lostFightCount); i++) {

        if(i % 2 === 0 && i !== 0) {
            expenses += helmetPrice;
            isHelmetBroken = true;
        }
        if(i % 3 === 0 && i !== 0) {
            expenses += swordPrice;
            isSwordBroken = true;
        }

        if(isHelmetBroken && isSwordBroken) {
            expenses += shieldPrice;
            shildBreakCount++;
        }

        if(shildBreakCount % 2 === 0 && i !== 0 && shildBreakCount !== 0) {
            expenses += armorPrice;
            shildBreakCount = 0;
        }

        isHelmetBroken = false;
        isSwordBroken = false;

    }

    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`);
}

solve(7,
2,
3,
4,
5
);