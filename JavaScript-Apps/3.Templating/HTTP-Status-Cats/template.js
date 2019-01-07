$(async () => {
    const allCatsBox = $('#allCats');
    const templates = {};

        let cardTemplate = await $.get("./templates/card-box.hbs");
        templates['card'] = Handlebars.compile(cardTemplate);

    let cats = window.cats;
    let context = {
        cats
    };
    let allCats = templates['card'](context)
    allCatsBox.html(allCats);

    $(allCatsBox).find('button').click((event) => {
        $(event.target).parent().find('div').toggle("slow");
        // $('.card-block').find('div').css('display', 'none')
        // console.log($(event.target).parent().find('div'));
        // $(event.target).parent().find('div').show();
    })

})
