(function() {
  $(document).on("turbolinks:load", function() {
    $('.h-title').click(function() {
      var cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.h-main').fadeToggle('fast').css(cssVal);
    });
    $('.c-main #c-class').each(function() {
      $heroClass = $(this).text();
      $heroName = $heroClass.toUpperCase();
      $('#c-class').empty().append("<img src='/images/media/classes/" + $heroName + ".png' title='" + $heroClass + "'>");
    });
    $('.c-main .c-avatar').each(function() {
      $heroAvatar = $('#c-name').text();
      $(this).append("<img src='/images/media/heroes/" + $heroAvatar + "/portrait.png'>");
    });
    $('.c-sk #sk-img').each(function(index, el) {
      $heroSkills = $('#c-name').text();
      $s = $(el).attr('class');
      $('.' + $s).append("<img src='/images/media/heroes/" + $heroSkills + "/" + $s + ".png'>");
    });
    $('.p-avatar').children().each(function(index, el) {
      $char = $('.p-hero').text();
      $s = $(el).attr('class');
      $('.' + $s).append("<img src='/images/media/heroes/" + $char + "/" + $s + ".png'>");
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
