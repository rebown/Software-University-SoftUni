function solve(input) {
    let seatsAvailable = Number(input[0]);

    let totalMoney = 0;
    let countOfFans = 0;

    let teamLitexA = [];
    let teamLitexB = [];
    let teamLitexC = [];

    let teamLevskiA = [];
    let teamLevskiB = [];
    let teamLevskiC = [];

    let teamVipA = [];
    let teamVipB = [];
    let teamVipC = [];


    for (let i = 1; i < input.length; i++) {
        let [team, seatNumber, sector] = input[i].split('*');

       if(team === 'LITEX') {
            if(sector === 'A') {
                if(!teamLitexA.includes(seatNumber)) {
                    teamLitexA.push(seatNumber)

                    totalMoney += 10;
                    countOfFans++;
                }else {
                    console.log(`Seat ${seatNumber} in zone LITEX sector A is unavailable`)
                }
            }else if(sector === 'B') {
                if(!teamLitexB.includes(seatNumber)) {
                    teamLitexB.push(seatNumber)

                    totalMoney += 7;
                    countOfFans++;
                }else {
                    console.log(`Seat ${seatNumber} in zone LITEX sector B is unavailable`)
                }
            }else if(sector === 'C') {
                if(!teamLitexC.includes(seatNumber)) {
                    teamLitexC.push(seatNumber)

                    totalMoney += 5;
                    countOfFans++;
                }else {
                    console.log(`Seat ${seatNumber} in zone LITEX sector C is unavailable`)
                }
            }
       }else if(team === 'LEVSKI') {
           if(sector === 'A') {
               if(!teamLevskiA.includes(seatNumber)) {
                   teamLevskiA.push(seatNumber)

                   totalMoney += 10;
                   countOfFans++;
               }else {
                   console.log(`Seat ${seatNumber} in zone LEVSKI sector A is unavailable`)
               }
           }else if(sector === 'B') {
               if(!teamLevskiB.includes(seatNumber)) {
                   teamLevskiB.push(seatNumber)

                   totalMoney += 7;
                   countOfFans++;
               }else {
                   console.log(`Seat ${seatNumber} in zone LEVSKI sector B is unavailable`)
               }
           }else if(sector === 'C') {
               if(!teamLevskiC.includes(seatNumber)) {
                   teamLevskiC.push(seatNumber)

                   totalMoney += 5;
                   countOfFans++;
               }else {
                   console.log(`Seat ${seatNumber} in zone LEVSKI sector C is unavailable`)
               }
           }
       }else if(team === 'VIP') {
           if(sector === 'A') {
               if(!teamVipA.includes(seatNumber)) {
                   teamVipA.push(seatNumber)

                   totalMoney += 25;
                   countOfFans++;
               }else {
                   console.log(`Seat ${seatNumber} in zone VIP sector A is unavailable`)
               }
           }else if(sector === 'B') {
               if(!teamVipB.includes(seatNumber)) {
                   teamVipB.push(seatNumber)

                   totalMoney += 15;
                   countOfFans++;
               }else {
                   console.log(`Seat ${seatNumber} in zone VIP sector B is unavailable`)
               }
           }else if(sector === 'C') {
               if(!teamVipC.includes(seatNumber)) {
                   teamVipC.push(seatNumber)

                   totalMoney += 10;
                   countOfFans++;
               }else {
                   console.log(`Seat ${seatNumber} in zone VIP sector C is unavailable`)
               }
           }
       }

    }

    console.log(`${totalMoney} lv.`);
    console.log(`${countOfFans} fans`);
}

solve(
    ["5","LITEX*5*A", "LEVSKI*2*A", "LEVSKI*3*B", "VIP*4*C", "LITEX*3*B", "LEVSKI*2*A", "LITEX*5*B", "LITEX*5*A", "VIP*1*A"]

)

