(function() {
  $(document).on("turbolinks:load", function() {
    $('.g-title').click(function() {
      $cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.g-main').slideToggle('fast').css($cssVal);
    });
    // $('button').click(function() {
    //   $btn = $(this).attr('class');
    //   $btnVal = $(this).parent().next('.g-val').find('#' + $btn);
    //   $($btnVal).show();
    //   $('.btn').not($btnVal).hide();
    //   $('button').css('background', '#f0f0f0');
    //   $(this).css('background', '#c8ff00');
    //   $(this).prevAll('button').css('background', '#c8ff00');
    //   $(this).nextAll('button').css('background', '#f0f0f0');
    // });
    $('.rating label').click(function() {
      $btn = $(this).attr('class');
      $btnVal = $(this).parent().parent().parent().next('.g-val').find('#' + $btn);
      $($btnVal).show();
      $(this).parent().parent().parent().parent().find('.btn').not('#' + $btn).hide();
    });
    $('label').click(function() {
      $(this).parent().find('label').removeClass('active');
      $(this).addClass('active');
    });
  });
}).call(this);
