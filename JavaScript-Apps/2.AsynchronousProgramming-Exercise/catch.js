function attachEvents() {
    const BASE_URL  = 'https://baas.kinvey.com/appdata/kid_BkXFF9Z0X/biggestCatches';
    const USERNAME = "Kiril";
    const PASSWORD = "12345";
    const BASE_64 = btoa(USERNAME + ":" + PASSWORD);
    const AUTH = {"Authorization": "Basic " + BASE_64};

    $('.load').click(loadCatch);
    $('.add').click(createCatch);
    //$('.update').on('click',updateCatch)

    function loadCatch() {
        $.ajax({
            method: "GET",
            url: BASE_URL,
            headers: AUTH
        })
            .then(displayCatch)
            .catch(handleError);
    }

    function createCatch() {
        let data = {
            "angler":$('#addForm > .angler').val(),
            "weight": Number($('#addForm > .weight').val()),
            "species": $('#addForm > .species').val(),
            "location": $('#addForm > .location').val(),
            "bait": $('#addForm > .bait').val(),
            "captureTime": Number($('#addForm > .captureTime').val())
        };
        console.log(data);
        $.ajax({
            method: "POST",
            url: BASE_URL,
            headers: AUTH,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        })
            .then(loadCatch)
            .catch(handleError);
    }

    function updateCatch(event) {
        let catchId = $(event.target).parent().attr('data-id');
        let newData = {
            "angler":$(`[data-id=${catchId}] > .angler`).val(),
            "weight": Number($(`[data-id=${catchId}] > .weight`).val()),
            "species": $(`[data-id=${catchId}] > .species`).val(),
            "location": $(`[data-id=${catchId}] > .location`).val(),
            "bait": $(`[data-id=${catchId}] > .bait`).val(),
            "captureTime": Number($(`[data-id=${catchId}] > .captureTime`).val())
        };

        $.ajax({
            method: "PUT",
            url: BASE_URL + `/${catchId}`,
            headers: AUTH,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(newData)
        })
            .then(loadCatch)
            .catch(handleError);
    }

    function deleteCatch(event) {
        let catchId = $(event.target).parent().attr('data-id');
        $.ajax({
            method: "DELETE",
            url: BASE_URL + `/${catchId}`,
            headers: AUTH
        })
            .then(loadCatch)
            .catch(handleError);
    }

        function displayCatch(catchData) {
            let catches = $('#catches');
            catches.empty();
            for (let cat of catchData) {
                let angler = cat['angler'];
                let weight = cat['weight'];
                let species = cat['species'];
                let location = cat['location'];
                let bait = cat['bait'];
                let captureTime = cat['captureTime'];
                let catchId = cat['_id'];

                catches
                    .append($(`<div class="catch" data-id="${catchId}">`)
                        .append($(`<label>Angler</label>`))
                        .append($(`<input type="text" class="angler" value="${angler}"/>`))
                        .append($(`<label>Weight</label>`))
                        .append($(`<input type="number" class="weight" value="${weight}"/>`))
                        .append($(`<label>Species</label>`))
                        .append($(`<input type="text" class="species" value="${species}"/>`))
                        .append($(`<label>Location</label>`))
                        .append($(`<input type="text" class="location" value="${location}"/>`))
                        .append($(`<label>Bait</label>`))
                        .append($(`<input type="text" class="bait" value="${bait}"/>`))
                        .append($(`<label>Capture Time</label>`))
                        .append($(`<input type="number" class="captureTime" value="${captureTime}"/>`))
                        .append($(`<button class="update">Update</button>`)
                            .on('click', updateCatch))
                        .append($(`<button class="delete">Delete</button>`)
                            .on('click', deleteCatch))
                    );

            }
        }

    function handleError(err) {
        console.log(err);
    }
}