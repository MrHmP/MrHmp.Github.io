'use strict';

//JQuery DOM Calls--------------------------
function scrollSkillProgress() {
    let previousClickedMenuLink = undefined;
    let form = document.querySelector('.js-form');
    let formName = '.js-form';
    let $click = $('.site-btn');

    //functions--------------------------
    function calculateAge(birthday) {
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    //Fixed-top menu
    function fixedHeader() {
        let ww = $(window).scrollTop();
        if (ww > 0) {
            $('.menu').addClass('menu--active');
            $('.mobile-menu').addClass('mobile-menu--active');
        } else {
            $('.menu').removeClass('menu--active');
            $('.mobile-menu').removeClass('mobile-menu--active');
        }
    }

    //Animate headers of .section
    let hideHeader = function (header) {
        header.css('text-indent', '-9999px');
    };

    let showHeader = function (header) {
        header.css('text-indent', '0px');
    };

    let animateHeader = function (header, text) {
        //clear header text
        header.text("");
        //and animate it
        let nextAnimationStep = function () {
            if (text.length > 0) {
                header.text(header.text() + text.substr(0, 1));
                text = text.substr(1);
                setTimeout(nextAnimationStep, 100);
            }
        };
        nextAnimationStep();
    };

    let animateHeaders = function (headers) {
        return Object.keys(headers).map(function (key, index) {
            let elementSelector = key;
            let offset = headers[key];
            let header = $(elementSelector);
            hideHeader(header);
            let waypoint = {};
            waypoint[key] = header.waypoint({
                handler: function () {
                    showHeader(header);
                    animateHeader(header, header.text());
                    this.destroy();
                },
                offset: offset
            })[0];
            return waypoint;
        }).reduce(Object.assign, {});
    };

    //Validation forms
    function validateForm(selector) {
        Array.from(document.querySelectorAll(selector)).forEach(item => {
            item.addEventListener('input', (e) => {
                if (e.target.value === '') {
                    item.dataset.touched = false;
                }
            });
            item.addEventListener('invalid', () => {
                item.dataset.touched = true;
            });
            item.addEventListener('blur', () => {
                if (item.value !== '') item.dataset.touched = true;
            });
        });
    };

    function submitForm(e, formName) {
        e.preventDefault();
        let name = $(formName + ' .js-field-name').val();
        let email = $(formName + ' .js-field-email').val();
        let message = $(formName + ' .js-field-message').val();

        let formData = {
            name: name,
            email: email,
            message: message
        };

        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: formData,
            success: function () {
                console.log('success');
                //...
            },
            error: function () {
                console.log('error');
                //...
            }
        });
    }

    $('.js-progress-list').waypoint({
        handler: function () {
            $(".progress-bar").each(function () {
                $(this).animate({
                    width: $(this).attr('aria-valuenow') + '%'
                }, 200);
            });
            this.destroy();
        }, offset: '50%'
    });

    //Anchors
    $(function () {
        $('a[href^="#"]').click(function () {
            let target = $(this).attr('href');
            $('html, body').animate({ scrollTop: $(target).offset().top - 50 }, 800);
            return false;
        });
    });

    fixedHeader();
    $(window).on('scroll', function () {
        fixedHeader();
    });

    //All ids of titles should be written here to animation work
    let animatedHeaders = animateHeaders({
        "#hello_header": '90%',
        "#resume_header": '70%',
        "#portfolio_header": '70%',
        "#testimonials_header": '70%',
        "#blog_header": '70%',
        "#contacts_header": '70%',
        "#other_posts": '70%'
    });

    $('.portfolio-menu').on('click', 'a', function (event) {
        event.preventDefault();

        if (previousClickedMenuLink) {
            previousClickedMenuLink.removeClass('portfolio-menu__link--active');
        }
        let link = $(event.target);
        link.addClass('portfolio-menu__link--active');
        previousClickedMenuLink = link;

        let targetTag = $(event.target).data('portfolio-target-tag');
        let portfolioItems = $('.portfolio-cards').children();

        if (targetTag === 'all') {
            portfolioItems.fadeIn({ duration: 500 });
        } else {
            portfolioItems.hide();
        }

        portfolioItems.each(function (index, value) {
            let item = $(value);
            if (item.data('portfolio-tag') === targetTag) {
                item.fadeIn({ duration: 500 });
            }
        });
    });

    //Settings for carousel from bootstrap 4.0
    $('.carousel').carousel({
        pause: "hover",
        interval: 5000
    });

    $(".carousel-control-prev").click(function () {
        $(".carousel").carousel("prev");
    });

    $(".carousel-control-next").click(function () {
        $(".carousel").carousel("next");
    });

    //Open mobile menu
    $('.menu__mobile-button, .mobile-menu__close').on('click', function () {
        $('.mobile-menu').toggleClass('active');
    });

    //Close mobile menu after click
    $('.mobile-menu__wrapper ul li a').on('click', function () {
        $('.mobile-menu').removeClass('active');
    });

    validateForm('.js-form .form-field');

    form.addEventListener('submit', function (e) {
        submitForm(e, formName);
    });

    $click.mbClicker({
        size: 300, //Maximum size of circle
        speed: 750, //Time of animation in miliseconds
        colour: 'rgba(0,0,0,0.11)', //Colour of circle and shadow
        shadow: false, //Whether or not to have a shadow on the circle
        buttonAnimation: true //Only use if button doesn't have a style attribute
    });

    $.fn.mbClicker = function (t) { var i = $(this), n = navigator.userAgent, o = n.match(/iPad/i) ? "touchstart" : "mousedown", e = "none"; t.shadow && (e = "0 0 " + t.size / 5 + "px " + t.colour), i.unbind().on(o, function (i) { var n = $(this), o = n.attr("data-clickpoint"), r = i.clientX + "x" + i.clientY; if (o == r) return !1; n.attr("data-clickpoint", r), i.preventDefault(), i.stopImmediatePropagation(), n.append('<div class="clicked"></div>'); var a = i.offsetX, s = i.offsetY, c = $(".clicked"); c.css({ position: "absolute", top: s.toString() + "px", left: a.toString() + "px", width: "0", height: "0", border: "0px solid " + t.colour, "box-shadow": e, "border-radius": "100%", "box-sizing": "border-box", "-webkit-transition": "none", transition: "none", "pointer-events": "none", "z-index": Number.MAX_VALUE.toString() }), c.animate({ top: (s - t.size).toString() + "px", left: (a - t.size).toString() + "px", "border-width": t.size.toString() + "px", opacity: "0" }, t.speed, function () { $(this).remove() }), t.buttonAnimation && (n.css({ "-webkit-transition": "none", transition: "none" }), n.stop().animate({ opacity: "0.8" }, .25 * t.speed, function () { n.animate({ opacity: "1" }, .75 * t.speed, function () { $(this).removeAttr("style") }) })) }) };
}