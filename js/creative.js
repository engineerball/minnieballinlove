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

  $("#submit").click(function(){
    var name = $("#name").val();
    var mobile = $("#mobile").val();
    var coming = $("#coming").val();
    var room = $("#room").val();
    // Returns successful data submission message when the entered information is stored in database.
    var dataString = 'name1='+ name + '&mobile1='+ mobile + '&coming1='+ coming + '&room1='+ room;
    if(name==''||mobile==''||coming==''||room=='')
    {
      alert("Please Fill All Fields");
    }
    else
    {
      // AJAX Code To Submit Form.
      $.ajax({
        type: "POST",
        url: "process.php",
        data: dataString,
        cache: false,
        success: function(result){
          //alert(result);
          swal("Thank you!", "See ya on December, 18th 2016!", "success");
          $('#RSVPmodal').modal('hide');
        }
      });
    }
    return false;
  });
})(jQuery); // End of use strict
