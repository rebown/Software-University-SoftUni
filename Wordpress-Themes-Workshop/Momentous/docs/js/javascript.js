$(document).ready(ev => {

    /* Search show/hide */
    $('#toggle').on('click', () => {
        $('.search').slideToggle(1000);
    })

    /* menu slider */
    $(".navigation ul li").hover(function (event) {
        $(this).find('a').siblings('ul').css('visibility','visible').hide().stop().slideDown();
    }, function () {
        $(this).find('a').siblings('ul').stop().slideUp();
    });

 })