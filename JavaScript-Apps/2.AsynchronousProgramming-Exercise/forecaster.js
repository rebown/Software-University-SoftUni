function attachEvents() {
    const URL = 'https://judgetests.firebaseio.com/';

    $('#submit').click(loadForecast);

    function request(endpoint) {
        return $.ajax({
            method: "GET",
            url: URL + endpoint
        })
    }

    function loadForecast() {
        request('locations.json')
            .then(displayForecast)
            .catch(handleError);

        function displayForecast(locations) {
            let location = $('#location').val();
            let currentLocation = locations
                .filter(l => l['name'] === location)[0];
            let name = currentLocation['name'];
            let code = currentLocation['code'];

            let weatherSymbols = {
              'Sunny':'&#x2600;',
                'Partly sunny':'&#x26C5;',
                'Overcast':'&#x2601;',
                'Rain':'&#x2614;',
            };

            let todaysForecastP = request(`forecast/today/${code}.json`);
            let upcomingForecastP = request(`forecast/upcoming/${code}.json`);

            Promise.all([todaysForecastP, upcomingForecastP])
                .then(attachInfo)
                .catch(handleError);

            function attachInfo([todaysForecast, upcomingForecast]) {
                $('#forecast').css('display','block');

                displayTodaysForecast();
                displayUpcomingForecast();

                function displayUpcomingForecast(){
                    let upcoming = $('#upcoming');
                    upcoming.empty();
                    upcoming
                        .append($('<div>')
                            .addClass('label')
                            .text('Three-day forecast'));
                    for (let forecast of upcomingForecast['forecast']) {
                        console.log(forecast);
                        let condition = forecast['condition'];
                        let high = forecast['high'];
                        let low = forecast['low'];

                        upcoming
                            .append($('<span>')
                                .addClass('upcoming')
                                .append($('<span>')
                                    .addClass('symbol')
                                    .html(weatherSymbols[condition]))
                                .append($('<span>')
                                    .addClass('forecast-data')
                                    .html(low + '&#176;/' + high + '&#176;'))
                                .append($('<span>')
                                    .addClass('forecast-data')
                                    .text(condition)));
                    }
                }

                function displayTodaysForecast() {
                    let name = todaysForecast['name'];
                    let condition = todaysForecast['forecast']['condition'];
                    let high = todaysForecast['forecast']['high'];
                    let low = todaysForecast['forecast']['low'];
                    let current = $('#current');
                    current.empty();

                    current
                        .append($('<div>')
                            .addClass('label')
                            .text('Current conditions'))
                        .append($('<span>')
                            .addClass('condition symbol')
                            .html(weatherSymbols[condition]))
                        .append($('<span>')
                            .addClass('condition')
                            .append($('<span>')
                                .addClass('forecast-data')
                                .text(name))
                            .append($('<span>')
                                .addClass('forecast-data')
                                .html(low + '&#176;/' + high + '&#176;'))
                            .append($('<span>')
                                .addClass('forecast-data')
                                .text(condition)))
                }
            }
        }
    }

    function handleError() {
        $('#forecast').css('display','block')
            .text('Error');
    }
}