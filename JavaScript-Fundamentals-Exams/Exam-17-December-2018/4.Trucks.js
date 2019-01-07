function solve(arr) {
    let plates = {};
    let backupTiers = [];

    for (let truckInfo of arr) {
        if(truckInfo[0] === "NEWTRUCK") {
            let plateNumber = truckInfo[1];
            let tires = truckInfo[2];

            if(!plates.hasOwnProperty(plateNumber)) {
                plates[plateNumber] = {};
                plates[plateNumber]['tires'] = tires;
                plates[plateNumber]['totalDistance'] = 0;
            }


        }else if(truckInfo[0] === "NEWTIRES") {

            backupTiers.push(truckInfo[1])

        }else if(truckInfo[0] === "WORK") {

            let plateNumber = truckInfo[1];
            let travelDistance = Number(truckInfo[2]);

            if(plates.hasOwnProperty(plateNumber)) {

                let qualityReduce = travelDistance / 1000;
                if(qualityReduce <= plates[plateNumber]['tires'][0]) {

                    //reduce quality of each tire
                    let tires = plates[plateNumber]['tires'];
                    for (let i = 0; i < tires.length; i++) {
                        tires[i] -= Math.round(qualityReduce);
                    }

                    plates[plateNumber]['totalDistance'] += travelDistance;

                }else if(qualityReduce > plates[plateNumber]['tires'][0]) { //change tires with backups
                    plates[plateNumber]['tires'] = [];
                    //check if any of the backup tires can pass the distance
                    //check if any backups left
                    if(backupTiers.length > 0) {
                        let changed = false;

                            for (let i = 0; i < backupTiers.length;i++) {
                                let backup = backupTiers[i];
                                if(backup[0] >= qualityReduce) {
                                    changed = true;
                                    let reducedBackup = backup.map(el => el - Math.round(qualityReduce))

                                    plates[plateNumber]['tires'] = reducedBackup;
                                    backupTiers.splice(i, 1);


                                    plates[plateNumber]['totalDistance'] += travelDistance;
                                    break
                                }
                            }
                            if(changed === false && backupTiers.length > 0) {
                                plates[plateNumber]['tires'] = backupTiers[0];
                                backupTiers.splice(0, 1);
                            }

                    }
                }
            }

        }
    }

    for (let plateNumber of Object.keys(plates)) {
        console.log(`Truck ${plateNumber} has traveled ${plates[plateNumber]['totalDistance']}.`);
    }
    console.log(`You have ${backupTiers.length} sets of tires left.`)
}

// solve(
//     [
//         ["NEWTRUCK", "C1111AA", [7, 7, 7, 7, 7, 7, 7, 7]],
//         ["NEWTRUCK", "C2222AA", [5, 5, 5, 5, 5, 5, 5, 5]],
//         ["NEWTIRES", [8, 8, 8, 8, 8, 8, 8, 8]],
//         ["NEWTIRES", [4, 4, 4, 4, 4, 4, 4, 4]],
//         ["NEWTIRES", [5, 5, 5, 5, 5, 5, 5, 5]],
//         ["WORK", "C1111AA", 7700],
//         ["WORK", "C2222AA", 6000],
//         ["WORK", "C1111AA", 3000],
//     ]
//
// )

solve(
    [
        ["NEWTRUCK", "B1002SA", [17, 17, 17, 17, 17, 17, 17, 17]],
        ["NEWTIRES", [8, 8, 4, 8, 8, 8, 9, 8]],
        ["NEWTIRES", [4, 4, 5, 4, 4, 7, 4, 4]],
        ["NEWTIRES", [5, 1, 5, 5, 5, 7, 5, 1]],
        ["WORK", "B1002SA", 7700],
        ["WORK", "B1002SA", 6000],
        ["WORK", "B1002SA", 3000]
    ]

)