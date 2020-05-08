(function() {
  $(document).on("turbolinks:load", function() {
    $('.g-title').click(function() {
      var cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.g-main').fadeToggle('fast').css(cssVal);
    });
    // button toggle
    $('.bt0').click(function() {
      $('#bt0').toggle('fast');
      $(this).toggleClass('b-act');
      $('button').not(this).removeClass('b-act');
      $('.g-stat p').not('#bt0').hide('fast');
    });
    $('.bt1').click(function() {
      $('#bt1').toggle('fast');
      $(this).toggleClass('b-act');
      $('button').not(this).removeClass('b-act');
      $('.g-stat p').not('#bt1').hide('fast');
    });
    $('.bt2').click(function() {
      $('#bt2').toggle('fast');
      $(this).toggleClass('b-act');
      $('button').not(this).removeClass('b-act');
      $('.g-stat p').not('#bt2').hide('fast');
    });
    $('.bt3').click(function() {
      $('#bt3').toggle('fast');
      $(this).toggleClass('b-act');
      $('button').not(this).removeClass('b-act');
      $('.g-stat p').not('#bt3').hide('fast');
    });
    $('.bt4').click(function() {
      $('#bt4').toggle('fast');
      $(this).toggleClass('b-act');
      $('button').not(this).removeClass('b-act');
      $('.g-stat p').not('#bt4').hide('fast');
    });
    $('.bt5').click(function() {
      $('#bt5').toggle('fast');
      $(this).toggleClass('b-act');
      $('button').not(this).removeClass('b-act');
      $('.g-stat p').not('#bt5').hide('fast');
    });
  });
}).call(this);
