function getAge() {
    var startDate = moment("30.06.1993", "DD.MM.YYYY");
    var endDate = moment();
    return endDate.diff(startDate, 'years');
}

function getTimeDifference(fromDate) {
    var startDate = moment(fromDate, "DD/MM/YYYY");
    var endDate = moment();
    return `${endDate.diff(startDate, 'years')} yrs ${endDate.diff(startDate, 'months') % 12} mos`;
}

function getEmailId() {
    return 'himanshu30pandey@gmail.com';
}

function getResumeLink() {
    return 'https://drive.google.com/file/d/1mZQz_T48kxQPBguuAVnomyyfDjlXrlL_/view?usp=sharing';
}

function openMailClient() {
    let subject = $(".js-field-name").val();
    let message = $(".js-field-message").val();
    window.open(`mailto:${getEmailId()}?subject=${subject}&body=${message}`);
}

$(document).ready(function () {
    //handle resume calls
    if (window.location.pathname.toLowerCase() === 'resume') {
        window.location = getResumeLink();
    } else {
        $("#spnAge").text(getAge());
        $("#duration").text(getTimeDifference($("#duration").data("from")));
        $(".hrefMyEmail").attr('href', `mailto:${getEmailId()}`);
        $(".hrefMyEmail").text(getEmailId());
        $(".hrefResumeLink").attr('href', getResumeLink());
        $('.menu__mobile-button, .mobile-menu__close').on('click', function () {
            console.log('HELLO');
            $('.mobile-menu').toggleClass('active');
        });
    }
});
