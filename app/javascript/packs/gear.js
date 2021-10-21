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
    function weapon_description() {
      $char_id = $('#calc_char_id').children('option:selected').val();
      $('.calc_gear_weapon')
        .next('.g-desc').toggle()
        .find('#ch-' + $char_id).toggle();
    };
    $('#w-d').click(function() {
      weapon_description();
    });
    $('select#calc_char_id').change(function() {
      $('.g-desc, .g-desc p').hide();
    }).change();
  });
}).call(this);
