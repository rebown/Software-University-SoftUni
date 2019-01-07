function solve(input) {
    let concat = '';
    for (let arr of input) {
        let firstCommand = arr[0];

        if(firstCommand === 'get') {
            let num = arr[1];
            let word = arr[2];
            num = +num;
            if(num !== 0) {
                let strAtPosition = word.split('')[num - 1];

                concat += '' + strAtPosition
            }
        }else {
            let [command, secondaryCommand, num, word] = arr;
            num = +num;

            if(num !== 0) {
                if (command === 'filter') {
                    let strAtPosition;

                    let extractedCharacters = word.match(/[a-zA-Z]/g)
                    let extractedDigits = word.match(/[0-9]/g);

                    if(secondaryCommand === 'UPPERCASE') {
                        strAtPosition = extractedCharacters.filter(ch => ch === ch.toUpperCase())[num - 1]
                    }else if(secondaryCommand === 'LOWERCASE') {
                        strAtPosition = extractedCharacters.filter(ch => ch === ch.toLowerCase())[num - 1];
                    }else if(secondaryCommand === 'NUMS') {
                        strAtPosition = extractedDigits[num - 1]
                    }
                    concat  += '' + strAtPosition;
                }else if(command === 'sort') {
                    let sortedCharArray = [];
                    if(secondaryCommand === 'A') {
                        sortedCharArray = word.split('').sort((a,b) => a.localeCompare(b))
                    }else if(secondaryCommand === 'Z') {
                        sortedCharArray = word.split('').sort((a,b) => b.localeCompare(a))
                    }
                    let strAtPosition = sortedCharArray[num - 1];
                    concat  += '' + strAtPosition;
                }else if(command === 'rotate') {
                    let count = Number(secondaryCommand);
                    let arrOfChars = word.split('');
                    for (let i = 0; i < count; i++) {
                        let lastElement = arrOfChars.pop();
                        arrOfChars.unshift(lastElement);
                    }
                    let strAtPosition = arrOfChars[num - 1];
                    concat += '' + strAtPosition;
                }
            }


        }
    }

    console.log(concat)
}

solve(
    [["filter", "UPPERCASE", 4, "AkIoRpSwOzFdT"],
        ["sort", "A", 3, "AOB"],
        ["sort", "A", 3, "FAILCL"],
        ["sort", "Z", 2, "OUTAGN"],
        ["filter", "UPPERCASE", 2, "01S345U7N"],
        ["rotate", 2, 2, "DAN"],
        ["get", 2, "PING"],
        ["get", 3, "?- 654"]
    ]

)