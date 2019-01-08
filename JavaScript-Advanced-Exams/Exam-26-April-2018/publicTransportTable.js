class PublicTransportTable {
    constructor(town) {
        this.town = town;
        this.addTown(town);
        this.eventListener();
    }

    addTown(town) {
        return $('table > caption').text(`${this.town}'s Public Transport`);
    }

    addVehicle(obj) {
        let row = $(`<tr><td>${obj.type}</td><td>${obj.name}</td>`);
        let td = $('<td>');
        let button = $('<button>More Info</button>');


        let trExtra = $(`<tr class="more-info"><td colspan="3"><table><tr>`+
            `<td>Route: ${obj.route}</td></tr>`+
            `<tr><td>Price: ${obj.price}</td></tr>`+
            `<tr><td>Driver: ${obj.driver}</td></tr></table></td></tr>`);

        td.append(button);
        row.append(td);
        $('tbody.vehicles-info').append(row);

        button.on('click',function()  {
            if($(this).text() === "More Info") {
                $(this).text("Less Info")
                trExtra.insertAfter(row);

            }else {
                $(this).text("More Info")
                trExtra.remove()
            }
        });
    }

    eventListener() {
        let arrOfRows = [];
        $('.search-btn').on('click', function() {
            let typeForm = $('input[name="type"]');
            let nameForm = $('input[name="name"]');
            let type = typeForm.val();
            let name = nameForm.val();
            let rows = $('.vehicles-info > tr').not(".more-info");
            console.log(rows);

            if(type || name) {
                for(let i = 0;i < rows.length; i++) {
                    let row = rows[i];
                    let firstChild = $(row).find('td').eq(0);
                    let secondChild = $(row).find('td').eq(1);
                    firstChild = firstChild.text();
                    secondChild = secondChild.text();
                    let button = $(row).find('td').find('button');
                    console.log(button);
                    if(!firstChild.includes(type) || !secondChild.includes(name)) {
                        $(row).css('display', 'none');
                        if(button.text() === "Less Info") {
                            button.click();
                        }
                    }else {
                        $(row).css('display', '');
                    }
                }
            }
        });

        $('.clear-btn').on('click', function() {
            $('input[name="type"]').val("");
            $('input[name="name"]').val("");


            $('.vehicles-info > tr').css("display", '')
        });
    }
}