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
        .next('.g-desc').show()
        .find('#ch-' + $char_id).show();
    };
    $('#w-d').on('mousedown', function() {
      weapon_description();
    }).on('mouseup mouseleave', function() {
      $('.g-desc, .g-desc p').hide();
    });
    $('select#calc_char_id').change(function() {
      $('.g-desc, .g-desc p, #w-d').hide();
    }).change();
  });
}).call(this);
