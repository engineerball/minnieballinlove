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

  // Countdown js
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  //var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  var deadline = 'December 17 2016 23:59:59 GMT+0700';
  initializeClock('clockdiv', deadline);
  // End countdown

 // RSVP
  $("#coming").click(function(){
    $("#going:hidden").show('slow');
  });
  $("#not-coming").click(function(){
    if($('#coming').prop('checked')===false){
      $('#going').hide('slow');
    }
  });

  $('#partner').hide('slow');
  $("#room").click(function(){
    if($('#room').val()==='2'){
      $('#partner:hidden').show('slow');
    }else{
      $('#partner').hide('slow');
    }
  });

  $('.map-container')
  .click(function(){
    $(this).find('iframe').addClass('clicked')})
    .mouseleave(function(){
      $(this).find('iframe').removeClass('clicked')});

      $("#submit").click(function(){
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var mobile = $("#mobile").val();
        var email = $("#email").val();
        var coming = $("#join").val();
        var room = $("#room").val();
        var friend = $("#friend").val();

        if (friend==''||room=='0'){
          var friend = 'null'
        }
        // Returns successful data submission message when the entered information is stored in database.
        var dataString = 'firstname1='+ firstname + '&lastname1=' + lastname + '&mobile1=' + mobile + '&email1=' + email + '&coming1=' + coming + '&room1=' + room + '&friend1=' + friend;
        if(firstname==''||lastname==''||mobile==''||email==''||coming==''||room==''||friend=='')
        {
          //alert("Please Fill All Fields");
          swal({
            title: "You need to write something!",
            type: "info"
          });
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
              swal({
                title: "Thank you!",
                text: "Please save the date: 18/12/16 in Udonthani!",
                type: "success",
                timer: 5000
              });
              $('#RSVPmodal').modal('hide');
            }
          });
        }
        return false;
      });
    })(jQuery); // End of use strict
