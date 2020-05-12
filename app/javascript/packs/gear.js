(function() {
  $(document).on("turbolinks:load", function() {
    $('.g-title').click(function() {
      var cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.g-main').fadeToggle('fast').css(cssVal);
    });
    // $('.bt0').click(function() {
    //   $('#bt0').show('fast');
    //   $('.g-stat p').not('#bt0').hide('fast');
    //   $(this).addClass('b-act');
    //   $(this).prevAll('button').addClass('b-act');
    //   $(this).nextAll('button').removeClass('b-act');
    // });
    $('.bt1').click(function() {
      $('#bt1').show('fast');
      $('.g-stat p').not('#bt1').hide('fast');
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
    $('.bt2').click(function() {
      $('#bt2').show('fast');
      $('.g-stat p').not('#bt2').hide('fast');
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
    $('.bt3').click(function() {
      $('#bt3').show('fast');
      $('.g-stat p').not('#bt3').hide('fast');
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
    $('.bt4').click(function() {
      $('#bt4').show('fast');
      $('.g-stat p').not('#bt4').hide('fast');
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
    $('.bt5').click(function() {
      $('#bt5').show('fast');
      $('.g-stat p').not('#bt5').hide('fast');
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
  });
}).call(this);
