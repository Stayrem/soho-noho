document.addEventListener("DOMContentLoaded", function() {

	initItemMap();
    setAppartmentSlider();
    setSliderBtns();
    openMobileMenu();
    masonryGalleryMaker();
    scrollAmimationInit();
    appsFilterBtnEvent();
    formValidator();
    changerValidateMessage();
    setPhoneMask();
    moveToForm();
    galleryFilterInit();
});

function galleryFilterInit(){
    $('.gallery__list-link').on('click', function(){
        var galleryFilterBtn = this.getAttribute('rel');
        if(galleryFilterBtn === 'group1'){
            $('.group2,.group3').animate({
            opacity: 0,
        }, 300, function() {
            $('.group2,.group3').css({'display':'none'});
            $('.group1').css({'display':'block','opacity':'1'});
            $('.grid-gallery').masonry();
        });
        }else if(galleryFilterBtn === 'group2'){
            $('.group1,.group3').animate({
                opacity: 0,
            }, 300, function() {
                $('.group1,.group3').css({'display':'none'});
                $('.group2').css({'display':'block','opacity':'1'});
                $('.grid-gallery').masonry();
            });
        }else if(galleryFilterBtn === 'group3'){
            $('.group2,.group1').animate({
                opacity: 0,
            }, 300, function() {
                $('.group2,.group1').css({'display':'none'});
                $('.group3').css({'display':'block','opacity':'1'});
                $('.grid-gallery').masonry();
            });
        }else{
            $('.group1,.group3,.group2').css({'display':'block','opacity':'1'});    
            $('.grid-gallery').masonry();
        }
    });
}

function moveToForm(){
    $('.pdf-btn').on('click', function(){
        $("#pdf").prop('checked', true);
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".contact").offset().top
        }, 1500);
        

    });
    $('show-btn').on('click', function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".show-btn").offset().top
        }, 1500);
        $("#pdf").prop('checked', false);

    });
}


function setPhoneMask(){
    $(function(){
       $(".bfh-phone").mask("+7(999) 999-99-99");
   });
   document.querySelector('.bfh-phone').addEventListener('focus', function(){
       moveCaretToStart(this)
   })
}

// проверено в IE
function moveCaretToStart(inputObject)
{
 if (inputObject.createTextRange)
 {
  var r = inputObject.createTextRange();
  r.collapse(true);
  r.select();
 }
}

function moveCaretToEnd(inputObject)
{
 if (inputObject.createTextRange)
 {
  var r = inputObject.createTextRange();
  r.collapse(false);
  r.select();
 }
}

// проверено в FireFox

function moveCaretToStart(inputObject)
{
 if (inputObject.selectionStart)
 {
  inputObject.setSelectionRange(0,0);
  inputObject.focus();
 }
}
function moveCaretToEnd(inputObject)
{
 if (inputObject.selectionStart)
 {
  var end = inputObject.value.length;
  inputObject.setSelectionRange(end,end);
  inputObject.focus();
 }
}

function formValidator(){
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
        }
    });
}

function scrollAmimationInit(){
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

function onePageScrollInit(){
    $.scrollify({
        section : ".page-scroll",
        sectionName : "section-name",
        interstitialSection : ".page-scroll--half",
        easing: "easeOutExpo",
        scrollSpeed: 1100,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        updateHash: true,
        touchScroll:true,
        scrollBar: false,
        before:function() {},
        after:function() {},
        afterResize:function() {},
        afterRender:function() {}
      });
}

function masonryGalleryMaker(){
    var $grid = $('.grid-gallery').masonry({
        itemSelector: '.grid-gallery-item',
        percentPosition: true,
        columnWidth: '.grid-sizer',
      });
      // layout Masonry after each image loads
      $grid.imagesLoaded().progress( function() {
        $grid.masonry();
      });  
}

function openMobileMenu(){
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
        $('.mobile-menu').toggleClass('mobile-menu--open');
    });
    
}

function setAppartmentSlider(){
    var owl = $('.owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        autoWidth: true,
        center: true,
        nav: false,
        loop: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        },
    })
    owl.on('translated.owl.carousel', function(e) {
        setSliderBtns();
    });
}

function appsFilterBtnEvent(){
    $('.appartments__filter-item').click(function(){
        var aim = this.getAttribute('data-filter-slider');
        var slides = document.querySelectorAll('.appartments__slider .owl-item .slide-item');
        var counter = 0;
        for (let index = 0; index < slides.length && counter <= 0; index++) {
            if(slides[index].classList.contains(aim)){
                counter++;
                $('.owl-carousel').trigger('to.owl.carousel', index + 1 );
            }
        }
    });
}

function setSliderBtns(){
    

    $('.appartments__filter-item').removeClass('active');
    var $slideActive = $('.appartments__slider .owl-item.active.center .slide-item');
    if($slideActive.hasClass('double')){
        $('.appartments__filter-item:nth-child(1)').addClass('active');
    }else if($slideActive.hasClass('tripple')){
        $('.appartments__filter-item:nth-child(2)').addClass('active');
    }else if($slideActive.hasClass('quadro')){
        $('.appartments__filter-item:nth-child(3)').addClass('active');
        console.log('quadro');
    }else if($slideActive.hasClass('penthaus')){
        $('.appartments__filter-item:nth-child(4)').addClass('active');
  
    }
}

function initItemMap() {
    if (document.querySelector('.map') != null) {

        markerImage = 'https://newflat.nikaestate.ru/wp-content/uploads/2019/05/marker-new.png';
        var coordinates = {
                lat: 55.764139,
                lng: 37.60063
            },

            map = new google.maps.Map(document.querySelector('.map'), {
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

function changerValidateMessage(){

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