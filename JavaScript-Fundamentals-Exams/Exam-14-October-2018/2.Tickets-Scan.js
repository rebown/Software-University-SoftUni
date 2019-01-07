function ticketsScan(str, inf) {
    let text = str;
    let info = inf;

    let namePattern = /\s{1}[A-Z]{1}[a-zA-Z]*-[A-Z]{1}[a-zA-Z]*(.-[A-Z]{1}[a-zA-Z]*|)\s{1}/g;
    let airportPattern = /\s{1}[A-Z]{3}\/[A-Z]{3}\s{1}/g;
    let flightNumberPattern = /\s{1}[A-Z]{1,3}[0-9]{1,5}\s{1}/g;
    let companyPattern = /-\s{1}[A-Z]{1}[a-z]*\*[A-Z]{1}[a-z]*\s{1}/g;

    let name = text.match(namePattern);
    let airports = text.match(airportPattern);
    let flightNumber = text.match(flightNumberPattern);
    let company = text.match(companyPattern);

    switch (info) {
        case "name":
            if(name) {
                name = name[0].replace(/-/g, ' ').trim();
                console.log(`Mr/Ms, ${name}, have a nice flight!`);
            }
             break;
        case "flight":
            if(airports && flightNumber) {
                let fromAirport = airports[0].split('\/')[0].trim();
                let toAirport = airports[0].split('\/')[1].trim();
                flightNumber = flightNumber[0].trim();

                console.log(`Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`);
            }
           break;
        case "all":
            if(name && airports && flightNumber && airports && company) {
                name = name[0].replace(/-/g, ' ').trim();
                company = company[0].replace(/[\-\s\*]/gm, ' ').trim();
                let fromAirport = airports[0].split('\/')[0].trim();
                let toAirport = airports[0].split('\/')[1].trim();
                flightNumber = flightNumber[0].trim();
                console.log(`Mr/Ms, ${name}, your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${company}.`);
            }
           break;
        case "company":
            if(company) {
                company = company[0].replace(/[\-\s\*]/gm, ' ').trim();
                console.log(`Have a nice flight with ${company}.`)
            }
    }
}

ticketsScan(' Pesh-Pe.-PeSssH travels from  PPO/HAG  - BBg*Airplanes  X32I58   HQJ09878  from STD15:23 arriving at STA01:43', 'flight');