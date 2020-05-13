(function() {
  $(document).on("turbolinks:load", function() {
    $('.g-title').click(function() {
      var cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.g-main').fadeToggle('fast').css(cssVal);
    });
    $('.bt1').click(function() {
      $(this).next('#bt1').show();
      $('.btn').not('#bt1').hide();
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
    $('.bt2').click(function() {
      $(this).next('#bt2').show();
      $('.btn').not('#bt2').hide();
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
    $('.bt3').click(function() {
      $(this).next('#bt3').show();
      $('.btn').not('#bt3').hide();
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
    $('.bt4').click(function() {
      $(this).next('#bt4').show();
      $('.btn').not('#bt4').hide();
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
    $('.bt5').click(function() {
      $(this).next('#bt5').show();
      $('.btn').not('#bt5').hide();
      $(this).addClass('b-act');
      $(this).prevAll('button').addClass('b-act');
      $(this).nextAll('button').removeClass('b-act');
    });
  });
}).call(this);
