(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

    // Initialize and Configure Magnific Popup Lightbox Plugin
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    // RSVP popup-gallery
   var modal_init = function() {

     var modalWrapper = document.getElementById("modal_wrapper");
     var modalWindow  = document.getElementById("modal_window");

     var openModal = function(e)
     {
       modalWrapper.className = "overlay";
       var overflow = modalWindow.offsetHeight - document.documentElement.clientHeight;
       if(overflow > 0) {
         modalWindow.style.maxHeight = (parseInt(window.getComputedStyle(modalWindow).height) - overflow) + "px";
       }
       modalWindow.style.marginTop = (-modalWindow.offsetHeight)/2 + "px";
       modalWindow.style.marginLeft = (-modalWindow.offsetWidth)/2 + "px";
       e.preventDefault ? e.preventDefault() : e.returnValue = false;
     };

     var closeModal = function(e)
     {
       modalWrapper.className = "";
       e.preventDefault ? e.preventDefault() : e.returnValue = false;
     };

     var clickHandler = function(e) {
       if(!e.target) e.target = e.srcElement;
       if(e.target.tagName == "DIV") {
         if(e.target.id != "modal_window") closeModal(e);
       }
     };

     var keyHandler = function(e) {
       if(e.keyCode == 27) closeModal(e);
     };

     if(document.addEventListener) {
       document.getElementById("modal_open").addEventListener("click", openModal, false);
       document.getElementById("modal_close").addEventListener("click", closeModal, false);
       document.addEventListener("click", clickHandler, false);
       document.addEventListener("keydown", keyHandler, false);
     } else {
       document.getElementById("modal_open").attachEvent("onclick", openModal);
       document.getElementById("modal_close").attachEvent("onclick", closeModal);
       document.attachEvent("onclick", clickHandler);
       document.attachEvent("onkeydown", keyHandler);
     }

   };

})(jQuery); // End of use strict
