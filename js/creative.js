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
 $('#wish').hide();

  $('#coming').click(function(){
    if($('#coming').prop('checked')===true){
    $("#going:hidden").show('slow');
    $("#wish").hide('slow');
  }
  });

  $('#not-coming').click(function(){
    if($('#coming').prop('checked')===false){
      $('#going').hide('slow');
      $('#wish').show('slow');
    }
  });

  $('#in-out-time').hide();
  $("#room").on('change', function(){
    if($('#room').val()!='0'){
      $('#in-out-time:hidden').show('slow');
    }else{
      $('#in-out-time').hide('slow');
    }
  });

  $('.map-container')
  .click(function(){
    $(this).find('iframe').addClass('clicked')})
    .mouseleave(function(){
      $(this).find('iframe').removeClass('clicked')});





      $("#submit").click(function(){
        var name = $("#name").val();
        var mobile = $("#mobile").val();
        var email = $("#email").val();
        if ($('#coming').prop('checked')===true){
          var coming = 'yes';
        } else {
          var coming = 'no';
        }

        var follower = $("#follower").val();
        var room = $("#room").val();
        var room_date = $('#room-date').val();

        if ($('#night1').prop('checked')===true){
          var room_date = '17-18';
        } else {
          var room_date = '17-19';
        }

        var room_input = $("#room-date-input").val();

        // var friend = $("#friend").val();
        var join_event = $("#join").val();
        var wish = $('textarea#wish').val();

        if (friend==''||room=='0'){
          var friend = 'null';
        }
        if (follower==''){
          var follower = 'null';
        }
        if (room_input==''){
          var room_input = 'null';
        }
        if (wish==''){
          var wish = 'null';
        }
        if (join_event==''){
          var join_event = 'null';
        }

        if (room_input == 'null')
        {
          var room_input = room_date;
        }


        // Returns successful data submission message when the entered information is stored in database.
        var dataString = 'name1=' + name + '&mobile1=' + mobile + '&email1=' + email + '&coming1=' + coming + '&follower1=' + follower + '&room1=' + room + '&room_input1=' + room_input + '&join_event1=' + join_event + '&wish1=' + wish;
        if(name==''||mobile==''||email==''||coming=='')
        {
          //alert("Please Fill All Fields");
          swal({
            title: "You need to write something!",
            type: "info"
          });
        }
        else
        {
          if (coming=='no'){
            if (wish=='null'||wish==''){
            swal({
              title: "You need to write something!",
              type: "info"
            });
            return false;
            }
          }

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
