function dart(){


	let totalPointsHome = 0;
	let totalPointsAway = 0;


    $('#playBoard div').on('click', function(event) {
    	event.stopPropagation();
        let currentId = $(this).attr('id');

        if(currentId === 'firstLayer') {
            let turn = $('#turns  p').first().text();
            let homeOrAway = turn.split(' ')[2];

            let target = $('tbody').find("td:contains('Green') + td").text()
            let points = +target.split(' ')[0]
            console.log(points);

            if(homeOrAway === "Home") {
            	totalPointsHome += points;

            	$('#Home > p').first().text(totalPointsHome)
				$('#turns > p').first().text('Turn on Away');
            	$('#turns  p:nth-child(2)').text('Next is Home');
			}else {
				totalPointsAway += points;

				$('#Away > p').first().text(totalPointsAway)
				$('#turns > p').first().text('Turn on Home');
				$('#turns  p:nth-child(2)').text('Next is Away');
			}
		}else if (currentId === 'secondLayer') {
                let turn = $('#turns > p').first().text();
                let homeOrAway = turn.split(' ')[2];


            let target = $('tbody').find("td:contains('Yellow') + td").text()
            let points = +target.split(' ')[0]

            console.log(points);

                if(homeOrAway === "Home") {
                    totalPointsHome += points;

                    $('#Home > p').first().text(totalPointsHome)
                    $('#turns > p').first().text('Turn on Away');
                    $('#turns  p:nth-child(2)').text('Next is Home');
                }else {
                    totalPointsAway += points;

                    $('#Away > p').first().text(totalPointsAway)
                    $('#turns > p').first().text('Turn on Home');
                    $('#turns  p:nth-child(2)').text('Next is Away');
                }
		}else if (currentId === 'thirdLayer') {
            let turn = $('#turns > p').first().text();
            let homeOrAway = turn.split(' ')[2];

            let target = $('tbody').find("td:contains('Orange') + td").text()
            let points = +target.split(' ')[0]


            if(homeOrAway === "Home") {
                totalPointsHome += points;

                $('#Home > p').first().text(totalPointsHome)
                $('#turns > p').first().text('Turn on Away');
                $('#turns  p:nth-child(2)').text('Next is Home');
            }else {
                totalPointsAway += points;

                $('#Away > p').first().text(totalPointsAway)
                $('#turns > p').first().text('Turn on Home');
                $('#turns  p:nth-child(2)').text('Next is Away');
            }
        }else if (currentId === 'fourthLayer') {
            let turn = $('#turns > p').first().text();
            let homeOrAway = turn.split(' ')[2];

            let target = $('tbody').find("td:contains('Red') + td").text()
            let points = +target.split(' ')[0]


            if(homeOrAway === "Home") {
                totalPointsHome += points;

                $('#Home > p').first().text(totalPointsHome)
                $('#turns > p').first().text('Turn on Away');
                $('#turns  p:nth-child(2)').text('Next is Home');
            }else {
                totalPointsAway += points;

                $('#Away > p').first().text(totalPointsAway)
                $('#turns > p').first().text('Turn on Home');
                $('#turns  p:nth-child(2)').text('Next is Away');
            }
        }else if (currentId === 'fifthLayer') {
            let turn = $('#turns > p').first().text();
            let homeOrAway = turn.split(' ')[2];

            let target = $('tbody').find("td:contains('Purple') + td").text()
            let points = +target.split(' ')[0]


            if(homeOrAway === "Home") {
                totalPointsHome += points;

                $('#Home > p').first().text(totalPointsHome)
                $('#turns > p').first().text('Turn on Away');
                $('#turns  p:nth-child(2)').text('Next is Home');
            }else {
                totalPointsAway += points;

                $('#Away > p').first().text(totalPointsAway)
                $('#turns > p').first().text('Turn on Home');
                $('#turns  p:nth-child(2)').text('Next is Away');
            }
        }else if (currentId === 'sixthLayer') {
            let turn = $('#turns > p').first().text();
            let homeOrAway = turn.split(' ')[2];

            let target = $('tbody').find("td:contains('Blue') + td").text()
            let points = +target.split(' ')[0]


            if(homeOrAway === "Home") {
                totalPointsHome += points;

                $('#Home > p').first().text(totalPointsHome)
                $('#turns > p').first().text('Turn on Away');
                $('#turns  p:nth-child(2)').text('Next is Home');
            }else {
                totalPointsAway += points;

                $('#Away > p').first().text(totalPointsAway)
                $('#turns > p').first().text('Turn on Home');
                $('#turns  p:nth-child(2)').text('Next is Away');
            }
        }

        if(totalPointsHome >= 100) {
            $('#Home > p:nth-child(2)').css('background', 'green')
            $('#Away > p:nth-child(2)').css('background', 'red')
            $(event.target).removeEventListener('click', true)

        }else if(totalPointsAway >= 100) {
            $('#Away > p:nth-child(2)').css('background', 'green')
            $('#Home > p:nth-child(2)').css('background', 'red')
            $(event.target).removeEventListener('click', true)
        }
    })


}