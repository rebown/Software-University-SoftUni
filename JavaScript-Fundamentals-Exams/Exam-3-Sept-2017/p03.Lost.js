function decrypt(keyword, text) {
    let locationPattern = /(north|east)\D*(\d{2})[^\,]*\D*(,{1})\D*(\d{6})/gi;
    let message = text.substring(text.indexOf(keyword) + keyword.length, text.lastIndexOf(keyword));

    let match = locationPattern.exec(text);
    let latitude;
    let longitude;

    while (match) {
        if(match[1].toLowerCase() == 'east') {
            longitude = `${match[2]}.${match[4]} E`;
        }else  if(match[1].toLowerCase() == 'north') {
            latitude = `${match[2]}.${match[4]} N`;
        }
        match = locationPattern.exec(text);
    }

    console.log(latitude);
    console.log(longitude);
    console.log(`Message: ${message}`);
}

let keyword = '4ds';
let text = 'eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532';
decrypt(keyword, text);