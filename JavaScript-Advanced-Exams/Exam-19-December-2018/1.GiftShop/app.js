function solution() {

    $('#fields button').on('click', function() {
        let toyType = $('#toyType').val();
        let toyPrice = $('#toyPrice').val();
        let toyDescription = $('#toyDescription').val();

        toyPrice = +toyPrice;

        // console.log(toyType);
        // console.log(toyPrice);
        // console.log(toyDescription);

        if(toyType !== '' && typeof toyPrice === 'number' && toyDescription !== '') {

            let div = $('<div>').addClass('gift');
            div.append($("<img src='gift.png'>"));
            div.append($('<h2>').text(toyType));
            div.append($('<p>').text(toyDescription))

            let button = $('<button>');
            button.text(`Buy it for $${toyPrice}`);

            button.on('click', function() {
                $(this).parent().remove();
            });

            div.append(button);

            $('#christmasGiftShop').append(div);

            $('input').val('');

        }
    })

}