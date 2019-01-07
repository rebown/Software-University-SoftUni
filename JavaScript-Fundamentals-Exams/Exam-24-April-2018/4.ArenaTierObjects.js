function solve(input) {
    let gladiators = {};

    for (let line of input) {
        if(line === 'Ave Cesar') {
            break;
        }else if(line.includes(' -> ')) {
            let [gladiator, technique, skill] = line.split(' -> ');
            skill = +skill;
            if(!gladiators.hasOwnProperty(gladiator)) {
                gladiators[gladiator] = {};
                gladiators[gladiator][technique] = skill;
                gladiators[gladiator]['__total__'] = skill;
            }else{
                if(!gladiators[gladiator].hasOwnProperty(technique)) {
                    gladiators[gladiator][technique] = skill;
                    gladiators[gladiator]['__total__'] += skill;
                }else {
                    if(skill > gladiators[gladiator][technique]) {
                        gladiators[gladiator]['__total__'] -= gladiators[gladiator][technique]
                        gladiators[gladiator][technique] =  skill;
                        gladiators[gladiator]['__total__'] += skill;
                    }
                }
            }
        }else if(line.includes('vs')) {
 
        }
    }

    console.log(gladiators);

    let sorted = [...gladiators.entries()].sort(sort);

    console.log(gladiators);
    console.log(sorted);

    for (let [gladiator, techSkill] of sorted) {
        let totalSkill = [...techSkill.entries()]
            .gladiators(s => s[1])
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

    function sort(a, b) {
        let [gladiatorA, techniqueA] = a;
        let [gladiatorB, techniqueB] = b;

        let totalSkillA = [...techniqueA.entries()]
            .gladiators(s => s[1])
            .reduce((a,b) => a + b);

        let totalSkillB = [...techniqueB.entries()]
            .gladiators(s => s[1])
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