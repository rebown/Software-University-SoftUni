function DNAex(input) {
    let pattern = /^([a-z!@#$?]+)=([\d]+)--([\d]+)<<([\w]+)$/;
    let genes = {};

    let index = 0;

    while(input[index] !== 'Stop!') {
        let line = input[index];
        let matches = pattern.exec(line);
        if(matches !== null) {
         let name = matches[1];
         name = name.replace(/[!@#$?]+/g, '');
         let nameLength = parseInt(matches[2]);
         if(name.length === nameLength) {
             let geneCount = parseInt(matches[3]);
             let organism = matches[4];
             if(!genes.hasOwnProperty(organism)) {
                 genes[organism] = 0;
             }
             genes[organism] += geneCount;
         }
        }
        index++;
    }
    let sortedKeys = Object.keys(genes).sort((a,b) => genes[b] - genes[a]);
    for(let key of sortedKeys) {
        console.log(`${key} has genome size of ${genes[key]}`)
    }
}

let input = ["!@ab?si?di!a@=7--152<<human",
"b!etu?la@=6--321<<dog",
"!curtob@acter##ium$=14--230<<dog",
"!some@thin@g##=9<<human",
"Stop!"
];

DNAex(input);