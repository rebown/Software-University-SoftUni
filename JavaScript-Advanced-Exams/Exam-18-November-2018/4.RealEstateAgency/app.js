function realEstateAgency () {
    const building = $('#building');
    let agencySumOfCommissions = 0;
	$('button[name=regOffer]').on('click', function() {

        let apartmentRent = Number($('input[name=apartmentRent]').val())
        let apartmentType = $('input[name=apartmentType]').val()
        let agencyCommission = Number($('input[name=agencyCommission]').val())

        if(typeof apartmentRent === 'number' && typeof agencyCommission === 'number'
            && apartmentRent > 0 && agencyCommission >= 0 && agencyCommission <= 100
            && apartmentType !== '' && apartmentType.includes(':') === false) {

            let div = $('<div>').addClass('apartment');
            div.append($('<p>').text('Rent: ' + apartmentRent))
                .append($('<p>').text('Type: ' + apartmentType))
                .append($('<p>').text('Commission: ' + agencyCommission));

            building.append(div);

            $('#message').text('Your offer was created successfully.');
        }else {
            $('#message').text('Your offer registration went wrong, try again.');
        }

        $('input').val('')
	});

	$('button[name=findOffer]').on('click', function() {
        let familyBudget = Number($('input[name=familyBudget]').val())
        let familyApartmentType = $('input[name=familyApartmentType]').val()
        let familyName = $('input[name=familyName]').val();

        let offers = $('#building div');
        for (let offer of offers) {
            let rentStr = $(offer).find("p:contains('Rent')").text();
            let typeStr = $(offer).find("p:contains('Type')").text();
            let commissionStr = $(offer).find("p:contains('Commission')").text();

            let rent = Number(rentStr.split(' ')[1]);
            let type = typeStr.split(':')[1].trim();
            let commission = Number(commissionStr.split(' ')[1]);
            console.log(commission);

            if(type === familyApartmentType && familyBudget >= (rent + (rent*(commission / 100)))) {

                agencySumOfCommissions += rent;
                $(offer).empty();
                let button = $('<button>').on('click', function(event) {
                    $(event.target).parent().remove();
                    $('#message').text(`They had found cockroaches in ${familyName}\'s apartment`)
                });
                $(offer)
                    .append($('<p>').text(familyName))
                    .append($('<p>').text('live here now'))
                    .append(button.text('MoveOut'))

                $('#roof > h1').text(`Agency profit: ${agencySumOfCommissions} lv.`)
                $('#message').text('Enjoy your new home! :)).');
            }else {
                $('#message').text('We were unable to find you a home, so sorry :(');
            }
            $('input').val('');
        }
    });
}