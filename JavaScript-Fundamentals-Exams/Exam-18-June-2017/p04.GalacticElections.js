function solve(ballots) {
    let starSystems = {};
    //Fill the Obj
    for (let obj of ballots) {
        let system = obj['system'];
        let candidate = obj['candidate'];
        let votes = obj['votes'];

        if(!starSystems.hasOwnProperty(system)) {
            starSystems[system] = {};
            starSystems[system][candidate] = votes;
        }else {
            if(starSystems[system].hasOwnProperty(candidate)) {
                starSystems[system][candidate] += votes;
            }else {
                starSystems[system][candidate] = votes;
            }
        }
    }

    //Modify the Obj and take the winner from every system with most votes
    let totalSum = 0;
    for(let system in starSystems) {
        //Sort in DESC
        let winner = Object.keys(starSystems[system]).sort((a,b) => starSystems[system][b] - starSystems[system][a])[0]; //return sorted obj of keys so we take only first
        let sum = 0;
        for(let innerKey in starSystems[system]) {
            sum += starSystems[system][innerKey];
        }
        //Save only the winner
        starSystems[system] = {};
        starSystems[system]['candidate'] = winner;
        starSystems[system]['votes'] = sum;

        totalSum += sum;
    }
    //console.log(starSystems);
    //Check the objects if we have the same candidate in different system and sum it
    let players = {};
    for(let key in starSystems) {
        if(players.hasOwnProperty(starSystems[key]['candidate'])) {
            players[starSystems[key]['candidate']] += starSystems[key]['votes'];
        }else {
            players[starSystems[key]['candidate']] = starSystems[key]['votes'];
        }
    }

    let sortedPlayers = Object.keys(players).sort((a,b) => players[b] - players[a]);
    let sortedPercents = Object.values(players).sort((a,b) => b - a)
        .map(a => Math.floor((a / totalSum) * 100));
    let sortedSystems = Object.keys(starSystems).sort((a,b) => starSystems[b]['votes'] - starSystems[a]['votes']);

    if(sortedPercents[0] > 50) {
        if(sortedPlayers.length > 1) {
            console.log(`${sortedPlayers[0]} wins with ${players[sortedPlayers[0]]} votes`);
            console.log(`Runner up: ${sortedPlayers[1]}`);
            for(let system of sortedSystems) {
                if(starSystems[system]['candidate'] === sortedPlayers[1]) {
                    console.log(system + ': ' + starSystems[system]['votes']);
                }
            }
        }else {
            console.log(`${sortedPlayers[0]} wins with ${players[sortedPlayers[0]]} votes\n${sortedPlayers[0]} wins unopposed!`)
        }
    }else {
        console.log(`Runoff between ${sortedPlayers[0]} with ${sortedPercents[0]}% and ${sortedPlayers[1]} with ${sortedPercents[1]}%`)
    }

}

solve([ { system: 'Theta', candidate: 'Flying Shrimp', votes: 10 },
    { system: 'Sigma', candidate: 'Space Cow',     votes: 200 },
    { system: 'Sigma', candidate: 'Flying Shrimp', votes: 120 },
    { system: 'Tau',   candidate: 'Space Cow',     votes: 15 },
    { system: 'Sigma', candidate: 'Space Cow',     votes: 60 },
    { system: 'Tau',   candidate: 'Flying Shrimp', votes: 150 } ]
);