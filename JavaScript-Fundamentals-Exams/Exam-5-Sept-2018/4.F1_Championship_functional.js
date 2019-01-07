function F1_Championship(input) {

    let map = new Map();
    for (let line of input) {
        let [teamName, pilotName, points] = line.split(' -> ');

        if(!map.has(teamName)) {
            map.set(teamName, new Map);
        }
        if(!map.get(teamName).has(pilotName)) {
            map.get(teamName).set(pilotName, points);
        }else {
            map.get(teamName).set(pilotName, Number(map.get(teamName).get(pilotName)) + Number(points));
        }
    }

    //SORT BY THE SUM OF THE PILOT POINTS IN DEC ORDER
    let sortedMap = [...map].sort((a,b) =>
        [...b[1]].reduce((a,b) => +a[1] + +b[1]) - [...a[1]].reduce((a,b) => +a[1] + +b[1])
    ).slice(0, 3);

    for(let [teamName, pilots] of sortedMap) {
        console.log(`${teamName}: ${[...pilots].reduce((a,b) => +a[1] + +b[1])}`);
        let sortedPilots = [...pilots].sort((a,b) => +b[1] - +a[1])
        for(let [name, points] of sortedPilots) {
            console.log(`-- ${name} -> ${points}`);
        }
    }
}

let input = [
   "Ferrari -> Kimi Raikonnen -> 25",
   "Ferrari -> Sebastian Vettel -> 18",
    "Mercedes -> Lewis Hamilton -> 25",
    "Mercedes -> Valteri Bottas -> 18",
   "Mercedes -> Lewis Hamilton -> 10",
   "Mercedes -> Valteri Bottas -> 8",
   "Red Bull -> Max Verstapen -> 6",
   "Red Bull -> Daniel Ricciardo -> 4",
   "Haas -> Romain Grosjean -> 25",
   "Haas -> Kevin Magnussen -> 25"
]

F1_Championship(input)