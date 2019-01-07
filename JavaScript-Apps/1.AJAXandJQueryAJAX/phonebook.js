const URL = "https://phonebook-ee8ce.firebaseio.com/";
const PERSON = $('#person');
const PHONE = $('#phone');

$('#btnLoad').on('click', loadContent);
$('#btnCreate').on('click', createContent);

function loadContent() {
    $.ajax({
       method: "GET",
        url: URL + '.json'
    }).then(renderList)
    .catch(errorHandler);
}

function renderList(data) {
    console.log(data);

    $('#phonebook').empty();
    for (let key in data) {
        let li = $('<li>');
        li.text(`${data[key]['person']}: ${data[key]['phone']} `);
        $('#phonebook').append(li);
        li.append($('<a href="#">Delete</a>').on('click', deleteContact.bind(this, key)));
    }
}

function deleteContact(key) {
    $.ajax({
       method: "DELETE",
       url: URL + key.toString() + '.json'
    })
        .then(loadContent)
        .catch(errorHandler);
}

function createContent() {
    let person = PERSON.val();
    let phone = PHONE.val();

    let newContactJSON = JSON.stringify({person, phone});
    $.ajax({
        method: "POST",
        url: URL + '.json',
        data: newContactJSON
    })
        .then(loadContent)
        .catch(errorHandler);

    $('#person').val("");
    $('#phone').val("");
}

function errorHandler(error) {
    $("#phonebook").append($("<li>Error</li>"));
}