(function() {
  $(document).on("turbolinks:load", function() {
    $('label').click(function() {
      $(this).parent().find('label').removeClass('active');
      $(this).addClass('active');
    });
    $('#w-d').on('mousedown', function() {
      const char_id = $('#calc_char_id').children('option:selected').val();
      $('.calc_gear_weapon')
        .next('.g-desc').show()
        .find('#ch-' + char_id).show();
    }).on('mouseup mouseleave', function() {
      $('.g-desc, .g-desc p').hide();
    });
    $('select#calc_char_id').change(function() {
      $('.g-desc, .g-desc p, #w-d').hide();
    }).change();
  });
}).call(this);
