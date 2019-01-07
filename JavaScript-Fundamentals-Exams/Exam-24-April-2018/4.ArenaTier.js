function solve(input) {
    let gladiatorsMap = new Map();

    for (let line of input) {
        if(line === 'Ave Cesar') {
           break;
        }else if(line.includes(' -> ')) {
            let [gladiator, technique, skill] = line.split(' -> ');
            skill = +skill;
            if(!gladiatorsMap.has(gladiator)) {
                gladiatorsMap.set(gladiator, new Map());

            }
            if(!gladiatorsMap.get(gladiator).has(technique)) {
                gladiatorsMap.get(gladiator).set(technique, Number(skill));
            }else {
                if(Number(skill) > gladiatorsMap.get(gladiator.get(technique))) {
                    gladiatorsMap.get(gladiator).set(technique, skill);
                }
            }
        }else if(line.includes('vs')) {
            let [gladiator1, gladiator2] = line.split(' vs ');
            if(gladiatorsMap.has(gladiator1) && gladiatorsMap.has(gladiator2)) {
                let gladiator1TechniquesMap = gladiatorsMap.get(gladiator1);
                let gladiator2TechniquesMap = gladiatorsMap.get(gladiator2);

                gladiator1TechniquesMap.forEach((i, tech1) => {
                    if (tech1 && gladiator2TechniquesMap.get(tech1)) {
                        let gladiator1Total = [...gladiator1TechniquesMap].map(a => a[1]).reduce((a,b) => a + b);
                        let gladiator2Total = [...gladiator2TechniquesMap].map(a => a[1]).reduce((a,b) => a + b);

                        if(gladiator1Total > gladiator2Total) {
                            gladiatorsMap.delete(gladiator2);
                        }else if(gladiator2Total > gladiator1Total){
                            gladiatorsMap.delete(gladiator1);
                        }
                    }
                });
            }
        }
    }

    let sortedGladiators = [...gladiatorsMap.entries()].sort(sortGladiators);

    console.log(gladiatorsMap);
    console.log(sortedGladiators);

    for (let [gladiator, techSkill] of sortedGladiators) {
        let totalSkill = [...techSkill.entries()]
            .map(s => s[1])
            .reduce((a,b) => a + b);

        console.log(`${gladiator}: ${totalSkill} skill`)
        let techSkillSorted = [...techSkill].sort((a,b) => {
            let firstCriteria = b[1] - a[1];
            if(firstCriteria === 0) {
                return a[0].localeCompare(b[0]);
            }
            return firstCriteria;
        })
        for (let [technique, skill] of techSkillSorted) {
            console.log(`- ${technique} <!> ${skill}`)
        }

    }

    function sortGladiators(a, b) {
        let [gladiatorA, techniqueA] = a;
        let [gladiatorB, techniqueB] = b;

        let totalSkillA = [...techniqueA.entries()]
            .map(s => s[1])
            .reduce((a,b) => a + b);

        let totalSkillB = [...techniqueB.entries()]
            .map(s => s[1])
            .reduce((a,b) => a + b);

        let firstCriteria = totalSkillB - totalSkillA

        if(firstCriteria === 0) {
            return gladiatorA.localeCompare(gladiatorB)
        }

        return firstCriteria;
    }
}

solve([
   'Pesho -> Duck -> 700',
   'Julius -> Shield -> 150',
   'Wladius -> Heal -> 200',
   'Wladius -> Aupport -> 250',
   'Wladius -> Shield -> 250',
   'Pesho vs Gladius',
   'Wladius vs Julius',
   'Wladius vs Gosho',
   'Ave Cesar']
)