//Open mobile menu
$('.menu__mobile-button, .mobile-menu__close').on('click', function () {
    $('.mobile-menu').toggleClass('active');
});

function getAge() {
    var dob_asdate = new Date(1993, 06, 30);
    var today = new Date();
    var mili_dif = Math.abs(today.getTime() - dob_asdate.getTime());
    return Math.floor(mili_dif / (1000 * 3600 * 24 * 365.25));
}

$(document).ready(function () {
    $("#spnAge").text(getAge());
});