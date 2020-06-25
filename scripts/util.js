//Open mobile menu
$('.menu__mobile-button, .mobile-menu__close').on('click', function () {
    $('.mobile-menu').toggleClass('active');
});

function getAge() {
    var startDate = moment("30.06.1993", "DD.MM.YYYY");
    var endDate = moment();
    return endDate.diff(startDate, 'years');
}

function getTimeInTW() {
    var startDate = moment("15.01.2018", "DD.MM.YYYY");
    var endDate = moment();
    return `${endDate.diff(startDate, 'years')} yrs ${endDate.diff(startDate, 'months') % 24} mos`;
}

$(document).ready(function () {
    $("#spnAge").text(getAge());
    $("#spnTimeInTW").text(getTimeInTW());
});