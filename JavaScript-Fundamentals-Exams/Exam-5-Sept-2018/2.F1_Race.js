function F1_Race(input) {
    let pilots = input[0].split(' ');
    for (let i = 1;i < input.length;i++) {
        let data = input[i].split(' ');
        let action = data[0];
        let pilot = data[1];

        switch (action) {
            case "Join":
                if(!pilots.includes(pilot)) {pilots.push(pilot)}break;
            case "Crash": pilots.forEach(p => {
                if(pilots.includes(pilot)) {
                    let index = pilots.indexOf(pilot);
                    pilots.splice(index, 1);
                }
            }); break;
            case "Pit":
                if(pilots.includes(pilot)) {
                    let index = pilots.indexOf(pilot);
                    if(pilots[index + 1] !== "undefined") {
                        pilots[index] = pilots[index + 1];
                        pilots[index + 1] = pilot;
                    }
                }
             break;
            case "Overtake":
                if(pilots.includes(pilot)) {
                    let index = pilots.indexOf(pilot);
                    if(pilots[index - 1] !== undefined) {
                        pilots[index] = pilots[index - 1];
                        pilots[index - 1] = pilot;
                    }
                }
            break;
        }
    }

    console.log(pilots.join(' ~ '));


}

let input  = ["Vetel Hamilton Raikonnen Botas Slavi",
    "Pit Hamilton",
    "Overtake LeClerc",
    "Join Ricardo",
    "Crash Botas",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Crash Slavi"]


F1_Race(input);