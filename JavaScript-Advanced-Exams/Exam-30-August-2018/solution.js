    function makeReservation(container) {

        $("#fullName").prop('required',true);
        $("#email").prop('required',true);
        let data = [];


        $('#submit').click(() => {
            let fullName = $('#fullName').val();
            let email = $('#email').val();
            let phoneNumber = $('#phoneNumber').val();
            let address = $('#address').val();
            let postalCode = $('#postalCode').val();
            data.push(fullName, email, phoneNumber, address, postalCode);
            console.log(data);

            if ($.trim($("#email").val()) !== "" || $.trim($("#fullName").val()) !== "") {
                $('#infoPreview')
                    .append(`<li>Name: ` + fullName + `</li>`)
                    .append(`<li>E-mail: ` + email + `</li>`)
                    .append(`<li>Phone: ` + phoneNumber + `</li>`)
                    .append(`<li>Address: ` + address + `</li>`)
                    .append(`<li>Postal Code: ` + postalCode + `</li>`);

                $('#submit').prop( "disabled", true );
                $('#edit').prop("disabled", false);
                $('#continue').prop("disabled", false);

                $('input').val('');
            }
        });

        $('#edit').click(() => {
            $('#fullName').val(data[0]);
            $('#email').val(data[1]);
            $('#phoneNumber').val(data[2]);
            $('#address').val(data[3]);
            $('#postalCode').val(data[4]);

            data = [];

            $('#submit').prop( "disabled", false );

            $('#edit').prop("disabled", true);
            $('#continue').prop("disabled", true);
            $('#infoPreview > li').remove();
        });

        $(`#continue`).click(() => {
            $(container)
                .append(`<h2>Payment details`)
                .append($(`<select id="paymentOptions" class="custom-select">`)
                    .append(`<option selected disabled hidden> Choose`)
                    .append(`<option value="creditCard">Credit Card`)
                    .append(`<option value="bankTransfer">Bank Transfer`)
                )
                .append(`<div id="extraDetails">`);

            $('#edit').prop("disabled", true);
            $('#continue').prop("disabled", true);

            $('#paymentOptions').change(function() {
                let text = $(this).find('option:selected').text();

                if(text === "Credit Card") {
                    $('#extraDetails').empty();
                    $('#extraDetails')
                        .append(`<div class="inputLabel">Card Number<input></div><br>`)
                        .append(`<div class="inputLabel">Expiration Date<input></div><br>`)
                        .append(`<div class="inputLabel">Security Numbers<input></div><br>`)
                        .append(`<button id="checkOut">Check Out</button>`);
                }else {
                    $('#extraDetails').empty();
                    $('#extraDetails')
                        .append(`<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890`)
                        .append(`<button id="checkOut">Check Out`);
                }

                $('#checkOut').click(() => {
                    $('#wrapper').empty();
                    $('#wrapper').append(`<h4>Thank you for your reservation!`);
                });
            });
        });
    }