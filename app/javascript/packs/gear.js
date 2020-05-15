(function() {
  $(document).on("turbolinks:load", function() {
    $('.g-title').click(function() {
      $cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.g-main').fadeToggle('fast').css($cssVal);
    });
    $('button').click(function() {
      $btn = $(this).attr('class');
      $btnVal = $(this).parent().next('.g-val').find('#' + $btn);
      $($btnVal).show();
      $('.btn').not($btnVal).hide();
      $('button').css('background', '#f0f0f0');
      $(this).css('background', '#808080');
      $(this).prevAll('button').css('background', '#808080');
      $(this).nextAll('button').css('background', '#f0f0f0');
    });
  });
}).call(this);
