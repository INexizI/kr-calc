(function() {
  $(document).on("turbolinks:load", function() {
    $('.h-title').click(function() {
      var cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.h-main').fadeToggle('fast').css(cssVal);
    });
    $('.c-perk-img').mouseenter(function() {
      $left = 0;
      $top = 0;
      if ($(document).width() - $(this).offset().left < $(document).width() / 2)
        $left = -1;
      // if ($(document).height() - $(this).offset().top < $(document).height() / 2)
      //   $top = -1;
      $y = 10;
      $x = $left * 10 + $left * 400;
      $cs = {
        'top':$y,
        'left': $x,
        'display': 'grid'
      }
      $('.s-description', this).css($cs);
    }).mouseleave(function() {
      $('.s-description').hide();
    });
  });
}).call(this);
