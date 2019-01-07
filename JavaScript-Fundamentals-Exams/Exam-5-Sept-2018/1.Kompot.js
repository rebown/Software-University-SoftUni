function solve(input) {
    let peachesKg = 0;
    let plumsKg = 0;
    let cherrysKg = 0;
    let rakiyaKg = 0;

    for (let line of input) {
        let [fruit, kg] = line.split(/\s+/g);
        switch (fruit) {
            case "peach": peachesKg += +kg; break;
            case "plum": plumsKg += +kg; break;
            case "cherry": cherrysKg += +kg; break;
            default: rakiyaKg += +kg; break;
        }
    }
    let cherryKompots = Math.floor(((cherrysKg * 1000)/9)/25);
    let peachesKompots = Math.floor(((peachesKg * 1000)/140)/2.5);
    let plumsKompots = Math.floor(((plumsKg * 1000)/20)/10);
    let rakiyaLiters = rakiyaKg * 0.200;

    console.log(`Cherry kompots: ${cherryKompots}`)
    console.log(`Peach kompots: ${peachesKompots}`)
    console.log(`Plum kompots: ${plumsKompots}`)
    console.log(`Rakiya liters: ${rakiyaLiters.toFixed(2)}`)
}

let input = [ 'cherry 1.2',
    'peach 2.2',
    'plum 5.2',
    'peach 0.1',
    'cherry 0.2',
    'cherry 5.0',
    'plum 10',
    'cherry 20.0' ,
    'papaya 20' ];


solve(input)