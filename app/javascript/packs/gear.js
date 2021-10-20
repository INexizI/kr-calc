(function() {
  $(document).on("turbolinks:load", function() {
    $('.g-title').click(function() {
      $cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.g-main').slideToggle('fast').css($cssVal);
    });
    $('label').click(function() {
      $(this).parent().find('label').removeClass('active');
      $(this).addClass('active');
    });
    $('.calc_gear_weapon').click(function() {
      $char_id = $('#calc_char_id').children('option:selected').val();
      $(this)
        .next('.g-desc').toggle()
        .find('#ch-' + $char_id).toggle();
    });
  });
}).call(this);
