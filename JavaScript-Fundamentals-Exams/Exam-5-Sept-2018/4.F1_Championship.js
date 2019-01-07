function F1_Championship(input) {
    let teams = new Map();
    for (let line of input) {
        let dataArr = line.split(' -> ');
        let teamName = dataArr[0];
        let pilotName = dataArr[1];
        let points = parseInt(dataArr[2]);

        if(!teams.has(teamName)) {
            teams.set(teamName, {});
            teams.get(teamName)[pilotName] = 0;
        }
        if(!teams.get(teamName).hasOwnProperty(pilotName)) {
            teams.get(teamName)[pilotName] = 0;
        }
        teams.get(teamName)[pilotName] += points;
    }

    let teamPoints = {};
    for (let key of teams.keys()) {
        let innerKeys = Object.keys(teams.get(key));
        let totalPoints = 0;
        for (let k of innerKeys) {
            let currPoints = teams.get(key)[k];
            totalPoints += currPoints;
        }
        teamPoints[key] = totalPoints;
    }

    let sortedKeys = Object.keys(teamPoints).sort((a,b) => teamPoints[b] - teamPoints[a]);
    let teamCount = 0;
    for (let key of sortedKeys) {
        if(teamCount === 3) break;
        console.log(`${key}: ${teamPoints[key]}`);
        let sortedInnerKeys = Object.keys(teams.get(key)).sort((a,b) => teams.get(key)[b] - teams.get(key)[a]);
        for (let p of sortedInnerKeys) {
            console.log(`-- ${p} -> ${teams.get(key)[p]}`);
        }
    teamCount++;
    }

}

let input = [
   "Ferrari -> Kimi Raikonnen -> 25" ,
   "Ferrari -> Sebastian Vettel -> 18" ,
   "Mercedes -> Lewis Hamilton -> 10" ,
   "Mercedes -> Valteri Bottas -> 8" ,
   "Red Bull -> Max Verstapen -> 6" ,
   "Red Bull -> Daniel Ricciardo -> 4" ,
   "Mercedes -> Lewis Hamilton -> 25" ,
   "Mercedes -> Valteri Bottas -> 18" ,
   "Haas -> Romain Grosjean -> 25" ,
   "Haas -> Kevin Magnussen -> 25"
]

F1_Championship(input)