function acceptance() {
	const warehouse = $('#warehouse');

	let shippingCompany = $('input[name=shippingCompany]').val()
	let productName = $('input[name=productName]').val()
	let productQuantity = Number($('input[name=productQuantity]').val())
	let productScrape = Number($('input[name=productScrape]').val())

    console.log(shippingCompany === '');
    console.log(productName === '');
    console.log(productQuantity === 0);
    console.log(productScrape === 0);

	let notScrapredQuantity = productQuantity - productScrape;

	if(notScrapredQuantity > 0 && shippingCompany !== '' && productName !== ''
	&& productQuantity !== 0 && productScrape !== 0) {
        let div = $('<div>');
        let p = $('<p>').text(`[${shippingCompany}] ${productName} - ${notScrapredQuantity} pieces`)
        let button = $('<button>').text('Out of stock');
        button.on('click', function(event) {
            $(event.target).parent().remove()
        });
        div.append(p).append(button);
        warehouse.append(div);
	}

	$('input').val('');
}