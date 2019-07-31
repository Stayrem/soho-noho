var owl;
document.addEventListener("DOMContentLoaded", function () {

    initItemMap();
    setAppartmentSlider();
    setSliderBtns();
    openMobileMenu();
    masonryGalleryMaker();
    scrollAmimationInit();
    appsFilterBtnEvent();
    animateImage();
    formValidator();
    changerValidateMessage();
    setPhoneMask();
    moveToForm();
    galleryFilterInit();
    sortMeiaGallery();
    initPopup();
    mobileScrollTo();
    $('.owl-carousel').trigger('to.owl.carousel', 1);
    validateSubscription();
    filterSlides();
    $('.appartments__filter-item:first-child').click();
});

function filterSlides(){
    
    
    $( '.appartments__filter' ).on( 'click', '.appartments__filter-item', function() {

        var $item = $(this);
        $('.appartments__filter-item').removeClass('active');
        $(this).addClass('active');
        var filter = $item.data( 'owl-filter' )
    
        owl.owlcarousel2_filter( filter );
        $('.owl-carousel').trigger('to.owl.carousel', 1);
    } )
}

function validateSubscription() {
    var elm = document.querySelector(".subscribe__form input");
    var errorElm = document.getElementById("error-user-email");
    var successBtn = document.querySelector('.subscribe__submit');
    if (successBtn != null) {
        successBtn.addEventListener("click", validator);

        function validator() {
            errorElm.style.display = ValidateEmail(elm.value) ? "none" : "block";
            if (ValidateEmail(elm.value)) {
                subscribeAjaxSender();
            }
        }
        successBtn.addEventListener('click', function () {})
        var emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

        function ValidateEmail(email) {
            return emailPattern.test(email);
        }
    }
}

function subscribeAjaxSender() {
    //var $nameUrl = '&fields[Name]=';
    var $url = 'https://api.unisender.com/ru/api/subscribe?format=json&api_key=6ymtxf34uo6gteook3g653g9j7s7hedhs7kwp36a&list_ids=17947745&fields[email]=';

    $(function () {

        var $form = $(this);
        $.ajax({
            type: 'POST',
            url: $url + $('.subscribe__form').find('input').val(),
            data: $form.serialize()
        }).done(function () {

            $('#confirm-email').slideDown();
            $('#error-user-email').slideUp();
            $('#fail-email').slideUp();
        }).fail(function () {
            $('#fail-email').slideDown();
            $('#confirm-email').slideUp();
            $('#error-user-email').slideUp();
        });
        //отмена действия по умолчанию для кнопки submit

        console.log($url + $('.subscribe__form').find('input').val())

    });
}

function mobileScrollTo() {
    $('.header-mobile__btn').on('click', function () {

        $([document.documentElement, document.body]).animate({
            scrollTop: $(".grid").offset().top
        }, 800);
    });
}

function sendData(el, download) {

    var name, phone, email;

    if (download) {
        name = $('#name-modal').val();
        phone = $('#phone-modal').val();
        email = $('#email-modal').val();

    } else {
        name = $('#name').val();
        phone = $('#phone').val();
        email = $('#email').val();

    }


    if (true) {

        $.ajax({
            url: '/send_mail.php',
            method: 'POST',
            data: {
                name: name,
                phone: phone,
                email: email,
            },
            beforeSend: function () {
                switchLoading(el, 1);
            },
            error: function (response) {
                switchLoading(el, 0);
                showResponseMessage(el, 'danger');
            },
            success: function (response) {
                switchLoading(el, 0);
                showResponseMessage(el, 'success');
                $('input').val('');
                if (download) {
                    document.querySelector('.dwn-link').click();
                }
            }
        });
    }
}

function showResponseMessage(elem, aim) {
    if (aim === 'danger') {
        elem.find('.fail').css({
            'display': 'block'
        });
        elem.find('.success').css({
            'display': 'none'
        });
    } else if (aim === 'success') {
        elem.find('.fail').css({
            'display': 'none'
        });
        elem.find('.success').css({
            'display': 'block'
        });
    }
}

function switchLoading(el, stage) {
    if (stage === 1) {
        el.find('button').addClass('loading');
    } else {
        el.find('button').removeClass('loading');
    }
}

function sortMeiaGallery() {
    var gallery = document.querySelector('.grid-gallery');
    if (gallery != null) {
        //var galleryCont = gallery.querySelector('.isotope-wrapper.half-gutter');


        var url = window.location.toString();
        var indexOfHash;

        for (var i = url.length; i >= 0; i--) {
            if (url[i] === '#') {
                indexOfHash = i;
            }
        }

        var mediaCategory = decodeURI(url.slice(indexOfHash + 1));
        if (mediaCategory === 'view') {
            setTimeout(function () {
                $('.gallery__list-item:nth-child(2) button').click();
            }, 500);

        }
        if (mediaCategory === 'interior') {
            setTimeout(function () {
                $('.gallery__list-item:nth-child(3) button').click();
            }, 500);
        }
    }
}

window.onload = function () {
    initLightGallery();
}

function initLightGallery() {
    $(document).ready(function () {
        $(".styles__right").lightGallery();
    });
    $(document).ready(function () {
        $(".grid-gallery").lightGallery({
            selector: '.grid-gallery a'
        });
    });

}

function initPopup() {
    $('.pdf').magnificPopup({

        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
}

function animateImage() {
    if ($('.tilter.tilter--1').length > 0) {
        var options = {
            movement: {
                imgWrapper: {
                    translation: {
                        x: 10,
                        y: 10,
                        z: 30
                    },
                    rotation: {
                        x: 0,
                        y: -10,
                        z: 0
                    },
                    reverseAnimation: {
                        duration: 200,
                        easing: 'easeOutQuad'
                    }
                },
                lines: {
                    translation: {
                        x: 10,
                        y: 10,
                        z: [0, 70]
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: -2
                    },
                    reverseAnimation: {
                        duration: 2000,
                        easing: 'easeOutExpo'
                    }
                },
                caption: {
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 2
                    },
                    reverseAnimation: {
                        duration: 200,
                        easing: 'easeOutQuad'
                    }
                },
                overlay: {
                    translation: {
                        x: 10,
                        y: -10,
                        z: 0
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 2
                    },
                    reverseAnimation: {
                        duration: 2000,
                        easing: 'easeOutExpo'
                    }
                },
                shine: {
                    translation: {
                        x: 100,
                        y: 100,
                        z: 0
                    },
                    reverseAnimation: {
                        duration: 200,
                        easing: 'easeOutQuad'
                    }
                }
            }
        }

        new TiltFx(document.querySelectorAll('.tilter.tilter--1')[0], options);
        new TiltFx(document.querySelectorAll('.tilter.tilter--1')[1], options);

    }

}

function galleryFilterInit() {

    $('.gallery__list-link').on('click', function () {
        $('.gallery__list-link').removeClass('active');
        $(this).addClass('active');
        var galleryFilterBtn = this.getAttribute('rel');
        if (galleryFilterBtn === 'group1') {
            $('.grid-gallery-item a').removeClass('active');
            $('.group2,.group3').animate({
                opacity: 0,
            }, 300, function () {
                $('.group2,.group3').css({
                    'display': 'none'
                });
                $('.group1').css({
                    'display': 'block',
                    'opacity': '1'
                });
                $('.grid-gallery').masonry();
                $('.group1 a').addClass('active');
                $(document).ready(function () {
                    $(".grid-gallery").lightGallery({
                        selector: '.grid-gallery a.active'
                    });
                });
            });
        } else if (galleryFilterBtn === 'group2') {
            $('.grid-gallery-item a').removeClass('active');
            $('.group1,.group3').animate({
                opacity: 0,
            }, 300, function () {
                $('.group1,.group3').css({
                    'display': 'none'
                });
                $('.group2').css({
                    'display': 'block',
                    'opacity': '1'
                });
                $('.grid-gallery').masonry();
                $('.group2 a').addClass('active');
                $(document).ready(function () {
                    $(".grid-gallery").lightGallery({
                        selector: '.grid-gallery a.active'
                    });
                });
            });
        } else if (galleryFilterBtn === 'group3') {
            $('.grid-gallery-item a').removeClass('active');
            $('.group2,.group1').animate({
                opacity: 0,
            }, 300, function () {
                $('.group2,.group1').css({
                    'display': 'none'
                });
                $('.group3').css({
                    'display': 'block',
                    'opacity': '1'
                });
                $('.grid-gallery').masonry();
                $('.group3 a').addClass('active');
                $(document).ready(function () {
                    $(".grid-gallery").lightGallery({
                        selector: '.grid-gallery a.active'
                    });
                });
            });
        } else {
            $('.group1,.group3,.group2').css({
                'display': 'block',
                'opacity': '1'
            });
            $('.grid-gallery').masonry();
            $(document).ready(function () {
                $(".grid-gallery").lightGallery({
                    selector: '.grid-gallery a'
                });
            });
        }
    });
}

function moveToForm() {

    $('.toform').on('click', function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".form-wrapper").offset().top
        }, 1500);
        $(".input-name").focus();

    });
}


function setPhoneMask() {
    if (document.querySelector(".bfh-phone") != null) {
        $(function () {
            $(".bfh-phone").mask("+7(999) 999-99-99");
        });
        document.querySelector('.bfh-phone').addEventListener('focus', function () {
            moveCaretToStart(this)
        })
    }
    if (document.querySelector("#phone-modal") != null) {
        $(function () {
            $("#phone-modal").mask("+7(999) 999-99-99");
        });
        document.querySelector('#phone-modal').addEventListener('focus', function () {
            moveCaretToStart(this)
        })
    }

}

// проверено в IE
function moveCaretToStart(inputObject) {
    if (inputObject.createTextRange) {
        var r = inputObject.createTextRange();
        r.collapse(true);
        r.select();
    }
}

function moveCaretToEnd(inputObject) {
    if (inputObject.createTextRange) {
        var r = inputObject.createTextRange();
        r.collapse(false);
        r.select();
    }
}

// проверено в FireFox

function moveCaretToStart(inputObject) {
    if (inputObject.selectionStart) {
        inputObject.setSelectionRange(0, 0);
        inputObject.focus();
    }
}

function moveCaretToEnd(inputObject) {
    if (inputObject.selectionStart) {
        var end = inputObject.value.length;
        inputObject.setSelectionRange(end, end);
        inputObject.focus();
    }
}

function formValidator() {
    $(".form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true,
                minlength: 10
            }
        },
        submitHandler: function () {
            sendData($(this), false);
        }
    });
    $(".popup-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true,
                minlength: 10
            }
        },
        submitHandler: function () {
            sendData($(this), true);
        }
    });
}

function scrollAmimationInit() {
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
}

function onePageScrollInit() {
    if ($(window).width() > 992) {

        $.scrollify({
            section: ".page-scroll",
            sectionName: "section-name",
            interstitialSection: ".page-scroll--half",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: true,
            standardScrollElements: "",
            setHeights: true,
            overflowScroll: true,
            updateHash: true,
            touchScroll: true,
            scrollBar: false,
            before: function () {},
            after: function () {},
            afterResize: function () {},
            afterRender: function () {}
        });
    }
}

function masonryGalleryMaker() {
    var $grid = $('.grid-gallery').masonry({
        itemSelector: '.grid-gallery-item',
        percentPosition: true,
        columnWidth: '.grid-sizer',

    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry();
    });
}

function openMobileMenu() {
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
        $(this).toggleClass('open');
        $('.mobile-menu').toggleClass('mobile-menu--open');
    });

}

function setAppartmentSlider() {
        owl = $('.owl-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        autoWidth: true,
        center: true,
        nav: false,

        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        },
    })
    owl.on('translated.owl.carousel', function (e) {
        setSliderBtns();
    });
}

function appsFilterBtnEvent() {
    $('.appartments__filter-item').click(function () {
        var aim = this.getAttribute('data-filter-slider');
        var slides = document.querySelectorAll('.appartments__slider .owl-item .slide-item');
        var counter = 0;
        for (let index = 0; index < slides.length && counter <= 0; index++) {
            if (slides[index].classList.contains(aim)) {
                console.log(slides[index])
                console.log(index)
                $('.owl-carousel').trigger('to.owl.carousel', index);
                counter++;
            }
        }
    });
}

function setSliderBtns() {

    $('.appartments__filter-item').removeClass('active');
    var $slideActive = $('.appartments__slider .owl-item.active.center .slide-item');
    if ($slideActive.hasClass('double')) {
        $('.appartments__filter-item:nth-child(1)').addClass('active');
    } else if ($slideActive.hasClass('tripple')) {
        $('.appartments__filter-item:nth-child(2)').addClass('active');
    } else if ($slideActive.hasClass('quadro')) {
        $('.appartments__filter-item:nth-child(3)').addClass('active');
        console.log('quadro');
    } else if ($slideActive.hasClass('penthaus')) {
        $('.appartments__filter-item:nth-child(4)').addClass('active');

    }
}

function initItemMap() {
    if (document.querySelector('.map') != null) {

        markerImage = '/img/@2x/placeholder.png';
        var coordinates = {
                lat: 55.785985,
                lng: 37.585859
            },

            center = {
                lat: 55.785567,
                lng: 37.565926
            };
        if ($(window).width() < 1200) {
            center = {
                lat: 55.791790,
                lng: 37.587001
            };
        }
        if ($(window).width() < 768) {
            center = {
                lat: 55.788703,
                lng: 37.585827
            };
        }
        map = new google.maps.Map(document.querySelector('.map'), {

                center: center,
                scrollwheel: false,
                zoom: 15,
                disableDefaultUI: true,
                styles: [{
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#212121"
                        }]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#212121"
                        }]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#9e9e9e"
                        }]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#bdbdbd"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "poi.business",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#212921"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#616161"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#1b1b1b"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#2c2c2c"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#8a8a8a"
                        }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#373737"
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#3c3c3c"
                        }]
                    },
                    {
                        "featureType": "road.highway.controlled_access",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#4e4e4e"
                        }]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#616161"
                        }]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "transit.station",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#292c3a"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#3d3d3d"
                        }]
                    }
                ]
            }),


            marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: markerImage
            });
    }

    if (document.querySelector('.front__map') != null) {

        markerImage = 'https://newflat.nikaestate.ru/wp-content/uploads/2019/05/marker-new.png';
        var coordinates = {
                lat: 55.764139,
                lng: 37.60063
            },

            map = new google.maps.Map(document.querySelector('.front__map'), {
                center: coordinates,
                scrollwheel: false,
                zoom: 15,
                disableDefaultUI: true,
                styles: [{
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#212121"
                        }]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#212121"
                        }]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#9e9e9e"
                        }]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#bdbdbd"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "poi.business",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#212921"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#616161"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#1b1b1b"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#2c2c2c"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#8a8a8a"
                        }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#373737"
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#3c3c3c"
                        }]
                    },
                    {
                        "featureType": "road.highway.controlled_access",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#4e4e4e"
                        }]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#616161"
                        }]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "transit.station",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#292c3a"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#3d3d3d"
                        }]
                    }
                ]
            }),


            marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: markerImage
            });
    }
}

function changerValidateMessage() {

    jQuery.extend(jQuery.validator.messages, {
        required: "Это поле обязательно для ввода",
        remote: "Please fix this field.",
        email: "Неправильный email адрес",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Неправильный формат",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Вы ввели меньше {0} символов."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });
}