(function() {
  $(document).on("turbolinks:load", function() {
    $('select#calc_char_id').change(function() {
      $selectedHero = $(this).children('option:selected').val();
      $('.char').text($selectedHero);
    }).change();
    $('select#calc_role_id').change(function() {
      $selectedRole = $(this).children('option:selected').val();
      $('.role').text($selectedRole);
    }).change();

    $('#calc_char_id').parent().hide();
    $chars = $('#calc_char_id').html();
    $('#calc_role_id').change(function() {
      $role = $('#calc_role_id :selected').text();
      $escaped_role = $role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $options = $($chars).filter("optgroup[label='" + $escaped_role + "']").html();
      if ($options) {
        $('#calc_char_id').html($options);
        return $('#calc_char_id').parent().show();
      } else {
        $('#calc_char_id').empty();
        return $('#calc_char_id').parent().hide();
      }
    });

    // $('.class-stats').children().hide();
    $('select#calc_role_id').change(function() {
      $('.class-stats').children().hide();
      $ass = $(this).children('option:selected').val();
      $assVal = $('.class-stats').children().attr('class');
      $('.class-stats').find('.role' + $ass).toggle();
    }).change();
  });
}).call(this);
