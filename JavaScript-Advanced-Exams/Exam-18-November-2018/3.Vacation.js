class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    registerChild(name, grade, budget) {

        let output;

        if(budget >= this.budget) {

            if(!this.kids[grade]) {
                this.kids[grade] = [];
            }
            let isThisKidExists = this.kids[grade].filter(nb => nb.split('-')[0] === name);

            if(isThisKidExists.length === 0) {
                let kidNameMoney = `${name}-${budget}`;
                this.kids[grade].push(kidNameMoney);
                output = this.kids[grade];
            }else {
                output = `${name} is already in the list for this ${this.destination} vacation.`
            }
        }else {
            output = `${name}'s money is not enough to go on vacation to ${this.destination}.`
        }

        return output;

    }

    removeChild(name, grade) {
        let output;

        let isThisKidExists = this.kids[grade] ? this.kids[grade].filter(nb => nb.split('-')[0] === name) : 0;

        if(isThisKidExists.length === 1) {
            let kidIndex = this.kids[grade].indexOf(isThisKidExists[0]);

            this.kids[grade].splice(kidIndex, 1);

            output = this.kids[grade];
        }else {
             return `We couldn't find ${name} in ${grade} grade.`;
         }

         return output;
     }

    toString() {
        // let sortedKeys = Object.keys(this.kids).sort((a,b) => a - b).filter(g => g !== undefined);
        //  if(sortedKeys.length === 0) {
        //      return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        //  }
        // let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
        //  for (let grade of sortedKeys) {
        //      if(this.kids[grade].length === 0) {
        //          continue;
        //      }
        //      let number = 0;
        //      result += `Grade: ${grade}\n`;
        //      for (let kid of this.kids[grade]) {
        //          number++;
        //          result += `${number}. ${kid}\n`
        //     }
        //  }
        //  return result;

        let output = '';

        if (this.numberOfChildren >= 1) {
            output += `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;

            Object.keys(this.kids).sort((prevG, currG) => prevG - currG).forEach((prevG, currG) => {
                if(this.kids[prevG].length > 0){
                    output += `Grade: ${prevG}\n`;
                    let count = 1;
                    Object.keys(this.kids[prevG]).sort((prevN, currN) => prevN - currN).forEach((prevN, currN) => {
                        output += `${count++}. ${this.kids[prevG][prevN]}\n`
                    });
                    count = 1;
                }
            })

        } else {
            output += `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        return output;
     }

     get numberOfChildren() {
         let valuesExist = Object.values(this.kids).filter((arr) => arr.length >= 1);
         let output = 0;
         if (valuesExist.length >= 1) {

             valuesExist.forEach(g => output+= g.length);
         }
         return output;
     }
}


let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);

vacation.registerChild('Gosho', 5, 3000);
vacation.registerChild('Lilly', 6, 1500);
vacation.registerChild('Pesho', 7, 4000);
vacation.registerChild('Tanya', 5, 5000);
vacation.registerChild('Mitko', 10, 5500);
vacation.removeChild("Mitko", 10)

console.log(vacation.toString());




