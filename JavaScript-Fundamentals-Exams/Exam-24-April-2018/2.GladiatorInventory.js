function solve(input) {

    let equipments = [];
    let arr = input[0].split(' ');
    equipments = equipments.concat(arr);
    input.splice(0,1);

    for (let str of input) {
        if(str === "Fight!") {
            break;
        }

        let [command, equipment] = str.split(' ');

        let commandExecuter = {
            'Buy':(equipment) => buy(equipment),
            'Trash':(equipment) => del(equipment),
            'Repair':(equipment) => repair(equipment),
            'Upgrade':(equipment) => upgrade(equipment)
        };

        commandExecuter[command](equipment)

    }

    console.log(equipments.join(' '))

    function upgrade(equipment) {
        let searched = equipment.split('-')[0]
        let upgraded = equipment.split('-')[1]
        if(equipments.includes(searched)) {
            let index = equipments.indexOf(searched);
            let temp = equipments.splice(index + 1);
            equipments.push(`${searched}:${upgraded}`);
            equipments = equipments.concat(temp)
        }
    }

    function buy(equipment) {
        if(!equipments.includes(equipment))
            equipments.push(equipment)
    }

    function del(equipment) {
        if(equipments.includes(equipment)) {
            let index = equipments.indexOf(equipment);
            equipments.splice(index, 1);
        }
    }

    function repair(equipment) {
        if(equipments.includes(equipment)) {
            let index = equipments.indexOf(equipment);
            equipments.splice(index, 1);
            equipments.push(equipment);
        }
    }
}

solve(['SWORD Shield Spear',
'Trash Bow',
'Repair Shield',
'Upgrade Helmet-V',
'Fight!'])