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
    $('select#calc_gear_weapon').change(function() {
      $selectedGear = $(this).children('option:selected').val();
      $('.gear').text($selectedGear);
    }).change();

    // Class -> Hero
    $chars = $('#calc_char_id').html();
    $('#calc_role_id').change(function() {
      // Hero stuff
      $('#calc_char_id').parent().hide();
      $('.class-stats').hide();
      // Gear stuff
      $('#calc_gear_weapon').parent().hide();
      $('.hero-gear').hide();
      $role = $('#calc_role_id :selected').text();
      $escaped_role = $role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $options = $($chars).filter("optgroup[label='" + $escaped_role + "']").html();
      if ($options) {
        $('#calc_char_id').html($options);
        $('.class-stats').show();
        return $('#calc_char_id').parent().show();
      } else {
        $('#calc_char_id').empty();
        return $('#calc_char_id').parent().hide();
      }
    });
    
    // Hero -> Weapon
    $('#calc_char_id').change(function() {
      $('.hero-gear').show();
      $('#calc_gear_weapon').parent().show();
      $('#calc_gear_weapon').val([]);
      $('.hero-gear').children().hide();
    });

    // Hero stats
    $('select#calc_role_id').change(function() {
      $('.class-stats').children().hide();
      $stat = $(this).children('option:selected').val();
      $statVal = $('.class-stats').children().attr('class');
      $('.class-stats').find('.role' + $stat).toggle();
    }).change();

    // Class/Unique Weapon stats
    $('select#calc_gear_weapon').change(function() {
      $('.hero-gear').children().hide();
      $('.v').hide();
      $cVal = $('.char').text();
      $rVal = $('.role').text();
      $gVal = $('.gear').text();
      if ($gVal == 'Class') {
        $classWeapponVal = $('.hero-gear').children().attr('class');
        $('.hero-gear').find('.role' + $rVal).toggle();
      } else if ($gVal == 'Unique') {
        $classWeapponVal = $('.hero-gear').children().attr('class');
        $('.hero-gear').find('.char' + $cVal).toggle();
      }
    }).change();
  });
}).call(this);
