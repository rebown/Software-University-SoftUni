class LineManager {
    constructor(arr) {
        this.arr = arr;
        this.currentStop = 0;
        this.delay = 0;
        this.totalDuration = 0;
        this.validateStops(arr);
    }

    validateStops(arr) {
        let data = [];
        for(let i = 0; i < arr.length; i++) {
            if (arr[i]['name'] !== "" && arr[i]['timeToNext'] > -1 && typeof arr[i]['name'] === "string" && typeof arr[i].timeToNext === "number") {
                data.push(arr[i]);
            } else {
                throw new Error("Invalid stop")
            }
        }
        return data;
    }

    get nextStopName() {
        return this.arr[this.currentStop + 1].name;
    }

    get atDepot() {
        return this.currentStop === this.arr.length - 1;
    }

    get currentDelay() {
        return this.delay;
    }

    arriveAtStop(minutes) {
        if(minutes < 0) {
            throw new Error("The bus is at depot");
        }

        this.delay += minutes - this.arr[this.currentStop].timeToNext;
        this.currentStop++;
        this.totalDuration += minutes;

        return !this.atDepot;
    }

    toString() {
        let line = this.atDepot ? `- Course completed\n` : `- Next stop: ${this.nextStopName}\n`;
        return `Line summary\n` +
            line +
            `- Stops covered: ${this.currentStop}\n` +
            `- Time on course: ${this.totalDuration} minutes\n` +
            `- Delay: ${this.currentDelay} minutes`
    }
}


// Initialize a line manager with correct values
const man = new LineManager([
    {name: 'Depot', timeToNext: 4},
    {name: 'Romanian Embassy', timeToNext: 2},
    {name: 'TV Tower', timeToNext: 3},
    {name: 'Interpred', timeToNext: 4},
    {name: 'Dianabad', timeToNext: 2},
    {name: 'Depot', timeToNext: 0},
]);

// Travel through all the stops until the bus is at depot
while(man.atDepot === false) {
    console.log(man.toString());
    man.arriveAtStop(4);
}

console.log(man.toString());

// // Should throw an Error (minutes cannot be negative)
// man.arriveAtStop(-4);
// // Should throw an Error (last stop reached)
// man.arriveAtStop(4);

// Should throw an Error at initialization
// const wrong = new LineManager([
//     { name: 'Stop', timeToNext: { wrong: 'Should be a number'} }
//]);


